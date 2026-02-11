import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Mail, Hash, ArrowRight, PenTool } from "lucide-react";
import { HeizenButton } from "@/components/ui/heizen-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const spring = { type: "spring", stiffness: 400, damping: 30 };

interface AuthFormProps {
  initialMode?: "login" | "signup";
}

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [regNoOrEmail, setRegNoOrEmail] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    // Simulate network delay for effect
    await new Promise(r => setTimeout(r, 800));

    const ok = login(regNoOrEmail.trim(), password);
    setIsLoading(false);

    if (ok) navigate("/explore", { replace: true });
    else setError("Invalid credentials.");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const ok = signup({
      regNo: regNo.trim() || undefined,
      email: email.trim() || undefined,
      password,
    });
    setIsLoading(false);

    if (ok) navigate("/explore", { replace: true });
    else setError("Please provide valid details.");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-slate-50/50 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[400px]"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden ring-1 ring-slate-900/5">
          <div className="p-8 sm:p-10">
            <div className="mb-8 flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 shadow-lg shadow-slate-900/20 mb-5 relative group transition-transform hover:scale-105 duration-300">
                <PenTool className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-editorial font-bold text-slate-900 tracking-tight text-center">
                {mode === 'login' ? 'Welcome Back' : 'Join Parallax'}
              </h2>
              <p className="text-sm text-slate-500 mt-2 text-center max-w-[240px]">
                {mode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Create your academic profile to start scanning.'}
              </p>
            </div>

            <div className="mb-6 flex rounded-lg bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={cn(
                  "flex-1 rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                  mode === "login"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={cn(
                  "flex-1 rounded-md py-2 text-xs font-semibold uppercase tracking-wider transition-all",
                  mode === "signup"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                Sign up
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="login-id" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Identity
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="login-id"
                        type="text"
                        placeholder="Reg No. or Email"
                        value={regNoOrEmail}
                        onChange={(e) => setRegNoOrEmail(e.target.value)}
                        className="h-11 pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="login-password" className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium text-red-500 bg-red-50 p-2 rounded border border-red-100">
                      {error}
                    </motion.p>
                  )}

                  <HeizenButton
                    variant="editorial-dark"
                    className="w-full h-12 mt-2 group"
                    disabled={isLoading}
                  >
                    {isLoading ? "Authenticating..." : (
                      <span className="flex items-center gap-2">
                        Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </HeizenButton>
                </motion.form>
              ) : (
                <motion.form
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSignup}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Reg No (Optional)</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="e.g. 20BCE1234"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        className="h-11 pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email (Optional)</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 bg-slate-50 border-slate-200 focus:bg-white focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-medium text-red-500 bg-red-50 p-2 rounded border border-red-100">
                      {error}
                    </motion.p>
                  )}

                  <HeizenButton
                    variant="editorial-dark"
                    className="w-full h-12 mt-2 group"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : (
                      <span className="flex items-center gap-2">
                        Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </HeizenButton>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="mt-8 text-center">
              <Link to="/" className="text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors">
                ← Return to Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
