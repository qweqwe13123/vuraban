import Layout from "@/components/Layout";
import { Phone, Mail, MapPin } from "lucide-react";

const Accessibility = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-center mb-8 text-foreground">
            Accessibility Statement
          </h1>
          
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg text-muted-foreground mb-12">
              <hr className="border-border mb-8" />
              
              <h2 className="text-xl font-display font-semibold mt-8 mb-4 text-foreground">Our Commitment to Accessibility</h2>
              <p>
                Greenland Cozy Living is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant accessibility 
                standards to guarantee we provide equal access to all users.
              </p>

              <h2 className="text-xl font-display font-semibold mt-8 mb-4 text-foreground">Accessibility Standards</h2>
              <p>
                We endeavor to conform to level AA of the World Wide Web Consortium (W3C) Web Content Accessibility 
                Guidelines 2.1 (WCAG 2.1). These guidelines explain how to make web content more accessible for people 
                with disabilities and more user-friendly for everyone.
              </p>

              <h2 className="text-xl font-display font-semibold mt-8 mb-4 text-foreground">Measures We Take</h2>
              <p>We have taken the following measures to ensure accessibility on our website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Include accessibility as part of our mission statement</li>
                <li>Integrate accessibility into our procurement practices</li>
                <li>Provide accessibility training for our staff</li>
                <li>Assign clear accessibility goals and responsibilities</li>
                <li>Employ formal accessibility quality assurance methods</li>
              </ul>

              <h2 className="text-xl font-display font-semibold mt-8 mb-4 text-foreground">Technical Specifications</h2>
              <p>
                Accessibility of this website relies on the following technologies to work with the particular 
                combination of web browser and any assistive technologies or plugins installed on your computer:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>HTML</li>
                <li>WAI-ARIA</li>
                <li>CSS</li>
                <li>JavaScript</li>
              </ul>
              <p>
                These technologies are relied upon for conformance with the accessibility standards used.
              </p>

              <h2 className="text-xl font-display font-semibold mt-8 mb-4 text-foreground">Known Limitations</h2>
              <p>
                Despite our best efforts to ensure accessibility of our website, there may be some limitations. 
                If you encounter an issue, please contact us so we can address it.
              </p>

              <h2 className="text-xl font-display font-semibold mt-8 mb-4 text-foreground">Physical Accessibility</h2>
              <p>
                Our apartment community is designed with accessibility in mind. We offer various accessible apartment 
                options and community features. Please contact our leasing office to learn more about our accessible 
                units and amenities.
              </p>

              <h2 className="text-xl font-display font-semibold mt-8 mb-4 text-foreground">Feedback</h2>
              <p>
                We welcome your feedback on the accessibility of this website. If you encounter accessibility barriers 
                or have suggestions for improvement, please let us know:
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-greenland-cream p-8 rounded-lg">
              <h3 className="text-xl font-display font-semibold mb-6 text-foreground">Contact Us</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Phone</h4>
                    <a href="tel:(503) 555-0123" className="text-primary hover:underline">(503) 555-0123</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email</h4>
                    <a href="mailto:greenlandlivingofficial@gmail.com" className="text-primary hover:underline text-sm break-all">
                      greenlandlivingofficial@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Address</h4>
                    <p className="text-muted-foreground text-sm">
                      77 NE Grand Ave<br />
                      Portland, OR 97232
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                We try to respond to feedback within 2 business days.
              </p>
            </div>

            <p className="text-sm text-muted-foreground mt-8 text-center">
              This statement was last updated on January 2026.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Accessibility;
