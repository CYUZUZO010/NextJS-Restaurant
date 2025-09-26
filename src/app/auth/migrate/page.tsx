"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Keys used previously by the demo AuthContext
const USERS_KEY = "demo_users";

type DemoUser = {
  name: string;
  email: string;
  role: "admin" | "client" | "waiter";
  password: string;
};

export default function MigrateUsersPage() {
  const [demoUsers, setDemoUsers] = useState<DemoUser[]>([]);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(USERS_KEY) : null;
      const parsed = raw ? (JSON.parse(raw) as DemoUser[]) : [];
      setDemoUsers(parsed);
    } catch (e) {
      console.error(e);
      toast.error("Failed to read demo users from localStorage");
    }
  }, []);

  const doImport = async () => {
    if (!demoUsers.length) {
      toast.info("No demo users to import");
      return;
    }
    setImporting(true);
    let imported = 0;
    let skipped = 0;
    try {
      for (const u of demoUsers) {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: u.name, email: u.email, password: u.password, role: u.role }),
        });
        if (res.ok) {
          imported++;
        } else {
          const data = await res.json().catch(() => ({} as any));
          // Treat duplicate email or any error as skipped
          skipped++;
          console.warn("Skip user", u.email, data?.error);
        }
      }
      toast.success(`Import done: ${imported} imported, ${skipped} skipped`);
    } catch (e) {
      console.error(e);
      toast.error("Import failed");
    } finally {
      setImporting(false);
    }
  };

  const clearDemo = () => {
    try {
      localStorage.removeItem(USERS_KEY);
      setDemoUsers([]);
      toast.success("Cleared demo users from localStorage");
    } catch (e) {
      console.error(e);
      toast.error("Failed to clear demo users");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card text-card-foreground border border-border">
            <CardHeader>
              <CardTitle>Import Demo Users</CardTitle>
              <CardDescription>
                Import users previously stored in localStorage into the database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Found {demoUsers.length} demo user{demoUsers.length === 1 ? "" : "s"} in localStorage.
              </p>
              <div className="flex gap-2">
                <Button onClick={doImport} disabled={importing || demoUsers.length === 0}>
                  {importing ? "Importing..." : "Import to DB"}
                </Button>
                <Button variant="outline" onClick={clearDemo} disabled={importing || demoUsers.length === 0}>
                  Clear Demo Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
