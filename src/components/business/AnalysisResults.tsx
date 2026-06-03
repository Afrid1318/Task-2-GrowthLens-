import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { BusinessAnalysis } from "@/lib/analyze.functions";

const findingMeta = {
  problem: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10 border-destructive/30",
    label: "Problem",
  },
  opportunity: {
    icon: Lightbulb,
    color: "text-[color:var(--warning)]",
    bg: "bg-[color:var(--warning)]/10 border-[color:var(--warning)]/30",
    label: "Opportunity",
  },
  strength: {
    icon: CheckCircle2,
    color: "text-[color:var(--success)]",
    bg: "bg-[color:var(--success)]/10 border-[color:var(--success)]/30",
    label: "Strength",
  },
} as const;

const impactColor = {
  high: "bg-destructive/20 text-destructive border-destructive/40",
  medium:
    "bg-[color:var(--warning)]/20 text-[color:var(--warning)] border-[color:var(--warning)]/40",
  low: "bg-muted text-muted-foreground border-border",
} as const;

const effortColor = {
  low: "bg-[color:var(--success)]/20 text-[color:var(--success)] border-[color:var(--success)]/40",
  medium:
    "bg-[color:var(--warning)]/20 text-[color:var(--warning)] border-[color:var(--warning)]/40",
  high: "bg-destructive/20 text-destructive border-destructive/40",
} as const;

export function AnalysisResults({ data }: { data: BusinessAnalysis }) {
  return (
    <div className="grid gap-6">
      {/* Summary + score */}
      <Card className="p-6 md:p-8 border-border/60 bg-card/60 backdrop-blur-sm shadow-[var(--shadow-card)]">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <div className="flex items-center gap-2 text-primary mb-2 text-sm font-medium uppercase tracking-wider">
              <Target className="h-4 w-4" /> Executive summary
            </div>
            <p className="text-lg leading-relaxed text-foreground/90">{data.summary}</p>
          </div>
          <div className="flex flex-col items-center justify-center min-w-[160px] rounded-xl border border-border/60 bg-background/40 p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Health score
            </div>
            <div className="text-5xl font-bold [background:var(--gradient-primary)] bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              {Math.round(data.healthScore)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">out of 100</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {(Object.entries(data.scoreBreakdown) as [string, number][]).map(([k, v]) => (
            <div key={k} className="rounded-lg border border-border/60 bg-background/40 p-3">
              <div className="flex justify-between text-xs mb-2">
                <span className="capitalize text-muted-foreground">{k}</span>
                <span className="font-semibold text-foreground">{Math.round(v)}</span>
              </div>
              <Progress value={v} className="h-1.5" />
            </div>
          ))}
        </div>
      </Card>

      {/* Key findings */}
      <Section icon={TrendingUp} title="Key findings" subtitle="What's helping and hurting growth">
        <div className="grid md:grid-cols-2 gap-4">
          {data.keyFindings.map((f, i) => {
            const m = findingMeta[f.type];
            const Icon = m.icon;
            return (
              <Card key={i} className={`p-5 border ${m.bg}`}>
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${m.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="font-semibold text-foreground">{f.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-[10px] uppercase ${impactColor[f.impact]}`}
                      >
                        {f.impact} impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">Evidence: </span>
                      {f.evidence}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Competitors */}
      {data.competitorInsights.length > 0 && (
        <Section
          icon={Users}
          title="Competitor insights"
          subtitle="What rivals do better and where the gap is"
        >
          <div className="grid gap-4">
            {data.competitorInsights.map((c, i) => (
              <Card key={i} className="p-5 border-border/60 bg-card/60">
                <div className="font-semibold text-foreground mb-3">{c.competitor}</div>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-primary mb-1">
                      Their advantage
                    </div>
                    <p className="text-foreground/90">{c.advantage}</p>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[color:var(--accent)] mb-1">
                      Your gap / opportunity
                    </div>
                    <p className="text-foreground/90">{c.gap}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Recommendations */}
      <Section icon={Lightbulb} title="Recommendations" subtitle="What actions you should take">
        <div className="grid md:grid-cols-2 gap-4">
          {data.recommendations.map((r, i) => (
            <Card key={i} className="p-5 border-border/60 bg-card/60">
              <Badge variant="outline" className="capitalize mb-2 border-primary/40 text-primary">
                {r.category}
              </Badge>
              <h4 className="font-semibold text-foreground mb-1">{r.title}</h4>
              <p className="text-sm text-muted-foreground">{r.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Action Plan */}
      <Section
        icon={Zap}
        title="Prioritized action plan"
        subtitle="Do these in order — highest priority first"
      >
        <div className="grid gap-3">
          {[...data.actionPlan]
            .sort((a, b) => a.priority - b.priority)
            .map((a, i) => (
              <Card key={i} className="p-5 border-border/60 bg-card/60">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full [background:var(--gradient-primary)] text-primary-foreground font-bold shadow-[var(--shadow-glow)]">
                    {a.priority}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                      <h4 className="font-semibold text-foreground">{a.action}</h4>
                      <div className="flex gap-1.5 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`text-[10px] uppercase ${effortColor[a.effort]}`}
                        >
                          {a.effort} effort
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-[10px] uppercase ${impactColor[a.impact]}`}
                        >
                          {a.impact} impact
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-[10px] uppercase border-border text-muted-foreground"
                        >
                          {a.timeframe}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{a.rationale}</p>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
