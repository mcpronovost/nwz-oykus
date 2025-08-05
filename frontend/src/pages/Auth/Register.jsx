import { useState } from "react";

import { useRouter } from "@/services/router";
import { api } from "@/services/api";
import { OykButton, Link } from "@/components/common";

export default function Register() {
  const { n } = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    playername: "",
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

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 3-20 characters, alphanumeric and underscores only";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Player name validation
    if (!formData.playername.trim()) {
      newErrors.playername = "Player name is required";
    } else if (!/^[a-zA-Z0-9\s\-']{2,50}$/.test(formData.playername)) {
      newErrors.playername =
        "Player name must be 2-50 characters, letters, numbers, spaces, hyphens, apostrophes only";
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
      const { confirmPassword, ...registrationData } = formData;
      await api.register(registrationData);
      n("home");
    } catch (e) {
      setGeneralError(
        e.error.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="oyk-page oyk-auth">
      <div className="oyk-auth-container">
        <div className="oyk-auth-header">
          <h1 className="oyk-auth-header-title">Create an account</h1>
          <p className="oyk-auth-header-subtitle">
            Or{" "}
            <Link
              routeName="login"
              className="oyk-auth-header-subtitle"
            >
              sign in to an existing account
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
            <label htmlFor="email" className="oyk-auth-field-label">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={`oyk-auth-field-input ${
                errors.email ? "oyk-auth-field-input--error" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="oyk-auth-field-error">{errors.email}</p>
            )}
          </div>

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
            <label htmlFor="playername" className="oyk-auth-field-label">
              Player Name
            </label>
            <input
              id="playername"
              name="playername"
              type="text"
              autoComplete="name"
              required
              value={formData.playername}
              onChange={handleChange}
              className={`oyk-auth-field-input ${
                errors.playername ? "oyk-auth-field-input--error" : ""
              }`}
              placeholder="Enter your player name"
            />
            {errors.playername && (
              <p className="oyk-auth-field-error">{errors.playername}</p>
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
              autoComplete="new-password"
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

          <div className="oyk-auth-field">
            <label htmlFor="confirmPassword" className="oyk-auth-field-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`oyk-auth-field-input ${
                errors.confirmPassword ? "oyk-auth-field-input--error" : ""
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="oyk-auth-field-error">{errors.confirmPassword}</p>
            )}
          </div>

          <OykButton
            type="submit"
            color="primary"
            disabled={isLoading}
            block
          >
            {isLoading ? "Creating account..." : "Create account"}
          </OykButton>
        </form>
      </div>
    </section>
  );
}
