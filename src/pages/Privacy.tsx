import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl py-20">
        <Button variant="ghost" className="mb-8 gap-2" onClick={() => navigate("/")}>
          <ArrowLeft size={16} /> Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6">Last updated: March 11, 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">We collect information you provide directly, including your name, email address, and any content or URLs you submit for SEO analysis. We also automatically collect usage data such as browser type, device information, and interaction patterns to improve our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">Your information is used to provide and improve our SEO analysis services, communicate with you about your account and updates, personalize your experience, and comply with legal obligations. We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Data Storage & Security</h2>
            <p className="text-muted-foreground leading-relaxed">We implement industry-standard security measures to protect your data. Content submitted for analysis is processed in real-time and is not permanently stored unless you create an account and explicitly save reports. All data transmissions are encrypted using TLS 1.3.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Cookies & Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">We use essential cookies to maintain your session and preferences (such as dark mode). Analytics cookies help us understand usage patterns. You can manage cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">We use Firebase for authentication and analytics. These services have their own privacy policies. We encourage you to review them. We do not share your SEO audit data with any third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">You have the right to access, correct, or delete your personal data at any time. You may also request a copy of all data we hold about you. To exercise these rights, contact us at privacy@seopulse.ai.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">If you have any questions about this Privacy Policy, please contact us at privacy@seopulse.ai.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
