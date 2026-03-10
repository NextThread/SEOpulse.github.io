import { Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Docs"],
  Company: ["About", "Blog", "Contact"],
  Legal: ["Privacy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div>
            <span className="font-display text-xl font-bold">SEOPulse AI</span>
            <div className="flex gap-4 mt-4">
              <a href="https://x.com/DegenOnChain" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="opacity-60 hover:opacity-100 transition-opacity">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="opacity-60 hover:opacity-100 transition-opacity">
                <Linkedin size={18} />
              </a>
              <a href="mailto:hello@seopulse.ai" aria-label="Email" className="opacity-60 hover:opacity-100 transition-opacity">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold text-sm mb-3 opacity-60 uppercase tracking-wider">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs opacity-60">
          <span>© 2026 SEOPulse AI by Anurag Roy, Agartala. Made with ❤️ in Tripura.</span>
          <span>Powered by Grok</span>
        </div>
      </div>
    </footer>
  );
}
