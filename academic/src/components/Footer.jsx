const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-6 dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-y-4">
        {/* Copyright Section */}
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Your Brand Name. All rights reserved.
        </p>

        {/* Minimal Navigation Links */}
        <ul className="flex flex-wrap items-center gap-x-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <li>
            <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
