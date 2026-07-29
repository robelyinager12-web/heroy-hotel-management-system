import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GradientText } from "@/components/shared/GradientText";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gradient-luxury">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">
            <span className="text-platinum-100">Photo</span> <GradientText>Gallery</GradientText>
          </h1>
          <p className="mt-3 text-platinum-300">
            A glimpse into the elegance and comfort awaiting you at Heroy Hotel
          </p>
        </div>

        <GalleryGrid />
      </div>
      <Footer />
    </main>
  );
}