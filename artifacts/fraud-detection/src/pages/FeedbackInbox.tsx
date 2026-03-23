import { useListFeedbackItems } from "@workspace/api-client-react";
import { PageTransition, Card, Badge, Skeleton, Button } from "@/components/ui-elements";
import { useState } from "react";
import { format } from "date-fns";
import { Search, Filter, MessageSquareQuote, Tag, Globe, UserCircle } from "lucide-react";
import { useDebounce } from "use-debounce"; // Assuming we want basic debounce, if not we'll just use local state

export default function FeedbackInbox() {
  const [source, setSource] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  
  const { data, isLoading } = useListFeedbackItems({
    limit: 50,
    source: source || undefined,
    sentiment: sentiment || undefined,
  });

  return (
    <PageTransition className="p-4 md:p-8 max-w-7xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-display font-bold mb-2">Feedback Inbox</h1>
        <p className="text-muted-foreground">Raw verbatims ingested across all connected channels.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 shrink-0 bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search verbatims (Coming soon)..." 
            className="w-full bg-secondary/50 border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            disabled
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={source} 
            onChange={(e) => setSource(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-foreground"
          >
            <option value="">All Sources</option>
            <option value="Zendesk">Zendesk</option>
            <option value="Typeform">Typeform</option>
            <option value="App Store">App Store</option>
          </select>
          <select 
            value={sentiment} 
            onChange={(e) => setSentiment(e.target.value)}
            className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-foreground"
          >
            <option value="">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-8">
        {isLoading ? (
          <div className="space-y-4">
            {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
          </div>
        ) : data?.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-border rounded-2xl">
            <MessageSquareQuote className="h-12 w-12 text-muted mb-4" />
            <h3 className="text-lg font-medium text-foreground">No feedback found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data?.items.map(item => (
              <Card key={item.id} className="hover:border-primary/30 transition-colors group">
                <div className="p-5 flex gap-4">
                  <div className="shrink-0 pt-1">
                    <MessageSquareQuote className="h-6 w-6 text-primary/40 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">{item.source}</Badge>
                      <SentimentBadge score={item.sentimentScore} label={item.sentimentLabel} />
                      <span className="text-xs text-muted-foreground ml-auto">
                        {format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <p className="text-foreground/90 leading-relaxed mb-4 font-medium text-sm md:text-base">"{item.content}"</p>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                      {item.themeLabel && (
                        <div className="flex items-center gap-1 text-primary">
                          <Tag className="h-3 w-3" />
                          <span className="font-medium">{item.themeLabel}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <UserCircle className="h-3 w-3" />
                        {item.customerSegment}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {item.language}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export function SentimentBadge({ score, label }: { score: number, label: string }) {
  if (score > 0.3) return <Badge variant="success">{label}</Badge>;
  if (score < -0.3) return <Badge variant="destructive">{label}</Badge>;
  return <Badge variant="outline" className="bg-secondary/50 text-secondary-foreground">{label}</Badge>;
}
