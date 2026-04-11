"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  FileText,
  Bookmark,
  Send,
  Trophy,
  HelpCircle,
  MessageSquare,
  Shield,
  CreditCard,
  Palette,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

interface ChildItem {
  href: string;
  label: string;
  icon: React.ElementType;
  disabled?: boolean;
  badge?: string;
}

interface NavItem {
  href?: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  disabled?: boolean;
  children?: ChildItem[];
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Board", icon: LayoutDashboard },
  {
    label: "Jobs",
    icon: Briefcase,
    children: [
      { href: "/dashboard/add", label: "Add Job", icon: PlusCircle },
      { href: "/dashboard/saved", label: "Saved", icon: Bookmark, disabled: true, badge: "Soon" },
      { href: "/dashboard/applied", label: "Applied", icon: Send, disabled: true, badge: "Soon" },
      { href: "/dashboard/offers", label: "Offers", icon: Trophy, disabled: true, badge: "Soon" },
    ],
  },
  {
    label: "Documents",
    icon: FileText,
    disabled: true,
    badge: "Soon",
    children: [
      { href: "/dashboard/resume", label: "Resume", icon: FileText, disabled: true, badge: "Soon" },
      { href: "/dashboard/cover-letters", label: "Cover Letters", icon: MessageSquare, disabled: true, badge: "Soon" },
    ],
  },
  { href: "/dashboard/stats", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, disabled: true, badge: "Soon" },
];

const bottomItems: NavItem[] = [
  {
    label: "Account",
    icon: User,
    children: [
      { href: "/dashboard/profile", label: "Profile", icon: User },
      { href: "/dashboard/settings", label: "Preferences", icon: Palette },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard, disabled: true, badge: "Soon" },
      { href: "/dashboard/security", label: "Security", icon: Shield, disabled: true, badge: "Soon" },
    ],
  },
  {
    label: "Help",
    icon: HelpCircle,
    children: [
      { href: "/dashboard/support", label: "Support", icon: MessageSquare, disabled: true, badge: "Soon" },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const hasActiveChild = item.children?.some((c) => c.href === pathname);
  const [open, setOpen] = useState(hasActiveChild ?? false);
  const isActive = item.href === pathname;

  if (item.href && !item.children) {
    return (
      <Link
        href={item.disabled ? "#" : item.href}
        onClick={(e) => item.disabled && e.preventDefault()}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : item.disabled
            ? "text-muted-foreground/40 cursor-not-allowed"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {item.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => !item.disabled && setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
          hasActiveChild
            ? "text-foreground bg-accent"
            : item.disabled
            ? "text-muted-foreground/40 cursor-not-allowed"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
            {item.badge}
          </span>
        )}
        {!item.disabled && item.children && (
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-border pl-3">
              {item.children.map((child) => {
                const childActive = child.href === pathname;
                return (
                  <Link
                    key={child.href}
                    href={child.disabled ? "#" : child.href}
                    onClick={(e) => child.disabled && e.preventDefault()}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150",
                      childActive
                        ? "bg-primary text-primary-foreground"
                        : child.disabled
                        ? "text-muted-foreground/40 cursor-not-allowed"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <child.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="flex-1">{child.label}</span>
                    {child.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                        {child.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar() {
  const { data: session } = useSession();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-border bg-card shrink-0">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Briefcase className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <span className="font-heading font-bold text-sm tracking-tight">JobTracker</span>
        <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
          v1.0
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
          Main
        </p>
        <div className="flex flex-col gap-0.5">
          {navItems.map((item, i) => (
            <NavItemComponent key={i} item={item} />
          ))}
        </div>

        <div className="h-px bg-border my-4" />

        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">
          Account
        </p>
        <div className="flex flex-col gap-0.5">
          {bottomItems.map((item, i) => (
            <NavItemComponent key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="px-3 py-4 border-t border-border shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-accent/50 mb-2">
          <Avatar className="w-8 h-8 border border-border shrink-0">
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {getInitials(session?.user?.name, session?.user?.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold truncate">{session?.user?.name ?? "User"}</span>
            <span className="text-[11px] text-muted-foreground truncate">{session?.user?.email}</span>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}