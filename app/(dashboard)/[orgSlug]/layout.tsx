import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface OrgLayoutProps {
  children: React.ReactNode;
  params: Promise<{ orgSlug: string }>; // Add Promise wrapper
}

export default async function OrgLayout({ children, params }: OrgLayoutProps) {
  // Await the params
  const { orgSlug } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
  });

  if (!organization) {
    redirect("/select-org");
  }

  const membership = await prisma.organizationMember.findFirst({
    where: { organizationId: organization.id, user: { clerkUserId: userId } },
  });

  if (!membership) {
    redirect("/select-org");
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Organization Banner */}
        <Card className="relative overflow-hidden rounded-3xl border-0 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
          {/* Decorative glow */}
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

          <CardContent className="relative p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs uppercase tracking-widest text-slate-300">
                    Organization Workspace
                  </span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight">
                  {organization.name}
                </h1>

                <p className="mt-2 text-slate-300">
                  Collaborate, manage documents, and streamline workflows.
                </p>
              </div>

              <Badge
                className="
          border-white/20
          bg-white/10
          px-4
          py-2
          text-white
          backdrop-blur-sm
          hover:bg-white/20
        "
              >
                {membership.role}
              </Badge>
            </div>
          </CardContent>
        </Card>
        {/* Main Content */}
        <main className="py-8">
          <div className="container mx-auto px-4">{children}</div>
        </main>
      </div>
    </>
  );
}
