import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Lock, CheckCircle, Coins, Database, Globe, Building2 } from "lucide-react";
import logoIcon from "@/assets/logo-icon.jpg";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      {/* Animated Invoice Flowchart */}
      <div className="py-16 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Invoice Processing Flow
            </h2>
            <p className="text-muted-foreground">
              Watch how invoices flow through our encrypted system
            </p>
          </div>

          {/* Animated Flowchart */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Flow Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="hsl(var(--trust))" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path 
                  d="M 100 150 Q 300 50 500 150 Q 700 250 900 150" 
                  stroke="url(#flowGradient)" 
                  strokeWidth="2" 
                  fill="none"
                  className="animate-pulse"
                />
              </svg>

              {/* Flow Nodes */}
              <div className="grid grid-cols-4 gap-4 relative" style={{ zIndex: 2 }}>
                <Card className="p-4 text-center bg-card/80 backdrop-blur-sm shadow-card">
                  <div className="w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground">Invoice Upload</h4>
                </Card>

                <Card className="p-4 text-center bg-card/80 backdrop-blur-sm shadow-card">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-gold animate-pulse" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground">Encryption</h4>
                </Card>

                <Card className="p-4 text-center bg-card/80 backdrop-blur-sm shadow-card">
                  <div className="w-12 h-12 bg-trust/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-trust animate-pulse" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground">Approval</h4>
                </Card>

                <Card className="p-4 text-center bg-card/80 backdrop-blur-sm shadow-card">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Coins className="w-6 h-6 text-accent animate-pulse" />
                  </div>
                  <h4 className="text-sm font-medium text-foreground">Settlement</h4>
                </Card>
              </div>

              {/* Animated Flow Indicators */}
              <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2" style={{ zIndex: 3 }}>
                <div className="animate-invoice-flow">
                  <div className="w-4 h-4 bg-gold rounded-full shadow-glow flex items-center justify-center">
                    <div className="w-2 h-2 bg-gold-foreground rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-12 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src={logoIcon} alt="ChainFinance" className="w-8 h-8 rounded" />
                <span className="text-lg font-bold text-foreground">ChainFinance</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Confidential supply chain financing powered by blockchain technology
              </p>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-trust" />
                <span className="text-xs text-trust">FHE Encrypted</span>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Solutions</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Invoice Financing</div>
                <div>Supply Chain Finance</div>
                <div>Working Capital</div>
                <div>Trade Finance</div>
              </div>
            </div>

            {/* Technology */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Technology</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Zero-Knowledge Proofs</div>
                <div>Smart Contracts</div>
                <div>Blockchain Security</div>
                <div>Automated Compliance</div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Get Started</h3>
              <div className="space-y-4">
                <Button variant="trust" size="sm" className="w-full">
                  Start Financing
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="finance" size="sm" className="w-full">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ChainFinance. All rights reserved. | Encrypted supply chain financing.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;