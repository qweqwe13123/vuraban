import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bed, Bath, Square, ChevronRight } from "lucide-react";
import apartmentImage from "@/assets/gallery-apartment.jpg";
import livingImage from "@/assets/gallery-living.jpg";
import loungeImage from "@/assets/gallery-lounge.jpg";

const floorPlans = [
  {
    id: "studio-a",
    name: "Studio A",
    type: "Studio",
    beds: 0,
    baths: 1,
    sqft: 450,
    price: 1450,
    image: livingImage,
    available: 3,
  },
  {
    id: "1br-a",
    name: "The Portland",
    type: "1 Bedroom",
    beds: 1,
    baths: 1,
    sqft: 650,
    price: 1750,
    image: apartmentImage,
    available: 5,
  },
  {
    id: "1br-b",
    name: "The Rose",
    type: "1 Bedroom",
    beds: 1,
    baths: 1,
    sqft: 720,
    price: 1895,
    image: loungeImage,
    available: 2,
  },
  {
    id: "2br-a",
    name: "The Grand",
    type: "2 Bedroom",
    beds: 2,
    baths: 2,
    sqft: 950,
    price: 2350,
    image: apartmentImage,
    available: 4,
  },
  {
    id: "2br-b",
    name: "The Burnside",
    type: "2 Bedroom",
    beds: 2,
    baths: 2,
    sqft: 1100,
    price: 2650,
    image: livingImage,
    available: 1,
  },
  {
    id: "3br-a",
    name: "The Skyline",
    type: "3 Bedroom",
    beds: 3,
    baths: 2,
    sqft: 1350,
    price: 3250,
    image: loungeImage,
    available: 2,
  },
];

const FloorPlans = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<typeof floorPlans[0] | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredPlans = filter === "all" 
    ? floorPlans 
    : floorPlans.filter(plan => plan.type === filter);

  const handleApply = (plan: typeof floorPlans[0]) => {
    setSelectedPlan(null);
    navigate("/apply", { state: { selectedPlan: plan } });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Floor Plans</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Explore our collection of thoughtfully designed floor plans. Each apartment features modern finishes, premium amenities, and stunning views of Portland.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-greenland-cream border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {["all", "Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom"].map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                onClick={() => setFilter(type)}
                className={filter === type ? "bg-primary text-primary-foreground" : ""}
              >
                {type === "all" ? "All Floor Plans" : type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Floor Plans Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-card rounded-lg overflow-hidden shadow-lg card-hover cursor-pointer border border-border"
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-display font-semibold text-xl">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">${plan.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">/month</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Bed size={16} /> {plan.beds === 0 ? "Studio" : `${plan.beds} Bed`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath size={16} /> {plan.baths} Bath
                    </span>
                    <span className="flex items-center gap-1">
                      <Square size={16} /> {plan.sqft} sqft
                    </span>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-greenland-green-dark">
                    Apply Now <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">{selectedPlan.name}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={selectedPlan.image}
                  alt={selectedPlan.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div>
                  <p className="text-muted-foreground mb-4">{selectedPlan.type}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bedrooms</span>
                      <span className="font-medium">{selectedPlan.beds === 0 ? "Studio" : selectedPlan.beds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bathrooms</span>
                      <span className="font-medium">{selectedPlan.baths}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Square Feet</span>
                      <span className="font-medium">{selectedPlan.sqft}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Units</span>
                      <span className="font-medium">{selectedPlan.available}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <span className="text-lg font-semibold">Monthly Rent</span>
                      <span className="text-lg font-bold text-primary">${selectedPlan.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6 bg-primary hover:bg-greenland-green-dark"
                    onClick={() => handleApply(selectedPlan)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default FloorPlans;
