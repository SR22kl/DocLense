"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useOrganizationList, useUser } from "@clerk/nextjs";
import { ArrowRight, Building, Loader2, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SelectOrg = () => {
  const { user } = useUser();
  const { isLoaded, userMemberships, setActive, createOrganization } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Function to manually refresh organization list
  const refreshOrganizations = async () => {
    setIsRefreshing(true);
    try {
      if (userMemberships?.revalidate) {
        await userMemberships.revalidate();
      }
      toast.success("Organization list refreshed");
    } catch (error) {
      console.error("Failed to refresh organizations:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleCreateOrg = async () => {
    if (!orgName.trim()) {
      toast.error("Please enter an organization name");
      return;
    }

    setIsCreating(true);
    try {
      // 1. Create organization in Clerk
      if (!createOrganization) {
        throw new Error("Organization creation is not available at this time.");
      }
      const newOrg = await createOrganization({
        name: orgName.trim(),
      });

      if (!newOrg) {
        throw new Error("Failed to create organization");
      }

      toast.success(`Organization "${orgName}" created successfully`);
      setOrgName("");

      // 2. Save to your database (optional)
      try {
        const response = await fetch("/api/organizations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkOrgId: newOrg.id,
            name: orgName.trim(),
            slug:
              //replaces all sequences of whitespace characters (matched by the regular expression /\s+/g) with a single hyphen (-)
              newOrg.slug || orgName.trim().toLowerCase().replace(/\s+/g, "-"),
          }),
        });

        if (!response.ok) {
          console.warn(
            "Database sync had issues, but organization was created in Clerk",
          );
        }
      } catch (dbError) {
        console.warn("Database sync failed:", dbError);
      }

      // 3. Set as active organization
      if (setActive) {
        await setActive({
          organization: newOrg.id,
        });
      }

      // 4. IMPORTANT: Force refresh of organization list
      // Wait a moment for Clerk to propagate changes
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Refresh the organization list
      refreshOrganizations();

      router.refresh(); // Refresh server components
    } catch (error: any) {
      console.error("Failed to create organization:", error);
      toast.error(error.message || "Failed to create organization");
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelectOrg = async (organization: any) => {
    try {
      if (setActive) {
        await setActive({
          organization: organization.id,
        });
      }
      router.push(`/${organization.slug}`);
    } catch (error) {
      console.error("Failed to switch organization:", error);
      toast.error("Failed to switch organization");
    }
  };

  return (
    <>
      <div className="container max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-blue-50 via-white to-indigo-50 p-10 mb-8 shadow-xl"
        >
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-1.5 text-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Workspace Management
            </div>

            <h1 className="mt-5 text-5xl font-bold tracking-tight">
              Welcome back,
              <span className="text-blue-600"> {user?.firstName}</span>
            </h1>

            <p className="mt-3 text-lg text-muted-foreground max-w-xl">
              Create a workspace, collaborate with your team and manage
              documents from one place.
            </p>
          </div>
        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="rounded-2xl hover:shadow-xl transition-all duration-300 ease-in-out">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">
                  {userMemberships?.count || 0}
                </div>
                <p className="text-sm text-muted-foreground">Organizations</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:shadow-xl transition-all duration-300 ease-in-out">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">{user?.firstName}</div>
                <p className="text-sm text-muted-foreground">Active User</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl hover:shadow-xl transition-all duration-300 ease-in-out">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold">
                  {userMemberships?.count ? "Ready" : "New"}
                </div>
                <p className="text-sm text-muted-foreground">
                  Workspace Status
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Create Organization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 rounded-2xl border-0 shadow-xl bg-white/70 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Organization
                  </CardTitle>
                  <CardDescription>
                    Start a new workspace for your team
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter organization name"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    disabled={isCreating}
                    className=" h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500"
                    onKeyDown={(e) => e.key === "Enter" && handleCreateOrg()}
                  />
                  <Button
                    onClick={handleCreateOrg}
                    disabled={isCreating || !orgName.trim()}
                    className="h-12 rounded-xl px-6 bg-blue-600 hover:bg-blue-800 shadow-lg shadow-blue-500/20 cursor-pointer"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Organization List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-3xl border-0 bg-white/80 backdrop-blur shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <div>Your Organizations</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    {userMemberships?.count || 0} workspaces
                  </div>
                </div>
              </CardTitle>

              <CardDescription>
                {userMemberships?.count === 0
                  ? "Create your first organization above"
                  : "Select a workspace to continue"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {userMemberships?.count === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50">
                    <Building className="h-12 w-12 text-blue-500" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    No organizations yet
                  </h3>

                  <p className="mt-2 text-muted-foreground">
                    Create your first workspace and start collaborating.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {userMemberships?.data?.map((membership) => (
                    <motion.div
                      key={membership.organization.id}
                      variants={cardVariants}
                      whileTap={{
                        scale: 0.99,
                      }}
                      className="group relative overflow-hidden rounded-2xl border bg-white p-5 cursor-pointer transition-all duration-300 hover:border-blue-300  hover:shadow-xl hover:shadow-blue-500/10"
                      onClick={() => handleSelectOrg(membership.organization)}
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5" />

                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center shadow-lg shadow-blue-500/20 h-14 w-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600">
                            <Building className="h-7 w-7 text-white" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-lg">
                              {membership.organization.name}
                            </h3>

                            <div className="mt-2 flex items-center gap-2 text-sm">
                              <span className="rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-medium capitalize">
                                {membership.role}
                              </span>

                              {membership.organization.slug && (
                                <>
                                  <span className="text-gray-300">•</span>

                                  <span className="font-medium text-blue-600">
                                    @{membership.organization.slug}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <ArrowRight className="h-5 w-5 text-gray-400 transition-all duration-300 group-hover:translate-x-2 group-hover:text-blue-600" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SelectOrg;
