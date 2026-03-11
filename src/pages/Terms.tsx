import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-20">
        <Button variant="ghost" className="mb-8 gap-2" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 11, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">By accessing or using SEOPulse AI, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
            <p className="text-muted-foreground leading-relaxed">SEOPulse AI provides AI-powered SEO content analysis, keyword research, and optimization suggestions. Free tier users receive 1 comprehensive audit. Premium subscribers receive unlimited access based on their subscription plan.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information during registration and to update it as necessary. We reserve the right to suspend accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Subscription & Billing</h2>
            <p className="text-muted-foreground leading-relaxed">Premium subscriptions are billed according to the plan selected (monthly at ₹299, half-yearly at ₹999, or yearly at ₹1,499). All prices are in Indian Rupees. Subscriptions auto-renew unless cancelled before the renewal date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Refund Policy</h2>
            <p className="text-muted-foreground leading-relaxed">We offer a 30-day money-back guarantee on all premium plans. If you are not satisfied, contact us within 30 days of your purchase for a full refund — no questions asked.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed">You agree not to use SEOPulse AI for any unlawful purpose, to attempt to reverse-engineer the service, to submit malicious content, or to abuse the API or audit system beyond reasonable usage limits.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">All content, features, and functionality of SEOPulse AI are owned by us and are protected by intellectual property laws. You retain ownership of content you submit for analysis.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">SEOPulse AI is provided "as is." We do not guarantee specific SEO results or rankings. Our suggestions are based on AI analysis and industry best practices but results may vary. We are not liable for any indirect or consequential damages.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">We reserve the right to modify these Terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">For any questions regarding these Terms, please contact us at legal@seopulse.ai.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
