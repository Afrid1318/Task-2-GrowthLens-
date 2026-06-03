import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerConfig } from "./config.server";

const inputSchema = z.object({
  businessName: z.string().trim().min(1).max(200),
  industry: z.string().trim().max(200).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  websiteUrl: z.string().trim().max(500).optional().default(""),
  competitors: z.string().trim().max(2000).optional().default(""),
  reviews: z.string().trim().max(8000).optional().default(""),
  notes: z.string().trim().max(4000).optional().default(""),
});

const analysisTool = {
  type: "function",
  function: {
    name: "deliver_business_analysis",
    description: "Return a structured business growth analysis.",
    parameters: {
      type: "object",
      properties: {
        summary: {
          type: "string",
          description: "2-4 sentence executive summary of the business situation.",
        },
        healthScore: {
          type: "number",
          description: "Overall business health score 0-100.",
        },
        scoreBreakdown: {
          type: "object",
          properties: {
            website: { type: "number" },
            reputation: { type: "number" },
            competitive: { type: "number" },
            marketing: { type: "number" },
          },
          required: ["website", "reputation", "competitive", "marketing"],
          additionalProperties: false,
        },
        keyFindings: {
          type: "array",
          minItems: 3,
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              type: { type: "string", enum: ["problem", "opportunity", "strength"] },
              evidence: { type: "string", description: "Evidence supporting this finding." },
              impact: { type: "string", enum: ["high", "medium", "low"] },
            },
            required: ["title", "type", "evidence", "impact"],
            additionalProperties: false,
          },
        },
        competitorInsights: {
          type: "array",
          items: {
            type: "object",
            properties: {
              competitor: { type: "string" },
              advantage: { type: "string", description: "What they do better." },
              gap: { type: "string", description: "Gap or opportunity for our business." },
            },
            required: ["competitor", "advantage", "gap"],
            additionalProperties: false,
          },
        },
        recommendations: {
          type: "array",
          minItems: 4,
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              category: {
                type: "string",
                enum: ["website", "seo", "reputation", "marketing", "operations", "product"],
              },
            },
            required: ["title", "description", "category"],
            additionalProperties: false,
          },
        },
        actionPlan: {
          type: "array",
          minItems: 4,
          description: "Prioritized actions in order from highest priority to lowest.",
          items: {
            type: "object",
            properties: {
              priority: { type: "number", description: "1 = highest." },
              action: { type: "string" },
              rationale: { type: "string" },
              effort: { type: "string", enum: ["low", "medium", "high"] },
              impact: { type: "string", enum: ["low", "medium", "high"] },
              timeframe: { type: "string", description: "e.g. '1 week', '1 month', '1 quarter'." },
            },
            required: ["priority", "action", "rationale", "effort", "impact", "timeframe"],
            additionalProperties: false,
          },
        },
      },
      required: [
        "summary",
        "healthScore",
        "scoreBreakdown",
        "keyFindings",
        "competitorInsights",
        "recommendations",
        "actionPlan",
      ],
      additionalProperties: false,
    },
  },
} as const;

