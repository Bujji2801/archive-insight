import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const AUTH_KEY = "archive_insight_fake_auth";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (regNoOrEmail: string, _password: string) => boolean;
  signup: (payload: { regNo?: string; email?: string; password: string }) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(AUTH_KEY) === "true";
  });

  const login = useCallback((regNoOrEmail: string, _password: string) => {
    if (!regNoOrEmail?.trim()) return false;
    localStorage.setItem(AUTH_KEY, "true");
    setAuthenticated(true);
    return true;
  }, []);

  const signup = useCallback(
    (payload: { regNo?: string; email?: string; password: string }) => {
      const hasId = !!(payload.regNo?.trim() || payload.email?.trim());
      if (!hasId || !payload.password?.trim()) return false;
      localStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ isAuthenticated, login, signup, logout }),
    [isAuthenticated, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
