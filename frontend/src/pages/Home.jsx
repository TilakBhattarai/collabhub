import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-white text-gray-900">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-28 pb-24">
        <div className="max-w-2xl">

          <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Build things with people who get your idea.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
            Find collaborators, discover projects, and connect with people
            who have the skills to help you build.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              to="/discover"
              className="px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 transition"
            >
              Find Collaborators
            </Link>

            <Link
              to="/projects"
              className="px-5 py-2.5 border border-violet-200 text-violet-700 text-sm font-medium rounded-md hover:bg-violet-50 transition"
            >
              Explore Projects
            </Link>
          </div>

        </div>
      </section>

      {/* What you can do */}
      <section className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-20">

          <div className="mb-12">
            <h2 className="text-xl font-medium">
              Everything you need to build together
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              From finding the right people to working together on real projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {[
              ["Find the right people", "Discover developers and creators based on their skills, interests, and goals."],
              ["Explore projects", "Find projects that match your skills and discover ideas you can contribute to."],
              ["Connect and collaborate", "Build your network and connect with people you would actually want to work with."],
              ["Create your own project", "Share your idea, define what you need, and find people who can help bring it to life."],
              ["Build your team", "Turn connections into real teams and work together toward a shared goal."],
              ["Manage your work", "Keep track of projects, tasks, and everything your team is building together."],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-gray-900">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-20">

          <div className="max-w-xl">
            <h2 className="text-2xl font-medium">
              Have an idea worth building?
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              Create your profile, find people with the right skills, and
              start building together.
            </p>

            <Link
              to="/register"
              className="inline-block mt-6 px-5 py-2.5 bg-violet-600 text-white text-sm font-medium rounded-md hover:bg-violet-700 transition"
            >
              Create an account
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;