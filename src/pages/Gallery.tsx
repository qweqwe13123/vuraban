import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import lobbyImage from "@/assets/gallery-lobby.jpg";
import fitnessImage from "@/assets/fitness-center.jpg";
import apartmentImage from "@/assets/gallery-apartment.jpg";
import rooftopImage from "@/assets/gallery-rooftop.jpg";
import loungeImage from "@/assets/gallery-lounge.jpg";
import livingImage from "@/assets/gallery-living.jpg";

const galleryItems = [
  { src: lobbyImage, title: "Lobby with Fireplace", category: "Common Areas" },
  { src: fitnessImage, title: "Fitness Center", category: "Common Areas" },
  { src: apartmentImage, title: "Apartment Interior", category: "Apartments" },
  { src: rooftopImage, title: "Rooftop Terrace", category: "Common Areas" },
  { src: loungeImage, title: "Lounge Area", category: "Common Areas" },
  { src: livingImage, title: "Living Room", category: "Apartments" },
];

const categories = ["All", "Common Areas", "Apartments"];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Gallery</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Browse the photo gallery below to get a glimpse of our community, including our favorite neighborhood spots, epic community spaces, and virtual tours of some of our luxury apartments.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-greenland-cream border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={filter === category ? "bg-primary text-primary-foreground" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg cursor-pointer card-hover"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-white/70 uppercase tracking-wide mb-1">{item.category}</p>
                  <h3 className="text-white font-display font-semibold text-lg">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white"
          >
            <X size={24} />
          </button>
          {selectedImage && (
            <div>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-6 bg-black/90">
                <p className="text-xs text-white/50 uppercase tracking-wide mb-1">{selectedImage.category}</p>
                <h3 className="text-white font-display font-semibold text-xl">{selectedImage.title}</h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
