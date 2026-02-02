import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-rooftop.jpg";
import fitnessImage from "@/assets/fitness-center.jpg";
import petsImage from "@/assets/pets.jpg";
import lobbyImage from "@/assets/gallery-lobby.jpg";
import apartmentImage from "@/assets/gallery-apartment.jpg";
import rooftopImage from "@/assets/gallery-rooftop.jpg";
import loungeImage from "@/assets/gallery-lounge.jpg";
import livingImage from "@/assets/gallery-living.jpg";
import { Check, Coffee, Dumbbell, MapPin, Utensils, Wine, ShoppingBag, Phone, Mail, Clock, Home, Car, Wifi, UtensilsCrossed, Waves, Sparkles } from "lucide-react";

const communityAmenities = [
  "Rooftop Terrace",
  "Outdoor Fireplace",
  "BBQ & Grilling Area",
  "Outdoor Lounge Spaces",
  "Two-Story 24/7 Fitness Center",
  "Clubroom with Fireplace & Kitchen",
  "Lobby Coffee Bar",
  "On-Site Parking",
  "24/7 Package Lockers",
  "Two Passenger Elevators",
  "Additional Garage Storage",
];

const apartmentFeatures = [
  "Warm & Cool Color Schemes",
  "Beautiful Kitchen Tile Backsplash",
  "Efficient Heating & Cooling Systems",
  "Quartz Countertops",
  "Stainless Steel Whirlpool Appliances",
  "Built-In Shelving",
  "Large Sinks with Designer Faucets",
  "Cozy Patios & Balconies*",
  "In-Unit Bike Storage*",
  "Carpeted Bedrooms",
  "Floor-to-Ceiling Windows*",
  "Wood-Style Vinyl Flooring",
  "In-Unit Washer & Dryer",
];

const highlightAmenities = [
  "Rooftop Terrace",
  "Courtyard",
  "Covered Parking Available",
  "High-Speed Internet Ready",
  "Dishwasher",
  "In-Unit Washer & Dryer",
];

const galleryImages = [
  { src: lobbyImage, title: "Lobby with Fireplace" },
  { src: fitnessImage, title: "Fitness Center" },
  { src: apartmentImage, title: "Apartment Interior" },
  { src: rooftopImage, title: "Rooftop Terrace" },
  { src: loungeImage, title: "Lounge Area" },
  { src: livingImage, title: "Living Room" },
];

const neighborhoods = [
  { category: "Coffee & Tea", name: "Flour Bloom", distance: "0.02mi", icon: Coffee },
  { category: "Fast Food", name: "Rock Roll Chili Pit", distance: "0.22mi", icon: Utensils },
  { category: "Fitness & Health", name: "Jessica Schultz Pilates", distance: "0.06mi", icon: Dumbbell },
  { category: "Groceries", name: "The Commissary", distance: "0.10mi", icon: ShoppingBag },
  { category: "Restaurants", name: "L'Atelier Yaffe", distance: "0.05mi", icon: Utensils },
  { category: "Nightlife", name: "45 East", distance: "0.22mi", icon: Wine },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury rooftop terrace in Portland"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in tracking-wide">
            EXPERIENCE LUXURY<br />LIVING IN PORTLAND
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Located east of the Burnside Bridge on Grand Avenue, Greenland offers residents the best views of the eastern side of the City of Roses. Come for a tour and let us show you everything!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-greenland-green-dark text-primary-foreground px-8 py-6 text-lg animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/floor-plans">CHECK AVAILABILITY</Link>
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Greenland — Apartments in Portland, OR
          </h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-primary-foreground/90">
            Discover Greenland, a welcoming apartment community designed for comfortable everyday living. Our thoughtfully designed, pet-friendly apartments offer a warm and inviting place to call home for professionals, students, families, seniors, and everyone in between. With a focus on comfort, convenience, and a sense of community, Greenland is a place where you can truly feel at home.
          </p>
          
          {/* Quick Links */}
          <div className="flex justify-center mt-12 max-w-4xl mx-auto">
            <Link 
              to="/floor-plans" 
              className="bg-greenland-gold hover:bg-greenland-gold-light transition-colors py-4 px-6 rounded text-lg font-semibold tracking-wide text-foreground"
            >
              APPLY
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Living Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src={rooftopImage}
            alt="Modern living at Greenland"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/50" />
            <h2 className="text-3xl md:text-5xl font-display font-bold">Modern Living</h2>
            <div className="h-px w-12 bg-white/50" />
          </div>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-white/90 mb-6">
            When you choose one of our apartments in Portland, Oregon, you get more than a place to live – you get 
            a place to relax and proudly call home. Whether you select one of our studios, one-, or two-bedroom 
            apartments, your experience will be just as sweet. Each of our apartment homes have been crafted with 
            style and are fully equipped with kitchen appliances and a personal patio or balcony.
          </p>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-white/90">
            Designed to create the perfect living environment, our community offers the ambiance that you will be 
            happy to return to every day. With you in mind, we offer community amenities that you will love, 
            including a rooftop terrace, fitness center, and courtyard. Add in our helpful management team, 
            and your apartment living experience becomes complete.
          </p>
        </div>
      </section>


      {/* Pet Friendly Section */}
      <section className="py-20 bg-greenland-cream">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-4">PET FRIENDLY</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Greenland, we understand that your pet is a member of your family. That's why we're happy to welcome your furry friends to our community. Please contact us for breed restrictions and additional information.
              </p>
            </div>
            <div>
              <img
                src={petsImage}
                alt="Pet friendly community"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
