import Layout from "@/components/Layout";
import { Check } from "lucide-react";
import fitnessImage from "@/assets/fitness-center.jpg";
import lobbyImage from "@/assets/gallery-lobby.jpg";
import rooftopImage from "@/assets/gallery-rooftop.jpg";
import loungeImage from "@/assets/gallery-lounge.jpg";

const communityAmenities = [
  { name: "Rooftop Terrace", description: "Stunning views of Portland skyline" },
  { name: "Outdoor Fireplace", description: "Perfect for evening gatherings" },
  { name: "BBQ & Grilling Area", description: "Fully equipped outdoor kitchen" },
  { name: "Outdoor Lounge Spaces", description: "Comfortable seating areas" },
  { name: "Two-Story 24/7 Fitness Center", description: "State-of-the-art equipment" },
  { name: "Clubroom with Fireplace & Kitchen", description: "Great for private events" },
  { name: "Lobby Coffee Bar", description: "Complimentary coffee service" },
  { name: "On-Site Parking", description: "Convenient covered parking" },
  { name: "24/7 Package Lockers", description: "Secure package delivery" },
  { name: "Two Passenger Elevators", description: "Quick and easy access" },
  { name: "Additional Garage Storage", description: "Extra storage options" },
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

const Amenities = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Amenities</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Discover the exceptional amenities that make Greenland the premier choice for cozy living in Portland.
          </p>
        </div>
      </section>

      {/* Community Amenities */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Community Amenities</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={rooftopImage}
                alt="Rooftop terrace"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-semibold text-2xl mb-6 text-primary">Rooftop Living</h3>
              <p className="text-muted-foreground mb-6">
                Our stunning rooftop terrace offers panoramic views of Portland's skyline. Enjoy outdoor dining, BBQ grilling, and cozy evenings by the fire pit.
              </p>
              <ul className="space-y-3">
                {communityAmenities.slice(0, 4).map((amenity) => (
                  <li key={amenity.name} className="flex items-start gap-3">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{amenity.name}</span>
                      <p className="text-sm text-muted-foreground">{amenity.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h3 className="font-display font-semibold text-2xl mb-6 text-primary">Fitness & Wellness</h3>
              <p className="text-muted-foreground mb-6">
                Stay active in our two-story fitness center, open 24/7 with premium equipment for all your workout needs.
              </p>
              <ul className="space-y-3">
                {communityAmenities.slice(4, 7).map((amenity) => (
                  <li key={amenity.name} className="flex items-start gap-3">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{amenity.name}</span>
                      <p className="text-sm text-muted-foreground">{amenity.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={fitnessImage}
                alt="Fitness center"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={lobbyImage}
                alt="Lobby"
                className="rounded-lg shadow-xl w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-semibold text-2xl mb-6 text-primary">Convenience & Security</h3>
              <p className="text-muted-foreground mb-6">
                We've thought of everything to make your daily life easier and more secure.
              </p>
              <ul className="space-y-3">
                {communityAmenities.slice(7).map((amenity) => (
                  <li key={amenity.name} className="flex items-start gap-3">
                    <Check size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">{amenity.name}</span>
                      <p className="text-sm text-muted-foreground">{amenity.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Apartment Features */}
      <section className="py-20 bg-greenland-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Apartment Features</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={loungeImage}
                alt="Apartment interior"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <p className="text-muted-foreground mb-8">
                Each apartment at Greenland is designed with your comfort in mind, featuring premium finishes and modern conveniences.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {apartmentFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check size={16} className="text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6">*In select apartments</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;
