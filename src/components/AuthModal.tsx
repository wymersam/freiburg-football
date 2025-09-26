import React, { useState } from "react";
import { t } from "i18next";
import { useAuth } from "../contexts/AuthContext";
import "../styles/auth.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let success = false;

      if (isLogin) {
        success = await login(email, password);
        if (!success) {
          setError(t("invalidCredentials"));
        }
      } else {
        success = await register(name, email, password);
        if (!success) {
          setError(t("userAlreadyExists"));
        }
      }

      if (success) {
        onSuccess();
        onClose();
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setError(t("authError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{isLogin ? t("login") : t("register")}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">{t("name")}:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                minLength={2}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">{t("email")}:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("password")}:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={isLoading}>
              {isLoading ? t("loading") : isLogin ? t("login") : t("register")}
            </button>
          </div>

          <div className="auth-switch">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? t("needAccount") : t("haveAccount")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
