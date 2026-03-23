import { Link, useLocation } from "wouter";
import { LayoutDashboard, MessageSquareText, Layers, Plug, Bell, Menu, X, BrainCircuit, BookOpen } from "lucide-react";
import { cn } from "@/components/ui-elements";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/feedback", label: "Inbox", icon: MessageSquareText },
  { href: "/themes", label: "AI Themes", icon: Layers },
  { href: "/sources", label: "Sources", icon: Plug },
  { href: "/alerts", label: "Alerts", icon: Bell },
];

export function Sidebar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const isActive = (path: string) => {
    if (path === "/" && location !== "/") return false;
    return location.startsWith(path);
  };

  const SidebarContent = (
    <div className="flex h-full flex-col bg-card/50 backdrop-blur-xl border-r border-border/50 text-foreground w-64 pt-6">
      <div className="flex items-center px-6 mb-8 gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
          <BrainCircuit className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl tracking-tight leading-none text-white">CFIP</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 px-4 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={closeSidebar}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer group relative overflow-hidden",
                  active 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {active && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" 
                  />
                )}
                <item.icon className={cn("h-5 w-5 transition-colors", active ? "text-primary" : "group-hover:text-foreground")} />
                {item.label}
              </div>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-border/40">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-4 mb-2 font-semibold">Portfolio</p>
          <Link href="/story" onClick={closeSidebar}>
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 cursor-pointer group relative overflow-hidden",
                isActive("/story")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              {isActive("/story") && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                />
              )}
              <BookOpen className={cn("h-5 w-5 transition-colors", isActive("/story") ? "text-primary" : "group-hover:text-foreground")} />
              PM Case Study
              <span className="ml-auto text-[10px] bg-primary/15 text-primary px-1.5 py-0.5 rounded font-semibold">NEW</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="p-6 mt-auto">
        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 p-4">
          <p className="text-xs font-medium text-primary-foreground mb-1 font-display">System Status</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <p className="text-xs text-muted-foreground">All models operational</p>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <div className="h-9 w-9 rounded-full bg-secondary border border-border flex items-center justify-center text-sm font-bold">
            PM
          </div>
          <div className="text-xs">
            <p className="font-medium text-foreground">Senior PM</p>
            <p className="text-muted-foreground">Portfolio Viewer</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-card rounded-md border border-border shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {SidebarContent}
      </div>
    </>
  );
}
