function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-24 pb-20">

      <h1 className="text-3xl font-semibold text-gray-900">
        About CollabHub
      </h1>

      <p className="mt-5 text-gray-600 leading-7">
        Most side projects don't fail because the idea was bad. They fail because
        the person who had the idea couldn't find anyone to build it with — or
        found someone, but the skills didn't line up, or the project fizzled out
        before a team ever really formed.
      </p>

      <p className="mt-4 text-gray-600 leading-7">
        CollabHub exists to fix that specific problem. It's a place to post what
        you're building, say what kind of help you need, and find people who
        actually have the skills and the time to work on it with you — instead of
        posting in a Discord server and hoping someone replies.
      </p>

      <h2 className="mt-10 text-lg font-semibold text-gray-900">
        How it works
      </h2>

      <div className="mt-5 space-y-5">
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900">
            1. Build a profile
          </h3>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            List your skills, your availability, and what kind of projects
            you're looking for, so the right people can find you.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900">
            2. Post or discover a project
          </h3>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            Share an idea with the skills it needs, or browse projects other
            people are already building.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-900">
            3. Connect and start building
          </h3>
          <p className="mt-1 text-sm text-gray-600 leading-6">
            Send a connection request, agree on what you're each contributing,
            and get to work.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-gray-900">
        Why it's still growing
      </h2>

      <p className="mt-4 text-gray-600 leading-7">
        CollabHub is a project I'm actively building and using myself — it's not
        a finished product with a big team behind it. Some things are rough
        around the edges, and new features are still being added. If something
        doesn't work the way you'd expect, that's more likely a work-in-progress
        gap than an intentional decision.
      </p>

    </div>
  );
}

export default About;