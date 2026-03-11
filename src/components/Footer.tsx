import { useNavigate } from "react-router-dom";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
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
    <footer className="bg-foreground text-background py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div>
            <span className="font-display text-xl font-bold">SEOPulse AI</span>
            <p className="text-sm opacity-60 mt-2 max-w-xs">AI-powered SEO content optimization for creators and businesses.</p>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-3 opacity-60 uppercase tracking-wider">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleClick(link.href)}
                        className="text-sm opacity-70 hover:opacity-100 transition-opacity text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center text-xs opacity-60">
          <span>© 2026 SEOPulse AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
