"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserButton,
  useUser,
  useOrganization,
  SignInButton,
  SignOutButton,
  Show,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  FileText,
  Users,
  Brain,
  LogIn,
  UserPlus,
  Building,
  LucideLogOut,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const { organization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);

  // Get dynamic navigation based on whether user is in an organization
  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    ];

    // If user is in an organization
    if (organization) {
      return [
        ...baseItems,
        {
          href: `/${organization.slug}`,
          label: "Organization Dashboard",
          icon: <Building className="h-4 w-4" />,
        },
        {
          href: `/${organization.slug}/documents`,
          label: "Org Documents",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          href: "/select-org",
          label: "Switch Organization",
          icon: <Users className="h-4 w-4" />,
        },
      ];
    }
    // If user is new
    return [
      ...baseItems,
      {
        href: "/select-org",
        label: "Switch Organization",
        icon: <Users className="h-4 w-4" />,
      },
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="h-6 w-6 text-blue-600" />
            DocLense
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="lg"
                    className="gap-2 rounded-md text-[1rem] px-2 py-1 "
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {/* <SignInButton> */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {organization
                  ? `In: ${organization.name}`
                  : user?.firstName || user?.username}
              </span>
              {/* <UserButton /> */}
            </div>
            {/* </SignInButton> */}

            {/* Clerk Auth Controls */}
            <div className="hidden md:flex items-center gap-4 ml-4 pl-4 border-l border-gray-300 ">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="px-2 py-1 text-[14px] text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-2 py-1 text-[14px] bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-1">
                  <UserButton />
                  {user?.firstName && (
                    <Link href={"/subscriptions"} className="nav-user-name">
                      {user.firstName}
                    </Link>
                  )}
                </div>
              </Show>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button>
                    <Menu className="h-6 w-6 cursor-pointer" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-75 sm:w-100">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-2">
                    {/* Mobile Navigation */}
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={
                            pathname === item.href ? "secondary" : "ghost"
                          }
                          className="w-full justify-start gap-2"
                        >
                          {item.icon}
                          {item.label}
                        </Button>
                      </Link>
                    ))}

                    {/* Mobile Auth */}
                    <div className="border-t pt-4 mt-4">
                      {/* <SignInButton> */}
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-1 px-2 text-sm text-gray-600 mb-2">
                          {organization
                            ? `In: ${organization.name}`
                            : `Signed in as ${user?.firstName || user?.username}`}
                          <Show when="signed-in">
                            <div className="-mt-1">
                              <UserButton />
                            </div>
                          </Show>
                        </div>
                      </div>
                      {/* </SignInButton> */}

                      {/* <SignOutButton> */}
                      <div className="flex flex-col gap-2">
                        <Show when="signed-in">
                          <SignOutButton>
                            <button className="w-full px-2 py-1 text-[14px] bg-gray-900 text-gray-50 border border-gray-600 rounded hover:bg-gray-950 transition-colors flex items-center justify-center gap-1">
                              <LucideLogOut className="h-4 w-4" />
                              <span>Sign Out</span>
                            </button>
                          </SignOutButton>
                        </Show>

                        <Show when="signed-out">
                          <Link
                            href="/sign-in"
                            onClick={() => setIsOpen(false)}
                          >
                            <SignInButton mode="modal">
                              <button className="w-full px-2 py-1 text-[14px] text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center justify-center gap-1">
                                <LogIn className="h-4 w-4" />
                                <span>Sign In</span>
                              </button>
                            </SignInButton>
                          </Link>

                          <Link
                            href="/sign-up"
                            onClick={() => setIsOpen(false)}
                          >
                            <SignUpButton mode="modal">
                              <button className="w-full px-2 py-1 text-[14px] bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                                <UserPlus className="h-4 w-4" />
                                <span>Sign Up</span>
                              </button>
                            </SignUpButton>
                          </Link>
                        </Show>
                      </div>
                      {/* </SignOutButton> */}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
