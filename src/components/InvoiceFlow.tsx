import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lock, CheckCircle, Coins, Truck, Users, Shield, Zap, ArrowRight, Link } from "lucide-react";

const InvoiceFlow = () => {
  const mainSteps = [
    {
      icon: FileText,
      title: "Request Financing",
      description: "Supplier submits financing request with invoice details",
      color: "text-muted-foreground",
      details: "Upload invoice, set terms, connect wallet",
      bgColor: "bg-muted/10"
    },
    {
      icon: Lock,
      title: "Encrypted Invoices", 
      description: "Invoice data encrypted using zero-knowledge proofs",
      color: "text-gold",
      details: "Data hidden until approval, maintaining confidentiality",
      bgColor: "bg-gold/10"
    },
    {
      icon: Truck,
      title: "Supply Chain Verification",
      description: "Smart contracts verify delivery and goods authenticity",
      color: "text-trust",
      details: "IoT sensors, delivery confirmation, quality assurance",
      bgColor: "bg-trust/10"
    },
    {
      icon: Link,
      title: "Blockchain Settlement",
      description: "Automated payment release through smart contracts",
      color: "text-accent",
      details: "Instant, transparent, immutable transaction record",
      bgColor: "bg-accent/10"
    },
  ];

  const participants = [
    { icon: Users, title: "Suppliers", desc: "Upload invoices securely" },
    { icon: Shield, title: "Buyers", desc: "Verify without exposure" },
    { icon: Coins, title: "Financiers", desc: "Fund with confidence" },
  ];

  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Complete Financing Workflow
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From request to settlement - encrypted, secure, and transparent supply chain financing powered by blockchain technology
          </p>
        </div>

        {/* Enhanced Main Flow */}
        <div className="relative mb-20">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-muted via-gold via-trust to-accent opacity-20 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Animated Flow Dots */}
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2">
            <div className="animate-invoice-flow">
              <div className="w-4 h-4 bg-gradient-gold rounded-full shadow-glow border-2 border-gold"></div>
            </div>
          </div>
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2" style={{ animationDelay: "1.5s" }}>
            <div className="animate-invoice-flow">
              <div className="w-4 h-4 bg-gradient-trust rounded-full shadow-glow border-2 border-trust"></div>
            </div>
          </div>

          {/* Enhanced Steps */}
          <div className="grid md:grid-cols-4 gap-6 relative z-10">
            {mainSteps.map((step, index) => (
              <Card key={index} className={`p-6 text-center ${step.bgColor} border-2 border-transparent hover:border-gold/30 shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 group`}>
                <div className="relative mb-4">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-background/50 flex items-center justify-center ${step.color} shadow-inner`}>
                    <step.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-gold text-gold-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-glow">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {step.description}
                </p>
                <p className="text-xs text-muted-foreground/80 font-medium">
                  {step.details}
                </p>
                {index < mainSteps.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-muted-foreground/40 mx-auto mt-4 md:hidden" />
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Participants Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">Ecosystem Participants</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {participants.map((participant, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-elevated">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <participant.icon className="w-8 h-8 text-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{participant.title}</h4>
                <p className="text-sm text-muted-foreground">{participant.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Security & Technology Features */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gold/5 rounded-xl border border-gold/20">
            <div className="w-14 h-14 bg-gradient-gold rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Lock className="w-7 h-7 text-gold-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Zero-Knowledge Proofs</h4>
            <p className="text-sm text-muted-foreground">Invoice data encrypted until financing approval</p>
          </div>
          <div className="text-center p-6 bg-trust/5 rounded-xl border border-trust/20">
            <div className="w-14 h-14 bg-gradient-trust rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Shield className="w-7 h-7 text-trust-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Smart Contracts</h4>
            <p className="text-sm text-muted-foreground">Automated compliance and execution</p>
          </div>
          <div className="text-center p-6 bg-accent/5 rounded-xl border border-accent/20">
            <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Zap className="w-7 h-7 text-accent-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Instant Settlement</h4>
            <p className="text-sm text-muted-foreground">Real-time blockchain transactions</p>
          </div>
          <div className="text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
            <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Link className="w-7 h-7 text-primary-foreground" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Immutable Records</h4>
            <p className="text-sm text-muted-foreground">Permanent transaction history</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Button variant="hero" size="xl" className="group">
            Start Your Financing Request
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvoiceFlow;