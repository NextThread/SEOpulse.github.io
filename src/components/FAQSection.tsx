import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How accurate are the SEO suggestions?",
    a: "Our AI engine cross-references SERP data with industry best practices — 85%+ accuracy matching pro tools like Surfer. Premium gives projected ROI for each suggestion.",
  },
  {
    q: "What if I'm a beginner?",
    a: "Zero learning curve — paste & go. The free audit teaches you the basics, and our suggestions are written in plain language anyone can follow.",
  },
  {
    q: "What integrations are available?",
    a: "Export reports to Google Docs and WordPress. Premium users get access to Zapier hooks and API access for custom workflows.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. Your data is never stored without consent. All transmissions are encrypted with TLS 1.3, and we are fully GDPR-compliant.",
  },
  {
    q: "What's the refund policy?",
    a: "Full 30-day money-back guarantee on all premium plans — no questions asked.",
  },
  {
    q: "Can I try before I buy?",
    a: "Yes! Every user gets 1 free premium-quality audit. Experience the full power of our AI analysis before committing to a plan.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="section-spacing bg-card relative overflow-hidden">
      {/* Subtle bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      <div className="container max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Got{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Questions?
            </span>
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">We've got answers</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="border border-border rounded-xl px-5 data-[state=open]:border-primary/30 data-[state=open]:shadow-md data-[state=open]:shadow-primary/5 transition-all"
              >
                <AccordionTrigger className="text-left font-medium text-sm md:text-base hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
