"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  X,
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  User,
  Settings,
  LogOut,
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
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { VscMenu } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";



function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

const titles: Record<string, string> = {
  "/dashboard": "Board",
  "/dashboard/add": "Add Job",
  "/dashboard/stats": "Analytics",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
  "/dashboard/notifications": "Notifications",
};

const mobileNav = [
  {
    label: "Main",
    items: [
      { href: "/dashboard", label: "Board", icon: LayoutDashboard },
      { href: "/dashboard/add", label: "Add Job", icon: PlusCircle },
      { href: "/dashboard/stats", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/saved", label: "Saved", icon: Bookmark, disabled: true },
      { href: "/dashboard/applied", label: "Applied", icon: Send, disabled: true },
      { href: "/dashboard/offers", label: "Offers", icon: Trophy, disabled: true },
    ],
  },
  {
    label: "Documents",
    items: [
      { href: "/dashboard/resume", label: "Resume", icon: FileText, disabled: true },
      { href: "/dashboard/cover-letters", label: "Cover Letters", icon: MessageSquare, disabled: true },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/profile", label: "Profile", icon: User },
      { href: "/dashboard/settings", label: "Preferences", icon: Palette },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard, disabled: true },
      { href: "/dashboard/security", label: "Security", icon: Shield, disabled: true },
      { href: "/dashboard/support", label: "Support", icon: HelpCircle, disabled: true },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Topbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const title =
    Object.entries(titles).find(([key]) => pathname === key)?.[1] ??
    (pathname.startsWith("/dashboard/jobs") ? "Job Detail" : "Dashboard");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNavClick = () => setOpen(false);

  return (
    <>
      {/* Mobile + Tablet topbar */}
      <header className="sticky top-0 z-30 w-full border-b border-border bg-card/90 backdrop-blur-sm lg:hidden">
        <div className="relative flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(true)}
              className="p-2 rounded-xl hover:bg-accent transition-colors"
            >
              <VscMenu className="w-8 h-8 text-sidebar-ring" />
            </motion.button>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Briefcase className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-sm">JobTracker</span>
            </Link>
          </div>

          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-heading font-semibold">
            {title}
          </span>

          <Avatar className="w-8 h-8 border border-border shrink-0">
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {getInitials(session?.user?.name, session?.user?.email)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Desktop topbar */}
      <header className="hidden lg:flex sticky top-0 z-30 w-full border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-8 h-16 w-full">
          <div className="flex flex-col">
            <h1 className="text-lg font-heading font-bold">{title}</h1>
            <p className="text-xs text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-accent transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <Link
              href="/dashboard/add"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity",
                pathname === "/dashboard/add" && "opacity-60 pointer-events-none"
              )}
            >
              <PlusCircle className="w-4 h-4" />
              Add Job
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-card border-r border-border shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-border shrink-0">
                <Link href="/dashboard" onClick={handleNavClick} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                    <Briefcase className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="font-heading font-bold text-sm">JobTracker</span>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                >
                  <GrClose className="w-6 h-6 text-sidebar-ring" />
                </motion.button>
              </div>

              <div className="px-4 py-3 border-b border-border shrink-0">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-accent/50">
                  <Avatar className="w-9 h-9 border border-border shrink-0">
                    <AvatarImage src={session?.user?.image ?? ""} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {getInitials(session?.user?.name, session?.user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold truncate">{session?.user?.name ?? "User"}</span>
                    <span className="text-xs text-muted-foreground truncate">{session?.user?.email}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3">
                {mobileNav.map((section) => (
                  <div key={section.label} className="mb-4">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">
                      {section.label}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={`${item.href}-${item.label}`}
                            href={item.disabled ? "#" : item.href}
                            onClick={(e) => {
                              if (item.disabled) {
                                e.preventDefault();
                              } else {
                                handleNavClick();
                              }
                            }}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                              active
                                ? "bg-primary text-primary-foreground"
                                : item.disabled
                                ? "text-muted-foreground/40 cursor-not-allowed"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                          >
                            <item.icon className="w-4 h-4 shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            {item.disabled && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                                Soon
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-3 py-4 border-t border-border shrink-0">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}