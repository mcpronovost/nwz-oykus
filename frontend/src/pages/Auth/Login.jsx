import { useState } from "react";

import { api } from "@/services/api";
import { useRouter } from "@/services/router";
import { useTranslation } from "@/services/translation";
import { validateUsername, validatePassword } from "@/utils";
import {
  OykButton,
  OykForm,
  OykFormField,
  OykFormMessage,
  OykLink,
} from "@/components/common";

export default function Login() {
  const { n } = useRouter();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Fields validation
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);

    usernameError && (newErrors.username = usernameError);
    passwordError && (newErrors.password = passwordError);

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
      await api.login(formData);
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
          <h1 className="oyk-auth-header-title">Sign in to your account</h1>
          <p className="oyk-auth-header-subtitle">
            Or{" "}
            <OykLink routeName="register" className="oyk-auth-header-subtitle">
              create a new account
            </OykLink>
          </p>
        </div>

        <OykForm
          className="oyk-auth-form"
          onSubmit={handleSubmit}
          isLoading={isLoading}
        >
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
          {hasError?.message && <OykFormMessage hasError={hasError?.message} />}
          <div className="oyk-form-actions">
            <OykButton type="submit" color="primary" disabled={isLoading} block>
              {isLoading ? "Signing in..." : "Sign in"}
            </OykButton>
          </div>
        </OykForm>
      </div>
    </section>
  );
}
