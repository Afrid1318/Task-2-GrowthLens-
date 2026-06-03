import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-B-rv6-UB.js";
import { z } from "zod";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const inputSchema = z.object({
  businessName: z.string().trim().min(1).max(200),
  industry: z.string().trim().max(200).optional().default(""),
  location: z.string().trim().max(200).optional().default(""),
  websiteUrl: z.string().trim().max(500).optional().default(""),
  competitors: z.string().trim().max(2e3).optional().default(""),
  reviews: z.string().trim().max(8e3).optional().default(""),
  notes: z.string().trim().max(4e3).optional().default("")
});
const analyzeBusiness_createServerFn_handler = createServerRpc({
  id: "a87d015ab2eacb8af743f08c75ab982e33d2be295a710d9d1ab77a9080bce269",
  name: "analyzeBusiness",
  filename: "src/lib/analyze.functions.ts"
}, (opts) => analyzeBusiness.__executeServer(opts));
const analyzeBusiness = createServerFn({
  method: "POST"
}).inputValidator((d) => inputSchema.parse(d)).handler(analyzeBusiness_createServerFn_handler, async ({
  data
}) => {
  const scoreBase = 50;
  let healthScore = scoreBase;
  const addIf = (v, amt) => {
    if (v) healthScore = Math.min(100, healthScore + amt);
  };
  addIf(!!data.websiteUrl, 10);
  addIf(!!data.reviews, 10);
  addIf(!!data.competitors, 5);
  addIf(!!data.notes, 5);
  const summary = `Lightweight analysis for ${data.businessName}. This report is a heuristic summary generated locally and should be reviewed by a human.`;
  const competitorList = (data.competitors ? data.competitors.split(/,|;|\n/) : []).map((s) => s.trim()).filter(Boolean).slice(0, 6);
  async function scrapeCompetitor(raw) {
    const comp = raw.trim();
    const defaultRes = {
      competitor: comp || "(unknown)",
      advantage: "Unknown — needs manual review",
      gap: "Not assessed"
    };
    let url = comp;
    if (!/^https?:\/\//i.test(url)) {
      if (/\S+\.\S+/.test(url)) url = `https://${url}`;
      else return defaultRes;
    }
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5e3);
      const res = await fetch(url, {
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) return {
        ...defaultRes,
        gap: `Failed to fetch (${res.status})`
      };
      const html = await res.text();
      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ")?.trim();
      const meta = (html.match(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || html.match(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i)?.[1] || "").trim();
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, "")?.replace(/\s+/g, " ")?.trim();
      const lower = html.toLowerCase();
      const hasPricing = /pricing|price|menu|plans|cost/.test(lower);
      const hasReviews = /testimonial|review|reviews|customer feedback/.test(lower);
      const hasContact = /contact|phone|tel:|mailto:|address|find us/.test(lower);
      const advantageParts = [];
      const gapParts = [];
      if (title) advantageParts.push(`Title: ${title}`);
      if (meta) advantageParts.push(`Description: ${meta}`);
      if (h1) advantageParts.push(`Headline: ${h1}`);
      if (hasPricing) advantageParts.push("Shows pricing or menu info");
      if (hasReviews) advantageParts.push("Displays reviews or testimonials");
      if (hasContact) advantageParts.push("Contact info present");
      if (!hasReviews) gapParts.push("No obvious reviews/testimonials");
      if (!hasPricing) gapParts.push("Pricing or service detail missing");
      if (!hasContact) gapParts.push("Contact details not easily found");
      const advantage = advantageParts.length ? advantageParts.join("; ") : "No clear advantages found";
      const gap = gapParts.length ? gapParts.join("; ") : "No obvious gaps detected";
      return {
        competitor: comp,
        advantage,
        gap
      };
    } catch (err) {
      return {
        ...defaultRes,
        gap: `Scrape error: ${err instanceof Error ? err.message : String(err)}`
      };
    }
  }
  const competitorInsights = competitorList.length ? await Promise.all(competitorList.map(async (c) => {
    try {
      return await scrapeCompetitor(c);
    } catch {
      return {
        competitor: c,
        advantage: "Unknown — needs manual review",
        gap: "Not assessed"
      };
    }
  })) : [];
  const analysis = {
    summary,
    healthScore,
    scoreBreakdown: {
      website: data.websiteUrl ? 70 : 40,
      reputation: data.reviews ? 65 : 40,
      competitive: data.competitors ? 60 : 45,
      marketing: data.notes ? 55 : 45
    },
    keyFindings: [{
      title: data.websiteUrl ? "Website present" : "No website detected",
      type: data.websiteUrl ? "strength" : "problem",
      evidence: data.websiteUrl ? "Website URL provided by user." : "No website URL provided.",
      impact: data.websiteUrl ? "medium" : "high"
    }, {
      title: data.reviews ? "Some reviews available" : "No reviews found",
      type: data.reviews ? "opportunity" : "problem",
      evidence: data.reviews ? "User supplied review text." : "No review data supplied.",
      impact: "medium"
    }, {
      title: data.competitors ? "Competitive context provided" : "Limited competitor info",
      type: data.competitors ? "opportunity" : "problem",
      evidence: data.competitors ? "Competitors listed by user." : "Competitors not provided.",
      impact: "medium"
    }],
    competitorInsights,
    recommendations: [{
      title: "Create or improve website",
      description: "Ensure your website clearly states services, hours, and contact info.",
      category: "website"
    }, {
      title: "Collect reviews",
      description: "Ask satisfied customers for reviews to improve reputation.",
      category: "reputation"
    }, {
      title: "Competitive research",
      description: "Review top competitors for pricing and offerings.",
      category: "marketing"
    }, {
      title: "Prioritize quick wins",
      description: "Start with high-impact, low-effort items like Google Business Profile updates.",
      category: "operations"
    }],
    actionPlan: [{
      priority: 1,
      action: "Update Google Business Profile",
      rationale: "Quick visibility gain",
      effort: "low",
      impact: "high",
      timeframe: "1 week"
    }, {
      priority: 2,
      action: "Ask for 5 recent customer reviews",
      rationale: "Improves trust and search visibility",
      effort: "low",
      impact: "high",
      timeframe: "2 weeks"
    }, {
      priority: 3,
      action: "Improve website contact and service pages",
      rationale: "Better conversion",
      effort: "medium",
      impact: "high",
      timeframe: "1 month"
    }, {
      priority: 4,
      action: "Run simple competitor audit",
      rationale: "Identify gaps to exploit",
      effort: "medium",
      impact: "medium",
      timeframe: "1 month"
    }]
  };
  return {
    analysis
  };
});
export {
  analyzeBusiness_createServerFn_handler
};
