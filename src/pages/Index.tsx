import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InvoiceFlow from "@/components/InvoiceFlow";
import ContractInteraction from "@/components/ContractInteraction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <InvoiceFlow />
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Smart Contract Integration
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Interact with FHE-enabled smart contracts for encrypted data processing and blockchain settlement
              </p>
            </div>
            <ContractInteraction />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
