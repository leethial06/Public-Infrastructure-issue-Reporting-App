import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../lib/useSFtore";

const field =
  "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/25";

function AuthPage() {
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useStore();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // ---------------- LOGIN ----------------
      if (mode === "login") {
        if (!email || !password) {
          setError("Please enter email and password.");
          setLoading(false);
          return;
        }

        // Remove old/expired JWT before attempting a new login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        const response = await fetch(
          "http://127.0.0.1:8000/api/login/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: email.trim().toLowerCase(),
              password: password,
            }),
          }
        );

        const data = await response.json();

        console.log("Login status:", response.status);
        console.log("Login response:", data);

        if (!response.ok) {
          setError(
            data.message ||
            data.detail ||
            "Invalid email or password."
          );
          setLoading(false);
          return;
        }

        // Check whether backend actually returned JWT tokens
        if (
          !data.tokens ||
          !data.tokens.access ||
          !data.tokens.refresh
        ) {
          setError("Login successful, but JWT token was not received.");
          setLoading(false);
          return;
        }

        // Save fresh JWT tokens
        localStorage.setItem(
          "access_token",
          data.tokens.access
        );

        localStorage.setItem(
          "refresh_token",
          data.tokens.refresh
        );

        // Save user details
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // Update existing store
        login({
          name:
            data.user.first_name ||
            data.user.username ||
            email.split("@")[0],

          email: data.user.email,
        });

        navigate("/dashboard");
      }

      // ---------------- REGISTER ----------------
      else {
        if (!name || !email || !password) {
          setError("Please fill all required fields.");
          setLoading(false);
          return;
        }

        if (!email.includes("@")) {
          setError("Please enter a valid email.");
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }

        if (phone.length !== 10) {
          setError(
            "Please enter a valid 10-digit phone number."
          );
          setLoading(false);
          return;
        }

        if (!city) {
          setError("Please enter your city.");
          setLoading(false);
          return;
        }

        // Split full name
        const nameParts = name.trim().split(" ");

        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");

        // Use email as username
        const username = email.trim().toLowerCase();

        const response = await fetch(
          "http://127.0.0.1:8000/api/register/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email.trim().toLowerCase(),
              password: password,
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              city: city,
            }),
          }
        );

        const data = await response.json();

        console.log("Register status:", response.status);
        console.log("Register response:", data);

        if (!response.ok) {
          if (data.username) {
            setError(
              "This email/username is already registered."
            );
          } else if (data.email) {
            setError(
              "This email is already registered."
            );
          } else {
            setError(
              data.message ||
              data.detail ||
              "Registration failed. Please try again."
            );
          }

          setLoading(false);
          return;
        }

        setSuccess(
          "Registration successful! Please login."
        );

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setCity("");

        // Switch to login
        setMode("login");
      }
    } catch (err) {
      console.error("Auth error:", err);

      setError(
        "Cannot connect to the backend server. Make sure Django server is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="grid-bg flex min-h-screen items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        <Link
          to="/"
          className="font-display text-lg font-bold"
        >
          Civic<span className="text-primary">Report</span>
        </Link>

        <div className="surface mt-4 p-6">

          {/* Login / Register buttons */}
          <div className="flex rounded-lg bg-secondary p-1">

            {["login", "register"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMode(item);
                  setError("");
                  setSuccess("");
                }}
                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                  mode === item
                    ? "bg-card shadow-card"
                    : "text-muted-foreground"
                }`}
              >
                {item === "login"
                  ? "Log in"
                  : "Register"}
              </button>
            ))}

          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="mt-6 space-y-4"
          >

            {/* Name - Register */}
            {mode === "register" && (
              <label className="block text-sm font-medium">
                Full name

                <input
                  className={field}
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Asha Kumar"
                />
              </label>
            )}

            {/* Phone - Register */}
            {mode === "register" && (
              <label className="block text-sm font-medium">
                Phone number

                <input
                  type="tel"
                  className={field}
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="9876543210"
                  maxLength="10"
                />
              </label>
            )}

            {/* City - Register */}
            {mode === "register" && (
              <label className="block text-sm font-medium">
                City

                <input
                  type="text"
                  className={field}
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  placeholder="Trichy"
                />
              </label>
            )}

            {/* Email */}
            <label className="block text-sm font-medium">
              Email

              <input
                type="email"
                className={field}
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
              />
            </label>

            {/* Password */}
            <label className="block text-sm font-medium">
              Password

              <input
                type="password"
                className={field}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
              />
            </label>

            {/* Error */}
            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <p className="text-sm text-green-600">
                {success}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Log in"
                : "Create account"}
            </button>

          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            Your account is securely connected to the CivicReport backend.
          </p>

        </div>
      </div>
    </div>
  );
}

export default AuthPage;