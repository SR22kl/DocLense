import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Brain, FileText, Upload } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface OrgDashboardPageProps {
  params: Promise<{ orgSlug: string }>; // Add Promise wrapper
}

const OrgDashboardPage = async ({ params }: OrgDashboardPageProps) => {
  const { orgSlug } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Get organization with stats
  const organization = await prisma.organization.findUnique({
    where: { slug: orgSlug },
    include: {
      _count: {
        select: {
          documents: true,
          members: true,
        },
      },
      documents: {
        take: 5,
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!organization) {
    redirect("/select-org");
  }

  // Check membership
  const membership = await prisma.organizationMember.findFirst({
    where: {
      organizationId: organization.id,
      user: { clerkUserId: userId },
    },
  });

  if (!membership) {
    redirect("/select-org");
  }

  const analyzedDocs = await prisma.document.count({
    where: {
      organizationId: organization.id,
      aiSummary: { not: null },
    },
  });

  return (
    <>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-blue-50 via-white to-indigo-50 p-10 shadow-xl">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative">
            <span className="rounded-full border bg-white px-4 py-1 text-sm">
              🚀 Workspace Dashboard
            </span>

            <h1 className="mt-4 text-5xl font-bold tracking-tight">
              {organization.name}
            </h1>

            <p className="mt-3 text-lg text-muted-foreground">
              Manage documents, team members and AI-powered insights.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg">Total Documents</CardTitle>
              <CardDescription>In this organization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {organization._count.documents}
              </div>
              <Link href={`/${orgSlug}/documents`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 group rounded"
                >
                  View Documents
                  <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition duration-300 ease-in-out" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg">Team Members</CardTitle>
              <CardDescription>Organization members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {organization._count.members}
              </div>
              <Button variant="ghost" size="sm" className="mt-2 group rounded">
                View Team
                <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition duration-300 ease-in-out" />
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg">Analyzed</CardTitle>
              <CardDescription>Documents with AI insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analyzedDocs}</div>
              <p className="text-sm text-gray-500 mt-1">
                {(
                  (analyzedDocs / organization._count.documents) * 100 || 0
                ).toFixed(0)}
                % analyzed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Documents */}
        <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur shadow-xl">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>
              Latest uploads in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            {organization.documents.length === 0 ? (
              <div className="text-center py-20">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50">
                  <FileText className="h-12 w-12 text-blue-500" />
                </div>

                <h3 className="text-xl font-semibold">No documents yet</h3>

                <p className="mt-2 text-muted-foreground">
                  Upload your first document and start generating AI insights.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {organization.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-200" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          Uploaded{" "}
                          {new Date(doc.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {doc.aiSummary ? (
                      <Brain className="h-5 w-5 text-green-500" />
                    ) : (
                      <Button variant="outline" size="sm">
                        Analyze
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OrgDashboardPage;
