import { useListAlerts, useUpdateAlert } from "@workspace/api-client-react";
import { PageTransition, Card, Badge, Skeleton, Button } from "@/components/ui-elements";
import { format } from "date-fns";
import { Bell, AlertTriangle, ShieldAlert, AlertCircle, Info, Check, ArrowRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";

export default function Alerts() {
  const { data: alerts, isLoading } = useListAlerts();
  const queryClient = useQueryClient();

  const updateAlertMut = useUpdateAlert({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`/api/cfip/alerts`] });
      }
    }
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return <ShieldAlert className="h-5 w-5 text-destructive" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'medium': return <AlertCircle className="h-5 w-5 text-primary" />;
      default: return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'high': return <Badge variant="warning">High</Badge>;
      case 'medium': return <Badge variant="default">Medium</Badge>;
      default: return <Badge variant="secondary">Low</Badge>;
    }
  };

  return (
    <PageTransition className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Automated Alerts</h1>
          <p className="text-muted-foreground">Proactive notifications for churn risks, sentiment drops, and anomalies.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      ) : alerts?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center border-2 border-dashed border-border rounded-2xl">
          <Bell className="h-12 w-12 text-muted mb-4" />
          <h3 className="text-lg font-medium text-foreground">All clear</h3>
          <p className="text-muted-foreground mt-1">No active alerts requiring your attention.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {alerts?.map(alert => (
            <Card key={alert.id} className={`overflow-hidden transition-all duration-300 ${alert.status === 'Resolved' ? 'opacity-60 bg-secondary/20' : 'hover:border-primary/40'}`}>
              <div className="p-5 flex flex-col md:flex-row gap-5 items-start md:items-center">
                <div className="shrink-0 pt-1 md:pt-0">
                  {getSeverityIcon(alert.severity)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    {getSeverityBadge(alert.severity)}
                    <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{alert.type}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(alert.createdAt), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-1">{alert.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{alert.description}</p>
                  
                  {alert.themeId && (
                    <Link href={`/themes/${alert.themeId}`} className="inline-flex items-center mt-3 text-xs font-medium text-primary hover:underline">
                      Investigate Theme: {alert.themeLabel}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  )}
                </div>

                <div className="shrink-0 w-full md:w-auto flex justify-end">
                  {alert.status !== 'Resolved' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateAlertMut.mutate({ data: { id: alert.id, status: 'Resolved' } })}
                      isLoading={updateAlertMut.isPending && updateAlertMut.variables?.data.id === alert.id}
                      className="w-full md:w-auto"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
