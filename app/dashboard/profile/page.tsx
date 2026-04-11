"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, User, Calendar } from "lucide-react";

function getInitials(name?: string | null, email?: string | null): string {
  if (name) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto flex flex-col gap-5"
    >
      <div>
        <h2 className="font-heading font-bold text-xl mb-1">Profile</h2>
        <p className="text-sm text-muted-foreground">
          Your account information.
        </p>
      </div>

      {/* Avatar + name */}
      <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-5">
        <Avatar className="w-16 h-16 border-2 border-border">
          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
            {getInitials(user?.name, user?.email)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-heading font-bold text-lg">
            {user?.name ?? "User"}
          </h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Details */}
      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
        <h3 className="font-heading font-semibold text-sm">Account details</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
            <User className="w-4 h-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Full name</p>
              <p className="text-sm font-medium">{user?.name ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
            <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user?.email ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50">
            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Member since</p>
              <p className="text-sm font-medium">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}