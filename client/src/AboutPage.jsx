import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GitBranch,
  CheckCircle2,
  Search,
  MousePointerClick,
  RotateCcw,
  GraduationCap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import heroImage from "./assets/hero.jpeg";

const features = [
  {
    icon: GitBranch,
    title: "Interactive Prerequisite Graph",
    description:
      "Visualize course dependencies as an interactive graph. See how courses connect and what you need to complete first.",
  },
  {
    icon: CheckCircle2,
    title: "Track Your Progress",
    description:
      "Enter your grades and watch the graph update in real-time. Clear prerequisites turn green, showing your path forward.",
  },
  {
    icon: Search,
    title: "Quick Course Search",
    description:
      "Find any course instantly with built-in search. Jump directly to any node in the graph.",
  },
  {
    icon: MousePointerClick,
    title: "Click for Details",
    description:
      "Click any course to see full details, prerequisites, and your eligibility status in the sidebar.",
  },
  {
    icon: Sparkles,
    title: "Add Elective Courses",
    description:
      "Customize your view by adding optional CS electives. Plan your specialization path.",
  },
  {
    icon: RotateCcw,
    title: "Reset Anytime",
    description:
      "Start fresh with one click. Your progress is saved locally and can be reset whenever needed.",
  },
];

const statusItems = [
  { color: "bg-emerald-500", label: "Clear", description: "Prerequisites met" },
  {
    color: "bg-rose-500",
    label: "Not Clear",
    description: "Prerequisites not met",
  },
  {
    color: "bg-zinc-500",
    label: "Incomplete",
    description: "No grade entered yet",
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat opacity-70"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-zinc-950" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-400">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span>University of Regina CS Program</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Plan Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                CS Journey
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              An interactive prerequisite visualizer for Computer Science
              courses. Track your progress, explore course dependencies, and
              plan your path to graduation.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="cursor-pointer gap-2 text-base"
                asChild
              >
                <Link to="/planner">
                  Open Course Planner
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to plan your courses
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Built for students, by students. No account required.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Status Legend Section */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Understand your progress at a glance
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                The graph uses a simple color system to show your eligibility
                for each course. Enter your grades and watch your path light up.
              </p>

              <div className="mt-8 space-y-4">
                {statusItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className={`h-4 w-4 rounded-full ${item.color}`} />
                    <div>
                      <span className="font-medium text-zinc-100">
                        {item.label}
                      </span>
                      <span className="ml-2 text-zinc-500">
                        — {item.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                <div className="flex h-full items-center justify-center p-8">
                  {/* Simplified graph preview */}
                  <svg viewBox="0 0 200 150" className="h-full w-full">
                    {/* Edges */}
                    <line
                      x1="100"
                      y1="30"
                      x2="60"
                      y2="75"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />
                    <line
                      x1="100"
                      y1="30"
                      x2="140"
                      y2="75"
                      stroke="#f43f5e"
                      strokeWidth="2"
                    />
                    <line
                      x1="60"
                      y1="75"
                      x2="60"
                      y2="120"
                      stroke="#22c55e"
                      strokeWidth="2"
                    />
                    <line
                      x1="140"
                      y1="75"
                      x2="140"
                      y2="120"
                      stroke="#3f3f46"
                      strokeWidth="2"
                    />

                    {/* Nodes */}
                    <rect
                      x="75"
                      y="15"
                      width="50"
                      height="30"
                      rx="6"
                      fill="#22c55e"
                    />
                    <text
                      x="100"
                      y="35"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                    >
                      CS 110
                    </text>

                    <rect
                      x="35"
                      y="60"
                      width="50"
                      height="30"
                      rx="6"
                      fill="#22c55e"
                    />
                    <text
                      x="60"
                      y="80"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                    >
                      CS 115
                    </text>

                    <rect
                      x="115"
                      y="60"
                      width="50"
                      height="30"
                      rx="6"
                      fill="#f43f5e"
                    />
                    <text
                      x="140"
                      y="80"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                    >
                      CS 201
                    </text>

                    <rect
                      x="35"
                      y="105"
                      width="50"
                      height="30"
                      rx="6"
                      fill="#22c55e"
                    />
                    <text
                      x="60"
                      y="125"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                    >
                      CS 210
                    </text>

                    <rect
                      x="115"
                      y="105"
                      width="50"
                      height="30"
                      rx="6"
                      fill="#71717a"
                    />
                    <text
                      x="140"
                      y="125"
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="600"
                    >
                      CS 310
                    </text>
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl bg-gradient-to-br from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="border-t border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Three simple steps to plan your degree
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Explore the Graph",
                description:
                  "Browse the interactive prerequisite graph to see how courses connect.",
              },
              {
                step: "02",
                title: "Enter Your Grades",
                description:
                  "Click on courses you've completed and enter your grades.",
              },
              {
                step: "03",
                title: "Plan Your Path",
                description:
                  "See which courses you're eligible for and plan your next semester.",
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-bold text-zinc-800">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-zinc-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to plan your courses?
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Start visualizing your path to graduation today.
          </p>
          <Button size="lg" className="mt-8 cursor-pointer gap-2 text-base">
            <Link to="/planner">Get Started</Link>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-500">
              Built with ❤️ for UofR CS students
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
