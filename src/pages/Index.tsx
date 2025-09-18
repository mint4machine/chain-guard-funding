import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InvoiceFlow from "@/components/InvoiceFlow";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <InvoiceFlow />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
