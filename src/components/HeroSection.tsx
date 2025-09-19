import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-trucks.jpg";
import { ArrowRight, Lock, Zap, Globe, Building2, TrendingUp, Database, Cpu } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Supply Chain Logistics"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90"></div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-1/3 left-0 w-full overflow-hidden z-10">
        <div className="animate-truck-move">
          <Globe className="w-8 h-8 text-gold opacity-60" />
        </div>
      </div>
      <div className="absolute top-2/3 left-0 w-full overflow-hidden z-10" style={{ animationDelay: "4s" }}>
        <div className="animate-truck-move">
          <Database className="w-6 h-6 text-trust opacity-40" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Revolutionize Supply Chain
              <span className="block bg-gradient-gold bg-clip-text text-transparent">
                Finance with Privacy
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform global supply chains with zero-knowledge encryption, smart contracts, and instant blockchain settlement
            </p>
          </div>

          {/* Innovation Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-trust" />
              <span>Zero-Knowledge Privacy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-gold" />
              <span>AI-Powered Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-accent" />
              <span>Instant Settlement</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span>Enterprise Ready</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" className="group">
              Request Financing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="finance" size="xl">
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">$2.5B+</div>
              <div className="text-sm text-muted-foreground">Financed Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-trust">10,000+</div>
              <div className="text-sm text-muted-foreground">Suppliers Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">99.8%</div>
              <div className="text-sm text-muted-foreground">Privacy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;