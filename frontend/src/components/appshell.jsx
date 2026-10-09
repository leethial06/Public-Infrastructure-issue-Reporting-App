import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../lib/useStore";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/report", label: "Report issue" },
  { to: "/complaints", label: "My complaints" },
  { to: "/profile", label: "Profile" },
  { to: "/notifications", label: "Notifications" },
];

export function AppShell({ children }) {
  const { user, logout } = useStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4">
          
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-tight"
          >
            Civic<span className="text-primary">Report</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            
            {user ? (
              <>
                <span className="hidden text-sm text-muted-foreground sm:inline">
                  {user.name}
                </span>

                <button
                  onClick={() => {
                    logout();
                    navigate("/auth");
                  }}
                  className="rounded-md border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Log out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                Sign in
              </Link>
            )}

          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 text-sm ${
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        CivicReport — citizen reporting for public infrastructure.
      </footer>

    </div>
  );
}