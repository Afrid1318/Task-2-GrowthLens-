import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import type { AnalyzeInput } from "@/lib/analyze.functions";

type Props = {
  isLoading: boolean;
  onSubmit: (data: AnalyzeInput) => void;
};

export function AnalysisForm({ isLoading, onSubmit }: Props) {
  const [form, setForm] = useState<AnalyzeInput>({
    businessName: "",
    industry: "",
    location: "",
    websiteUrl: "",
    competitors: "",
    reviews: "",
    notes: "",
  });

  const update =
    (k: keyof AnalyzeInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <Card className="p-6 md:p-8 border-border/60 bg-card/60 backdrop-blur-sm shadow-[var(--shadow-card)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="grid gap-5"
      >
        <div className="grid gap-2">
          <Label htmlFor="businessName">Business name *</Label>
          <Input
            id="businessName"
            required
            value={form.businessName}
            onChange={update("businessName")}
            placeholder="e.g. Bella's Bakery"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={form.industry}
              onChange={update("industry")}
              placeholder="Bakery, Plumbing, Dental..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={form.location}
              onChange={update("location")}
              placeholder="Austin, TX"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input
            id="websiteUrl"
            type="url"
            value={form.websiteUrl}
            onChange={update("websiteUrl")}
            placeholder="https://yourbusiness.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="competitors">Competitor websites or names</Label>
          <Textarea
            id="competitors"
            rows={2}
            value={form.competitors}
            onChange={update("competitors")}
            placeholder="competitor1.com, competitor2.com, Local Rival Inc."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="reviews">Google Reviews (paste sample reviews)</Label>
          <Textarea
            id="reviews"
            rows={5}
            value={form.reviews}
            onChange={update("reviews")}
            placeholder="★★★★☆ Great service but the wait was long...&#10;★★☆☆☆ Website was hard to use..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="notes">Additional info / what's been slowing growth?</Label>
          <Textarea
            id="notes"
            rows={3}
            value={form.notes}
            onChange={update("notes")}
            placeholder="Sales dropped 20% this year, no marketing budget, mostly word of mouth..."
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !form.businessName}
          variant="hero"
          size="lg"
          className="mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing your business...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Run AI Analysis
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