export const analyzeBusiness = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => inputSchema.parse(d))
  .handler(async ({ data }) => {
    // Lovable AI integration removed. Provide a lightweight deterministic
    // local analysis so the app continues to work without an external AI.
    // This is intentionally simple—replace with your preferred AI backend
    // integration if you want richer results.

    const scoreBase = 50;
    let healthScore = scoreBase;
    const addIf = (v: boolean, amt: number) => {
      if (v) healthScore = Math.min(100, healthScore + amt);
    };

    addIf(!!data.websiteUrl, 10);
    addIf(!!data.reviews, 10);
    addIf(!!data.competitors, 5);
    addIf(!!data.notes, 5);

    const summary = `Lightweight analysis for ${data.businessName}. This report is a heuristic summary generated locally and should be reviewed by a human.`;

    // Scrape competitor URLs (if provided) to infer advantages and gaps.
    // Note: this is intentionally lightweight and best-effort. Failures should
    // never crash the analysis endpoint.
    const competitorList = (data.competitors ? data.competitors.split(/,|;|\n/) : [])
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 6);

    async function scrapeCompetitor(raw: string) {
      const comp = raw.trim();
      const defaultRes = {
        competitor: comp || "(unknown)",
        advantage: "Unknown — needs manual review",
        gap: "Not assessed",
      };

      // Try to detect a URL
      let url = comp;
      if (!/^https?:\/\//i.test(url)) {
        // If it's a bare domain or contains a dot, try https://
        if (/\S+\.\S+/.test(url)) url = `https://${url}`;
        else return defaultRes;
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!res.ok) return { ...defaultRes, gap: `Failed to fetch (${res.status})` };
        const html = await res.text();

        const title = html
          .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
          ?.replace(/\s+/g, " ")
          ?.trim();
        const meta = (
          html.match(
            /<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
          )?.[1] ||
          html.match(
            /<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
          )?.[1] ||
          ""
        ).trim();
        const h1 = html
          .match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
          ?.replace(/<[^>]+>/g, "")
          ?.replace(/\s+/g, " ")
          ?.trim();

        const lower = html.toLowerCase();

        const hasPricing = /pricing|price|menu|plans|cost/.test(lower);
        const hasReviews = /testimonial|review|reviews|customer feedback/.test(lower);
        const hasContact = /contact|phone|tel:|mailto:|address|find us/.test(lower);

        const advantageParts: string[] = [];
        const gapParts: string[] = [];

        if (title) advantageParts.push(`Title: ${title}`);
        if (meta) advantageParts.push(`Description: ${meta}`);
        if (h1) advantageParts.push(`Headline: ${h1}`);

        if (hasPricing) advantageParts.push("Shows pricing or menu info");
        if (hasReviews) advantageParts.push("Displays reviews or testimonials");
        if (hasContact) advantageParts.push("Contact info present");

        if (!hasReviews) gapParts.push("No obvious reviews/testimonials");
        if (!hasPricing) gapParts.push("Pricing or service detail missing");
        if (!hasContact) gapParts.push("Contact details not easily found");

        const advantage = advantageParts.length
          ? advantageParts.join("; ")
          : "No clear advantages found";
        const gap = gapParts.length ? gapParts.join("; ") : "No obvious gaps detected";

        return {
          competitor: comp,
          advantage,
          gap,
        };
      } catch (err) {
        return {
          ...defaultRes,
          gap: `Scrape error: ${err instanceof Error ? err.message : String(err)}`,
        };
      }
    }

    const competitorInsights = competitorList.length
      ? await Promise.all(
          competitorList.map(async (c) => {
            try {
              return await scrapeCompetitor(c);
            } catch {
              return {
                competitor: c,
                advantage: "Unknown — needs manual review",
                gap: "Not assessed",
              };
            }
          }),
        )
      : [];

    const analysis: BusinessAnalysis = {
      summary,
      healthScore,
      scoreBreakdown: {
        website: data.websiteUrl ? 70 : 40,
        reputation: data.reviews ? 65 : 40,
        competitive: data.competitors ? 60 : 45,
        marketing: data.notes ? 55 : 45,
      },
      keyFindings: [
        {
          title: data.websiteUrl ? "Website present" : "No website detected",
          type: data.websiteUrl ? "strength" : "problem",
          evidence: data.websiteUrl ? "Website URL provided by user." : "No website URL provided.",
          impact: data.websiteUrl ? "medium" : "high",
        },
        {
          title: data.reviews ? "Some reviews available" : "No reviews found",
          type: data.reviews ? "opportunity" : "problem",
          evidence: data.reviews ? "User supplied review text." : "No review data supplied.",
          impact: "medium",
        },
        {
          title: data.competitors ? "Competitive context provided" : "Limited competitor info",
          type: data.competitors ? "opportunity" : "problem",
          evidence: data.competitors ? "Competitors listed by user." : "Competitors not provided.",
          impact: "medium",
        },
      ],
      competitorInsights,
      recommendations: [
        {
          title: "Create or improve website",
          description: "Ensure your website clearly states services, hours, and contact info.",
          category: "website",
        },
        {
          title: "Collect reviews",
          description: "Ask satisfied customers for reviews to improve reputation.",
          category: "reputation",
        },
        {
          title: "Competitive research",
          description: "Review top competitors for pricing and offerings.",
          category: "marketing",
        },
        {
          title: "Prioritize quick wins",
          description:
            "Start with high-impact, low-effort items like Google Business Profile updates.",
          category: "operations",
        },
      ],
      actionPlan: [
        {
          priority: 1,
          action: "Update Google Business Profile",
          rationale: "Quick visibility gain",
          effort: "low",
          impact: "high",
          timeframe: "1 week",
        },
        {
          priority: 2,
          action: "Ask for 5 recent customer reviews",
          rationale: "Improves trust and search visibility",
          effort: "low",
          impact: "high",
          timeframe: "2 weeks",
        },
        {
          priority: 3,
          action: "Improve website contact and service pages",
          rationale: "Better conversion",
          effort: "medium",
          impact: "high",
          timeframe: "1 month",
        },
        {
          priority: 4,
          action: "Run simple competitor audit",
          rationale: "Identify gaps to exploit",
          effort: "medium",
          impact: "medium",
          timeframe: "1 month",
        },
      ],
    };

    return { analysis };
  });

export type AnalyzeInput = z.infer<typeof inputSchema>;

export type BusinessAnalysis = {
  summary: string;
  healthScore: number;
  scoreBreakdown: {
    website: number;
    reputation: number;
    competitive: number;
    marketing: number;
  };
  keyFindings: Array<{
    title: string;
    type: "problem" | "opportunity" | "strength";
    evidence: string;
    impact: "high" | "medium" | "low";
  }>;
  competitorInsights: Array<{
    competitor: string;
    advantage: string;
    gap: string;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    category: "website" | "seo" | "reputation" | "marketing" | "operations" | "product";
  }>;
  actionPlan: Array<{
    priority: number;
    action: string;
    rationale: string;
    effort: "low" | "medium" | "high";
    impact: "low" | "medium" | "high";
    timeframe: string;
  }>;
};
