import Layout from "@/components/Layout";
import { MapPin, Coffee, Utensils, Dumbbell, ShoppingBag, Wine, GraduationCap, Bus } from "lucide-react";

const neighborhoods = [
  { category: "Coffee & Tea", name: "Flour Bloom", distance: "0.02mi", icon: Coffee, address: "75 NE Grand Ave" },
  { category: "Fast Food", name: "Rock Roll Chili Pit", distance: "0.22mi", icon: Utensils, address: "234 NE MLK Blvd" },
  { category: "Fitness & Health", name: "Jessica Schultz Pilates", distance: "0.06mi", icon: Dumbbell, address: "80 NE Grand Ave" },
  { category: "Groceries", name: "The Commissary", distance: "0.10mi", icon: ShoppingBag, address: "100 NE Grand Ave" },
  { category: "Restaurants", name: "L'Atelier Yaffe", distance: "0.05mi", icon: Utensils, address: "78 NE Grand Ave" },
  { category: "Nightlife", name: "45 East", distance: "0.22mi", icon: Wine, address: "45 E Burnside St" },
  { category: "Education", name: "Portland State University", distance: "1.2mi", icon: GraduationCap, address: "1825 SW Broadway" },
  { category: "Transit", name: "Grand Ave MAX Station", distance: "0.05mi", icon: Bus, address: "NE Grand Ave" },
];

const Neighborhood = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Neighborhood</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Portland offers exceptional restaurants, boutiques, and access to entertainment. And we're lucky — our community is located right in the center of it all.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin className="text-primary" size={24} />
            <span className="text-xl font-display font-semibold">77 NE Grand Ave, Portland, OR</span>
          </div>
          
          {/* Map Placeholder */}
          <div className="w-full h-96 bg-greenland-cream rounded-lg overflow-hidden shadow-lg mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.1234567890123!2d-122.6612!3d45.5231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMxJzIzLjIiTiAxMjLCsDM5JzQwLjMiVw!5e0!3m2!1sen!2sus!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Greenland Location Map"
            />
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16 bg-greenland-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Explore Our Neighborhood</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((place, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <place.icon size={24} className="text-primary" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{place.category}</p>
                <h3 className="font-display font-semibold text-lg mb-1">{place.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{place.address}</p>
                <p className="text-sm font-medium text-primary">{place.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portland Living */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-8">Portland Living</h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
            Portland is known for its vibrant culture, excellent food scene, and beautiful natural surroundings. From the bustling Pearl District to the serene Forest Park, there's something for everyone in the City of Roses.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Utensils size={32} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">World-Class Dining</h3>
              <p className="text-muted-foreground text-sm">
                Portland is a foodie's paradise with award-winning restaurants, food carts, and craft breweries.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Bus size={32} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">Easy Transportation</h3>
              <p className="text-muted-foreground text-sm">
                Access to MAX light rail, buses, and bike-friendly streets makes getting around a breeze.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">Shopping & Entertainment</h3>
              <p className="text-muted-foreground text-sm">
                From boutique shops to major retailers, plus theaters and galleries just minutes away.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Neighborhood;
