import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export default function Footer() {
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between gap-12 mb-12"
        >
          <div>
            <span className="font-display text-xl font-bold">SEOPulse AI</span>
            <p className="text-sm opacity-60 mt-2 max-w-xs">AI-powered SEO content optimization for creators and businesses.</p>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {Object.entries(footerLinks).map(([title, links], groupIdx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIdx * 0.1, duration: 0.5 }}
              >
                <h4 className="font-semibold text-sm mb-3 opacity-60 uppercase tracking-wider">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleClick(link.href)}
                        className="text-sm opacity-70 hover:opacity-100 transition-opacity text-left hover:translate-x-1 transform transition-transform duration-200"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="border-t border-background/10 pt-6 text-center text-xs opacity-60"
        >
          <span>© 2026 SEOPulse AI. All rights reserved.</span>
        </motion.div>
      </div>
    </footer>
  );
}
