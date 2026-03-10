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
    a: "Powered by Grok AI + SERP data – 85%+ match pro tools like Surfer. Premium gives projected ROI.",
  },
  {
    q: "Is it India-specific?",
    a: "Yes! Handles rupees, local languages, and NE trends like Agartala e-com.",
  },
  {
    q: "What if I'm a beginner?",
    a: "Zero learning curve – paste & go. Free tier teaches basics.",
  },
  {
    q: "Integrations?",
    a: "Exports to Google Docs, WordPress. Premium: Zapier hooks.",
  },
  {
    q: "Secure?",
    a: "Your data never stored without consent. GDPR-compliant.",
  },
  {
    q: "Refund policy?",
    a: "Full 30 days – no questions.",
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
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-lg px-4 data-[state=open]:border-muted-foreground/30"
            >
              <AccordionTrigger className="text-left font-medium text-sm md:text-base hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
