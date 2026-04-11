"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#app", label: "Get the app" },
  { href: "#faq", label: "FAQ" },
];

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

function UserMenu() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-accent transition-colors outline-none group">
          <Avatar className="w-8 h-8 border border-border">
            <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
              {getInitials(user?.name, user?.email)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-xs font-semibold leading-none text-foreground">
              {user?.name ?? "User"}
            </span>
            <span className="text-[11px] text-muted-foreground leading-none mt-0.5 max-w-35 truncate">
              {user?.email}
            </span>
          </div>
          <svg
            className="w-3.5 h-3.5 text-muted-foreground hidden md:block transition-transform group-data-[state=open]:rotate-180"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-2xl border border-border bg-card shadow-xl p-1"
      >
        <div className="flex items-center gap-3 px-3 py-3 mb-1">
          <Avatar className="w-10 h-10 border border-border shrink-0">
            <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
              {getInitials(user?.name, user?.email)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold leading-none text-foreground truncate">
              {user?.name ?? "User"}
            </span>
            <span className="text-xs text-muted-foreground leading-none mt-1 truncate">
              {user?.email}
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          asChild
          className="rounded-xl cursor-pointer gap-3 px-3 py-2.5 text-sm font-medium"
        >
          <Link href="/dashboard">
            <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="rounded-xl cursor-pointer gap-3 px-3 py-2.5 text-sm font-medium"
        >
          <Link href="/dashboard/profile">
            <User className="w-4 h-4 text-muted-foreground" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="rounded-xl cursor-pointer gap-3 px-3 py-2.5 text-sm font-medium"
        >
          <Link href="/dashboard/settings">
            <Settings className="w-4 h-4 text-muted-foreground" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-border" />

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-xl cursor-pointer gap-3 px-3 py-2.5 text-sm font-medium text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setMobileOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Briefcase className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-heading font-bold text-sm tracking-tight">
            JobTracker
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          {status === "loading" ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <UserMenu />
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-semibold px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-2">
          {status === "authenticated" && session && (
            <Avatar className="w-8 h-8 border border-border">
              <AvatarImage src={session.user?.image ?? ""} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                {getInitials(session.user?.name, session.user?.email)}
              </AvatarFallback>
            </Avatar>
          )}
          <button
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 z-50 transition-all duration-300 overflow-hidden",
          "border-border bg-background/98 backdrop-blur-md shadow-lg",
          mobileOpen
            ? "max-h-125 opacity-100 border-b"
            : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              {label}
            </Link>
          ))}

          <div className="border-t border-border mt-3 pt-3 flex flex-col gap-2">
            {session ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-accent/50">
                  <Avatar className="w-9 h-9 border border-border shrink-0">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {getInitials(session.user?.name, session.user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold truncate">
                      {session.user?.name ?? "User"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {session.user?.email}
                    </span>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  <User className="w-4 h-4 text-muted-foreground" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                >
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  Settings
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-center"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground text-center hover:opacity-90 transition-opacity"
                >
                  Get started free
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}