import { Link, useLocation } from "react-router-dom";
import { Shield, User, Github, Linkedin, LogOut, PenTool } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { path: "/explore", label: "Explore" },
  { path: "/scanner", label: "AI Scanner" },
  { path: "/how-to-use", label: "Guide" },
];

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 80], ["5rem", "3.5rem"]);

  return (
    <motion.nav
      style={{ height: navHeight }}
      className="nav-glass fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/50"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
            <PenTool className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-editorial font-bold tracking-tight text-slate-900">
            Parallax
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 transition-colors hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 stroke-2" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 transition-colors hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 stroke-2" />
          </a>
          {isAuthenticated ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100"
              onClick={logout}
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5 stroke-2" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 border border-transparent hover:border-slate-700 transition-all duration-300"
              asChild
            >
              <Link to="/auth/login" className="flex items-center gap-2 px-4">
                <User className="h-4 w-4 stroke-2" />
                <span>Sign in</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
