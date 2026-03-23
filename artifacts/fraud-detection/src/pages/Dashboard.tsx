import { useGetDashboard, useGetAnalytics } from "@workspace/api-client-react";
import { cn, PageTransition, Card, CardHeader, CardTitle, CardContent, Badge, Skeleton, Button } from "@/components/ui-elements";
import { MessageSquare, Layers, TrendingUp, AlertOctagon, ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { format } from "date-fns";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading, refetch } = useGetDashboard();
  const { data: analytics, isLoading: analyticsLoading } = useGetAnalytics();

  if (statsLoading || analyticsLoading) {
    return (
      <PageTransition className="p-8 space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="col-span-2 h-[400px] rounded-2xl" />
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
      </PageTransition>
    );
  }

  const PIE_COLORS = ['hsl(142, 71%, 45%)', 'hsl(240, 5%, 65%)', 'hsl(0, 84%, 60%)'];

  const sentimentData = [
    { name: 'Positive', value: stats?.sentimentBreakdown.positive || 0 },
    { name: 'Neutral', value: stats?.sentimentBreakdown.neutral || 0 },
    { name: 'Negative', value: stats?.sentimentBreakdown.negative || 0 },
  ];

  const volumeChange = stats ? ((stats.feedbackThisWeek - stats.feedbackLastWeek) / stats.feedbackLastWeek) * 100 : 0;
  
  return (
    <PageTransition className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Platform Overview
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Real-time intelligence extracted from customer feedback across all connected sources.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground hidden sm:block">Last updated: {format(new Date(), 'HH:mm a')}</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KpiCard 
          title="Total Feedback" 
          value={stats?.totalFeedbackItems.toLocaleString() || "0"} 
          icon={MessageSquare}
          trend={volumeChange}
          trendLabel="vs last week"
        />
        <KpiCard 
          title="Active AI Themes" 
          value={stats?.activeThemes.toString() || "0"} 
          icon={Layers}
          subtitle={`${stats?.insightsActivated} insights generated`}
        />
        <KpiCard 
          title="Avg Sentiment" 
          value={(stats?.avgSentimentScore || 0).toFixed(1)} 
          icon={TrendingUp}
          sentiment={stats?.avgSentimentScore}
        />
        <KpiCard 
          title="Open Alerts" 
          value={stats?.openAlerts.toString() || "0"} 
          icon={AlertOctagon}
          alert={stats?.openAlerts ? (stats.openAlerts > 5) : false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="col-span-1 lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Feedback Volume Trend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px]">
            {analytics?.weeklyTrend && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.weeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Sentiment Pie */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Global Sentiment</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center items-center min-h-[300px]">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 text-sm w-full justify-center">
              {sentimentData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Distribution */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Themes by Impact Score</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {analytics?.themeDistribution && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.themeDistribution} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="label" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} width={120} />
                  <RechartsTooltip 
                    cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  />
                  <Bar dataKey="impactScore" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} barSize={24} name="Impact Score" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}

function KpiCard({ title, value, icon: Icon, trend, trendLabel, subtitle, sentiment, alert }: any) {
  return (
    <Card className="glow-effect transition-all hover:-translate-y-1 duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn(
            "p-2 rounded-lg bg-secondary",
            alert && "bg-destructive/20 text-destructive animate-pulse"
          )}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-display font-bold text-foreground tracking-tight">{value}</h2>
          {sentiment !== undefined && (
             <span className={cn(
               "text-sm font-medium",
               sentiment > 0.5 ? "text-success" : sentiment < -0.5 ? "text-destructive" : "text-muted-foreground"
             )}>
               / 1.0
             </span>
          )}
        </div>
        
        {(trend !== undefined || subtitle) && (
          <div className="mt-3 flex items-center text-xs">
            {trend !== undefined && (
              <>
                <span className={cn(
                  "flex items-center font-medium mr-1.5",
                  trend > 0 ? "text-success" : trend < 0 ? "text-destructive" : "text-muted-foreground"
                )}>
                  {trend > 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : trend < 0 ? <ArrowDownRight className="h-3 w-3 mr-0.5" /> : null}
                  {Math.abs(trend).toFixed(1)}%
                </span>
                <span className="text-muted-foreground">{trendLabel}</span>
              </>
            )}
            {subtitle && <span className="text-muted-foreground">{subtitle}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
