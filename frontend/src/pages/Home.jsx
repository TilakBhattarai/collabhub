import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Build together. Find the right people. Create something meaningful.
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Discover people, projects, and teams to bring your ideas to life.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/discover" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">Find Collaborators</Link>
          <Link to="/projects" className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50">Explore Projects</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Everything you need to collaborate</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Find Collaborators", "Discover people based on skills and interests."],
            ["Discover Projects", "Find projects where your skills can contribute."],
            ["Build Teams", "Connect with people and form effective teams."],
            ["Manage Work", "Organize tasks and track project progress."],
            ["Smart Matching", "AI-assisted team matching, coming soon."],
            ["Profiles", "Showcase your skills, experience, and projects."],
          ].map(([title, desc]) => (
            <div key={title} className="border rounded-lg p-6">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-2xl font-bold">Ready to build something together?</h2>
        <Link to="/register" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;