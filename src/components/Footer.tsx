import { FileText, Lightbulb, PenTool } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-editorial font-bold tracking-tight text-slate-900">
              Parallax
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <a
              href="#"
              className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
            >
              <FileText className="h-4 w-4 stroke-2 group-hover:stroke-indigo-600" />
              <span>Documentation</span>
            </a>
            <a
              href="#"
              className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
            >
              <Lightbulb className="h-4 w-4 stroke-2 group-hover:stroke-indigo-600" />
              <span>Support</span>
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Parallax. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
