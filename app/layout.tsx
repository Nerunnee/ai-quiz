import type { Metadata } from "next";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { History } from "./_components/History";
import Link from "next/link";
import { BadgeQuestionMark } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Test your knowledge with short, focused quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased bg-gray-50 text-gray-900">
        <ClerkProvider>
          <Show when="signed-out">
            <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-50">
              <div className="flex flex-col items-center gap-6 w-full max-w-sm bg-white border border-gray-200 rounded-2xl px-10 py-14">
                <div className="flex h-12 w-12 items-center justify-center border border-gray-200 rounded-xl bg-gray-50 text-gray-500">
                  <BadgeQuestionMark />
                </div>

                <div className="text-center">
                  <h1 className="text-xl font-medium text-gray-900">
                    Quiz app
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Test your knowledge on any topic - just add your content and
                    get 5 questions instantly.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 w-full">
                  <SignUpButton mode="modal">
                    <button className="w-full h-10 rounded-lg bg-gray-900 text-white text-sm font-medium cursor-pointer hover:bg-gray-800 transition-colors">
                      Sign up
                    </button>
                  </SignUpButton>

                  <SignInButton mode="modal">
                    <button className="w-full h-10 rounded-lg bg-white border border-gray-200 text-gray-900 text-sm cursor-pointer hover:bg-gray-50 transition-colors">
                      Sign in
                    </button>
                  </SignInButton>
                </div>

                <p className="text-xs text-gray-400">
                  No credit card required · Free to start
                </p>
              </div>
            </div>
          </Show>

          <Show when="signed-in">
            <div className="min-h-screen bg-gray-50">
              <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
                <Link
                  href="/"
                  className="text-xl font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Quiz app
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </header>

              <SidebarProvider>
                <History />
                <SidebarTrigger className="absolute left-0 top-16 z-40" />
                <main className="min-h-[calc(100vh-57px)] w-full flex items-start justify-center">
                  {children}
                </main>
              </SidebarProvider>
            </div>
          </Show>
        </ClerkProvider>
      </body>
    </html>
  );
}
