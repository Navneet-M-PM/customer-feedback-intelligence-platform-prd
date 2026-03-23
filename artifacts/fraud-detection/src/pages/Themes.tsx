import { useListThemes } from "@workspace/api-client-react";
import { cn, PageTransition, Card, Badge, Skeleton } from "@/components/ui-elements";
import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, Layers, Activity } from "lucide-react";

export default function Themes() {
  const { data: themes, isLoading } = useListThemes();

  return (
    <PageTransition className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">AI Clustered Themes</h1>
          <p className="text-muted-foreground">Automatically categorized topics emerging from customer feedback.</p>
        </div>
        <div className="flex gap-2">
          {/* Filters would go here */}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {themes?.map(theme => (
            <Link key={theme.id} href={`/themes/${theme.id}`} className="block h-full outline-none">
              <Card className="h-full flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <Badge variant={
                      theme.status === 'Actioned' ? 'success' : 
                      theme.status === 'Dismissed' ? 'secondary' : 'default'
                    } className="mb-2">
                      {theme.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                      <Layers className="h-3 w-3" />
                      {theme.itemCount}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {theme.label}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
                    {theme.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50 mt-auto">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Impact Score</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground">{theme.impactScore}</span>
                        <div className={cn(
                          "flex items-center text-xs font-medium",
                          theme.velocityChange > 0 ? "text-destructive" : "text-success" // High impact + positive velocity = bad (usually means issue is growing)
                        )}>
                          {theme.velocityChange > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {Math.abs(theme.velocityChange)}%
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Avg Sentiment</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all",
                              theme.sentimentAvg > 0.3 ? "bg-success" : theme.sentimentAvg < -0.3 ? "bg-destructive" : "bg-warning"
                            )}
                            style={{ width: `${((theme.sentimentAvg + 1) / 2) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{theme.sentimentAvg.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
