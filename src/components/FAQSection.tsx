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
    <section id="faq" className="section-spacing bg-card">
      <div className="container max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Got Questions? We've Got Answers
        </motion.h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem
                value={`faq-${i}`}
                className="border border-border rounded-lg px-4 data-[state=open]:border-primary/30 data-[state=open]:shadow-sm transition-all"
              >
                <AccordionTrigger className="text-left font-medium text-sm md:text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
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
