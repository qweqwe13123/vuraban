import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Phone } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Clear any stored form data after successful payment
    localStorage.removeItem("applicationFormData");
  }, []);

  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center py-16 bg-gradient-to-b from-greenland-cream to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Application Submitted Successfully!
              </h1>
              <p className="text-xl text-muted-foreground mb-2">
                Thank you for applying to Greenland Luxury Living.
              </p>
              <p className="text-muted-foreground">
                Your $5.00 application fee has been processed.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-lg mb-8">
              <h2 className="text-xl font-display font-semibold mb-4">What Happens Next?</h2>
              <ul className="text-left space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">1</span>
                  <span>Our team will review your application within 2-3 business days.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">2</span>
                  <span>We'll conduct a credit and background check as authorized.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">3</span>
                  <span>You'll receive an email with our decision and next steps.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">4</span>
                  <span>If approved, we'll schedule a move-in date and lease signing.</span>
                </li>
              </ul>
            </div>

            {sessionId && (
              <p className="text-sm text-muted-foreground mb-6">
                Confirmation ID: <span className="font-mono">{sessionId.slice(0, 20)}...</span>
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-greenland-green-dark flex items-center gap-2"
              >
                <Home size={16} /> Return Home
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2"
              >
                <Phone size={16} /> Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentSuccess;
