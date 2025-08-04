import { useState } from "react";

import { useRouter } from "@/services/router";
import { api } from "@/services/api";
import { OykButton, Link } from "@/components/common";

export default function Login() {
  const { n } = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear general error when user makes changes
    if (generalError) {
      setGeneralError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setGeneralError("");

    try {
      await api.login(formData);
      n("home"); // Redirect to home page after successful login
    } catch (e) {
      console.log(e.error);
      setGeneralError(e.error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="oyk-page oyk-auth">
      <div className="oyk-auth-container">
        <div className="oyk-auth-header">
          <h1 className="oyk-auth-header-title">Sign in to your account</h1>
          <p className="oyk-auth-header-subtitle">
            Or{" "}
            <Link
              routeName="register"
              className="oyk-auth-header-subtitle"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="oyk-auth-form" onSubmit={handleSubmit}>
          {generalError && (
            <div className="oyk-auth-error">
              <div className="oyk-auth-error-message">{generalError}</div>
            </div>
          )}

          <div className="oyk-auth-field">
            <label htmlFor="username" className="oyk-auth-field-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={formData.username}
              onChange={handleChange}
              className={`oyk-auth-field-input ${
                errors.username ? "oyk-auth-field-input--error" : ""
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="oyk-auth-field-error">{errors.username}</p>
            )}
          </div>

          <div className="oyk-auth-field">
            <label htmlFor="password" className="oyk-auth-field-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className={`oyk-auth-field-input ${
                errors.password ? "oyk-auth-field-input--error" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="oyk-auth-field-error">{errors.password}</p>
            )}
          </div>

          <OykButton
            type="submit"
            color="primary"
            disabled={isLoading}
            block
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </OykButton>
        </form>
      </div>
    </section>
  );
}
