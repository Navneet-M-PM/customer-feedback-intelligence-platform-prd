import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "@/components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import FeedbackInbox from "@/pages/FeedbackInbox";
import Themes from "@/pages/Themes";
import ThemeDetail from "@/pages/ThemeDetail";
import Sources from "@/pages/Sources";
import Alerts from "@/pages/Alerts";
import PMStory from "@/pages/PMStory";
import NotFound from "@/pages/not-found";

// Initialize react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden focus:outline-none bg-background shadow-[-10px_0_30px_rgba(0,0,0,0.5)] z-10 rounded-l-none md:rounded-l-3xl border-l border-border/50">
        <div className="min-h-full pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/feedback" component={FeedbackInbox} />
      <Route path="/themes" component={Themes} />
      <Route path="/themes/:id" component={ThemeDetail} />
      <Route path="/sources" component={Sources} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/story" component={PMStory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <AppShell>
          <Router />
        </AppShell>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
