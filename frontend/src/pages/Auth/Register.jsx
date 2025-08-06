import { useState } from "react";

import { api } from "@/services/api";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import { validateUsername, validatePassword, validateEmail, validatePlayername } from "@/utils";
import { OykButton, OykCard, OykForm, OykFormField, OykFormMessage, OykLink } from "@/components/common";

export default function Register() {
  const { n } = useRouter();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    playername: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Fields validation
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const emailError = validateEmail(formData.email);
    const playernameError = validatePlayername(formData.playername);

    usernameError && (newErrors.username = usernameError);
    passwordError && (newErrors.password = passwordError);
    emailError && (newErrors.email = emailError);
    playernameError && (newErrors.playername = playernameError);

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setHasError({ fields: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user starts typing
    if (hasError?.fields?.[name]) {
      setHasError((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [name]: "",
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    setHasError(null);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    try {
      const { confirmPassword, ...registrationData } = formData;
      await api.register(registrationData);
      n("home");
    } catch (e) {
      setHasError(e.error || t("An error occurred"));
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
            <OykLink routeName="login" className="oyk-auth-header-subtitle">
              sign in to an existing account
            </OykLink>
          </p>
        </div>
        <OykCard>
          <OykForm className="oyk-auth-form" onSubmit={handleSubmit} isLoading={isLoading}>
            <OykFormField
              label={t("Username")}
              name="username"
              defaultValue={formData.username}
              onChange={handleChange}
              hasError={hasError?.fields?.username}
              required
              block
            />
            <OykFormField
              label={t("Password")}
              name="password"
              type="password"
              defaultValue={formData.password}
              onChange={handleChange}
              hasError={hasError?.fields?.password}
              required
              block
            />
            <OykFormField
              label={t("Confirm Password")}
              name="confirmPassword"
              type="password"
              defaultValue={formData.confirmPassword}
              onChange={handleChange}
              hasError={hasError?.fields?.confirmPassword}
              required
              block
            />
            <OykFormField
              label={t("Email")}
              name="email"
              type="email"
              defaultValue={formData.email}
              onChange={handleChange}
              hasError={hasError?.fields?.email}
              required
              block
            />
            <OykFormField
              label={t("Playername")}
              name="playername"
              defaultValue={formData.playername}
              onChange={handleChange}
              hasError={hasError?.fields?.playername}
              required
              block
            />
            {hasError?.message && <OykFormMessage hasError={hasError?.message} />}
            <div className="oyk-form-actions">
              <OykButton type="submit" color="primary" disabled={isLoading} block>
                {isLoading ? "Creating account..." : "Create account"}
              </OykButton>
            </div>
          </OykForm>
        </OykCard>
      </div>
    </section>
  );
}
