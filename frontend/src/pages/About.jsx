import { Link } from "react-router-dom";
import {
  UserCircle,
  FolderKanban,
  Handshake,
  Users,
  ListChecks,
  ShieldCheck,
  Bell,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Build a profile",
    text: "List your skills, availability and the kind of projects you want, so the right people can find you.",
  },
  {
    icon: FolderKanban,
    title: "Post or discover a project",
    text: "Share an idea with the skills it needs, or browse projects other people are already building.",
  },
  {
    icon: Handshake,
    title: "Connect and start building",
    text: "Send a request, agree on who contributes what, and move into a shared workspace.",
  },
];

const features = [
  {
    icon: Search,
    title: "Developer discovery",
    text: "Search and filter people by skills and availability.",
  },
  {
    icon: Users,
    title: "Teams and workspaces",
    text: "Every project has a shared workspace with its own Team tab.",
  },
  {
    icon: ListChecks,
    title: "Kanban task board",
    text: "Assign tasks and track To Do, In Progress and Completed.",
  },
  {
    icon: ShieldCheck,
    title: "Clear permissions",
    text: "Only the assignee can change a task's status, enforced on the server.",
  },
  {
    icon: Bell,
    title: "Notifications",
    text: "Know when you're assigned a task or a request gets accepted.",
  },
  {
    icon: FolderKanban,
    title: "Public and private projects",
    text: "Choose who can see your project and who can ask to join.",
  },
];

function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-violet-50 to-white">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-28 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-medium text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            About CollabHub
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Find the people to{" "}
            <span className="text-violet-600">build it with</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Most side projects don't fail because the idea was bad. They fail
            because nobody joined, the skills didn't line up, or the team never
            really formed. CollabHub fixes that one problem.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
            >
              Browse projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-gray-900">
          The problem we're solving
        </h2>
        <p className="mt-4 leading-7 text-gray-600">
          Posting "looking for teammates" in a Discord server and hoping someone
          replies doesn't work. CollabHub is a place to post what you're
          building, say what help you need, and find people who actually have
          the skills and the time to work on it with you.
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              How it works
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              From idea to a working team in three steps.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-300">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            What's inside
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Everything a small team needs to get started.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-gray-200 p-5 transition hover:border-violet-200 hover:shadow-sm"
            >
              <feature.icon className="h-5 w-5 text-violet-600" />
              <h3 className="mt-3 text-sm font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Status */}
      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              MVP
            </span>
            <h2 className="text-base font-semibold text-gray-900">
              Honest status
            </h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            CollabHub is a project I built and keep improving myself. The core
            features are in place, but it's not a finished product with a big
            team behind it. Some parts are still rough, and I'm actively testing
            and polishing. If something doesn't work the way you'd expect, it's
            probably a work-in-progress gap, not a deliberate choice.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl rounded-2xl bg-violet-600 px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold text-white">
            Have an idea? Find your team.
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-violet-100">
            Post your project, say what skills you need, and let the right
            people come to you.
          </p>
          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
          >
            Explore projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;