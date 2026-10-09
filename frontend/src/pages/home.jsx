import { Link } from "react-router-dom";
import { CATEGORIES } from "../lib/civic";

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between px-6">

          <Link to="/" className="text-2xl font-bold">
            Civic<span className="text-primary">Report</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm font-medium hover:text-primary">
              Home
            </a>

            <a href="#report" className="text-sm font-medium hover:text-primary">
              Report Issue
            </a>

            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </a>

            <Link
              to="/auth"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Login
            </Link>
          </nav>

        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Public Infrastructure
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Report Issues.
              <br />
              Improve Your City.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Report potholes, damaged roads, garbage, drainage problems,
              street lights and water leakage in your area.
            </p>

            <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
              Upload a photo, share the location and track your complaint
              until the issue is resolved.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/report"
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Report an Issue
              </Link>

              <Link
                to="/auth"
                className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Hero Information Card */}
          <div className="surface p-8">
            <h2 className="text-xl font-bold">
              How CivicReport Helps
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex gap-4">
                <div className="text-2xl">📷</div>
                <div>
                  <h3 className="font-semibold">Upload Photo</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add a photo to clearly show the problem.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h3 className="font-semibold">Share Location</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add the exact location of the issue.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold">Track Complaint</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Follow your complaint from submission to resolution.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-2xl">🏆</div>
                <div>
                  <h3 className="font-semibold">Earn Civic Points</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Earn points by actively reporting public issues.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Report Categories */}
      <section id="report" className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Report Problems
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              What Can You Report?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Choose the type of public infrastructure problem you want
              to report.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="surface p-6 transition hover:-translate-y-1"
              >
                <div className="text-4xl">
                  {category.icon}
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  {category.id}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {category.hint}
                </p>

                <Link
                  to="/report"
                  className="mt-5 inline-block text-sm font-semibold text-primary"
                >
                  Report this issue →
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Simple Process
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              How It Works
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <div className="surface p-6">
              <span className="text-3xl font-bold text-primary">01</span>
              <h3 className="mt-4 font-bold">Register</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Create your CivicReport account.
              </p>
            </div>

            <div className="surface p-6">
              <span className="text-3xl font-bold text-primary">02</span>
              <h3 className="mt-4 font-bold">Report</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Add the issue, photo and location.
              </p>
            </div>

            <div className="surface p-6">
              <span className="text-3xl font-bold text-primary">03</span>
              <h3 className="mt-4 font-bold">Track</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Monitor the status of your complaint.
              </p>
            </div>

            <div className="surface p-6">
              <span className="text-3xl font-bold text-primary">04</span>
              <h3 className="mt-4 font-bold">Resolved</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Get notified when the issue is resolved.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why CivicReport */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Features
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Why Use CivicReport?
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">

            <div className="surface p-6 text-center">
              <div className="text-3xl">📍</div>
              <h3 className="mt-4 font-bold">Location Based</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Report the exact location of an issue.
              </p>
            </div>

            <div className="surface p-6 text-center">
              <div className="text-3xl">📷</div>
              <h3 className="mt-4 font-bold">Photo Evidence</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upload images to support your complaint.
              </p>
            </div>

            <div className="surface p-6 text-center">
              <div className="text-3xl">📊</div>
              <h3 className="mt-4 font-bold">Live Tracking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Track complaint progress easily.
              </p>
            </div>

            <div className="surface p-6 text-center">
              <div className="text-3xl">🏆</div>
              <h3 className="mt-4 font-bold">Rewards</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Earn points for responsible reporting.
              </p>
            </div>

            


          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">

          <h2 className="text-3xl font-bold md:text-4xl">
            See Something Broken?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Report it today and help make your community cleaner,
            safer and better.
          </p>

          <Link
            to="/report"
            className="mt-8 inline-block rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Report an Issue
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-center text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">

          <p>
            © 2026 CivicReport
          </p>

          <p>
            Citizen reporting for better public infrastructure.
          </p>

        </div>
      </footer>

    </div>
  );
}

export default Home;