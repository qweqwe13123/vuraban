import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import GreenlandLogo from "./GreenlandLogo";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-display font-bold">G</span>
              </div>
              <div>
                <span className="text-lg font-display font-bold text-primary-foreground">GREENLAND</span>
                <p className="text-xs tracking-widest text-primary-foreground/70 uppercase">Luxury Living</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Experience luxury living in the heart of Portland. Modern apartments with stunning views and first-class amenities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/floor-plans" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Floor Plans</Link></li>
              <li><Link to="/amenities" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Amenities</Link></li>
              <li><Link to="/gallery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/neighborhood" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Neighborhood</Link></li>
              <li><Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-greenland-gold" />
                <span className="text-sm text-primary-foreground/80">77 NE Grand Ave<br />Portland, OR 97232</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-greenland-gold" />
                <span className="text-sm text-primary-foreground/80">(503) 555-0123</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-greenland-gold" />
                <span className="text-sm text-primary-foreground/80">greenlandlivingofficial@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Office Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3">
                <Clock size={18} className="flex-shrink-0 text-greenland-gold" />
                <div className="text-sm text-primary-foreground/80">
                  <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p>Sat: 10:00 AM - 5:00 PM</p>
                  <p>Sun: 12:00 PM - 5:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
            <Link to="/terms-and-conditions" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Terms and Conditions
            </Link>
            <Link to="/privacy-policy" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact-us" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Contact Us
            </Link>
            <Link to="/accessibility" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Accessibility Statement
            </Link>
          </div>
          <p className="text-sm text-primary-foreground/60 text-center">
            © {new Date().getFullYear()} Greenland Luxury Living. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
