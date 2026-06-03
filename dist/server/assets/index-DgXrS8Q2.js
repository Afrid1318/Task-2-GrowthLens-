import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { Toaster as Toaster$1, toast } from "sonner";
import { Loader2, Sparkles, Target, TrendingUp, CheckCircle2, Lightbulb, AlertTriangle, Users, Zap, Shield, BarChart3 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-B-rv6-UB.js";
import { z } from "zod";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90 transition-opacity [background:var(--gradient-primary)]"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
function AnalysisForm({ isLoading, onSubmit }) {
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    location: "",
    websiteUrl: "",
    competitors: "",
    reviews: "",
    notes: ""
  });
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  return /* @__PURE__ */ jsx(Card, { className: "p-6 md:p-8 border-border/60 bg-card/60 backdrop-blur-sm shadow-[var(--shadow-card)]", children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit(form);
      },
      className: "grid gap-5",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "businessName", children: "Business name *" }),
          /* @__PURE__ */ jsx(Input, { id: "businessName", required: true, value: form.businessName, onChange: update("businessName"), placeholder: "e.g. Bella's Bakery" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "industry", children: "Industry" }),
            /* @__PURE__ */ jsx(Input, { id: "industry", value: form.industry, onChange: update("industry"), placeholder: "Bakery, Plumbing, Dental..." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "location", children: "Location" }),
            /* @__PURE__ */ jsx(Input, { id: "location", value: form.location, onChange: update("location"), placeholder: "Austin, TX" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "websiteUrl", children: "Website URL" }),
          /* @__PURE__ */ jsx(Input, { id: "websiteUrl", type: "url", value: form.websiteUrl, onChange: update("websiteUrl"), placeholder: "https://yourbusiness.com" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "competitors", children: "Competitor websites or names" }),
          /* @__PURE__ */ jsx(Textarea, { id: "competitors", rows: 2, value: form.competitors, onChange: update("competitors"), placeholder: "competitor1.com, competitor2.com, Local Rival Inc." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "reviews", children: "Google Reviews (paste sample reviews)" }),
          /* @__PURE__ */ jsx(Textarea, { id: "reviews", rows: 5, value: form.reviews, onChange: update("reviews"), placeholder: "★★★★☆ Great service but the wait was long...\n★★☆☆☆ Website was hard to use..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "notes", children: "Additional info / what's been slowing growth?" }),
          /* @__PURE__ */ jsx(Textarea, { id: "notes", rows: 3, value: form.notes, onChange: update("notes"), placeholder: "Sales dropped 20% this year, no marketing budget, mostly word of mouth..." })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isLoading || !form.businessName, variant: "hero", size: "lg", className: "mt-2", children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          "Analyzing your business..."
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
          "Run AI Analysis"
        ] }) })
      ]
    }
  ) });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const findingMeta = {
  problem: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10 border-destructive/30", label: "Problem" },
  opportunity: { icon: Lightbulb, color: "text-[color:var(--warning)]", bg: "bg-[color:var(--warning)]/10 border-[color:var(--warning)]/30", label: "Opportunity" },
  strength: { icon: CheckCircle2, color: "text-[color:var(--success)]", bg: "bg-[color:var(--success)]/10 border-[color:var(--success)]/30", label: "Strength" }
};
const impactColor = {
  high: "bg-destructive/20 text-destructive border-destructive/40",
  medium: "bg-[color:var(--warning)]/20 text-[color:var(--warning)] border-[color:var(--warning)]/40",
  low: "bg-muted text-muted-foreground border-border"
};
const effortColor = {
  low: "bg-[color:var(--success)]/20 text-[color:var(--success)] border-[color:var(--success)]/40",
  medium: "bg-[color:var(--warning)]/20 text-[color:var(--warning)] border-[color:var(--warning)]/40",
  high: "bg-destructive/20 text-destructive border-destructive/40"
};
function AnalysisResults({ data }) {
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
    /* @__PURE__ */ jsxs(Card, { className: "p-6 md:p-8 border-border/60 bg-card/60 backdrop-blur-sm shadow-[var(--shadow-card)]", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-[1fr_auto] gap-6 items-start", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-primary mb-2 text-sm font-medium uppercase tracking-wider", children: [
            /* @__PURE__ */ jsx(Target, { className: "h-4 w-4" }),
            " Executive summary"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed text-foreground/90", children: data.summary })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-w-[160px] rounded-xl border border-border/60 bg-background/40 p-5", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-muted-foreground mb-1", children: "Health score" }),
          /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold [background:var(--gradient-primary)] bg-clip-text text-transparent", children: Math.round(data.healthScore) }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mt-1", children: "out of 100" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6", children: Object.entries(data.scoreBreakdown).map(([k, v]) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border/60 bg-background/40 p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "capitalize text-muted-foreground", children: k }),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: Math.round(v) })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: v, className: "h-1.5" })
      ] }, k)) })
    ] }),
    /* @__PURE__ */ jsx(Section, { icon: TrendingUp, title: "Key findings", subtitle: "What's helping and hurting growth", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: data.keyFindings.map((f, i) => {
      const m = findingMeta[f.type];
      const Icon = m.icon;
      return /* @__PURE__ */ jsx(Card, { className: `p-5 border ${m.bg}`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(Icon, { className: `h-5 w-5 mt-0.5 ${m.color}` }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground", children: f.title }),
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: `text-[10px] uppercase ${impactColor[f.impact]}`, children: [
              f.impact,
              " impact"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground/80", children: "Evidence: " }),
            f.evidence
          ] })
        ] })
      ] }) }, i);
    }) }) }),
    data.competitorInsights.length > 0 && /* @__PURE__ */ jsx(Section, { icon: Users, title: "Competitor insights", subtitle: "What rivals do better and where the gap is", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: data.competitorInsights.map((c, i) => /* @__PURE__ */ jsxs(Card, { className: "p-5 border-border/60 bg-card/60", children: [
      /* @__PURE__ */ jsx("div", { className: "font-semibold text-foreground mb-3", children: c.competitor }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-4 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-primary mb-1", children: "Their advantage" }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground/90", children: c.advantage })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-wider text-[color:var(--accent)] mb-1", children: "Your gap / opportunity" }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground/90", children: c.gap })
        ] })
      ] })
    ] }, i)) }) }),
    /* @__PURE__ */ jsx(Section, { icon: Lightbulb, title: "Recommendations", subtitle: "What actions you should take", children: /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-4", children: data.recommendations.map((r, i) => /* @__PURE__ */ jsxs(Card, { className: "p-5 border-border/60 bg-card/60", children: [
      /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize mb-2 border-primary/40 text-primary", children: r.category }),
      /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground mb-1", children: r.title }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: r.description })
    ] }, i)) }) }),
    /* @__PURE__ */ jsx(Section, { icon: Zap, title: "Prioritized action plan", subtitle: "Do these in order — highest priority first", children: /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: [...data.actionPlan].sort((a, b) => a.priority - b.priority).map((a, i) => /* @__PURE__ */ jsx(Card, { className: "p-5 border-border/60 bg-card/60", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full [background:var(--gradient-primary)] text-primary-foreground font-bold shadow-[var(--shadow-glow)]", children: a.priority }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap mb-1", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-semibold text-foreground", children: a.action }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: `text-[10px] uppercase ${effortColor[a.effort]}`, children: [
              a.effort,
              " effort"
            ] }),
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: `text-[10px] uppercase ${impactColor[a.impact]}`, children: [
              a.impact,
              " impact"
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[10px] uppercase border-border text-muted-foreground", children: a.timeframe })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: a.rationale })
      ] })
    ] }) }, i)) }) })
  ] });
}
function Section({
  icon: Icon,
  title,
  subtitle,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-foreground leading-tight", children: title }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })
      ] })
    ] }),
    children
  ] });
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
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
const analyzeBusiness = createServerFn({
  method: "POST"
}).inputValidator((d) => inputSchema.parse(d)).handler(createSsrRpc("a87d015ab2eacb8af743f08c75ab982e33d2be295a710d9d1ab77a9080bce269"));
function Index() {
  const analyze = useServerFn(analyzeBusiness);
  const [result, setResult] = useState(null);
  const mutation = useMutation({
    mutationFn: (data) => analyze({
      data
    }),
    onSuccess: (res) => {
      setResult(res.analysis);
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);
    },
    onError: (e) => {
      toast.error(e.message || "Something went wrong. Please try again.");
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen text-foreground", style: {
    background: "var(--gradient-bg)"
  }, children: [
    /* @__PURE__ */ jsx(Toaster, { theme: "dark", position: "top-right" }),
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/40 backdrop-blur-sm sticky top-0 z-10 bg-background/40", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-6xl flex items-center justify-between px-4 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg shadow-[var(--shadow-glow)]", style: {
          background: "var(--gradient-primary)"
        }, children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-foreground leading-tight", children: "GrowthLens" }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "AI Business Assistant" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-4 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5" }),
          " Private analysis"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(BarChart3, { className: "h-3.5 w-3.5" }),
          " Evidence-based"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "container mx-auto max-w-5xl px-4 py-12 md:py-20", children: [
      /* @__PURE__ */ jsxs("section", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary mb-5", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3" }),
          " Powered by AI growth intelligence"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "relative z-20 text-4xl md:text-6xl font-bold tracking-tight mb-5", children: [
          "Why has your growth",
          " ",
          /* @__PURE__ */ jsx("span", { className: "[background:var(--gradient-primary)] bg-clip-text text-transparent", children: "stalled?" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "relative z-20 mx-auto max-w-2xl text-lg text-muted-foreground", children: "Paste your business details, reviews, and competitors. GrowthLens analyzes everything and returns a prioritized action plan you can execute this week." })
      ] }),
      /* @__PURE__ */ jsx(AnalysisForm, { isLoading: mutation.isPending, onSubmit: (d) => mutation.mutate(d) }),
      result && /* @__PURE__ */ jsxs("section", { id: "results", className: "mt-14 scroll-mt-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "Your growth report" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-2", children: "Generated by AI — review and act on what matters most." })
        ] }),
        /* @__PURE__ */ jsx(AnalysisResults, { data: result })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "mt-20 text-center text-xs text-muted-foreground", children: "Built with Lovable · Powered by Lovable AI Gateway" })
    ] })
  ] });
}
export {
  Index as component
};
