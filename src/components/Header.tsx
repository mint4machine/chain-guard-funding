import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.jpg";
import { Truck, Lock, Zap, Building2, Globe, TrendingUp } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={logoIcon} 
                alt="Chain Guard Funding Logo" 
                className="w-10 h-10 rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-gold opacity-20 rounded-lg animate-pulse-glow"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Chain Guard</h1>
              <p className="text-xs text-muted-foreground">Revolutionary Finance</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Lock className="w-4 h-4" />
              <span>Zero-Knowledge</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Truck className="w-4 h-4" />
              <span>Smart Logistics</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Zap className="w-4 h-4" />
              <span>Instant Settlement</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Building2 className="w-4 h-4" />
              <span>Enterprise</span>
            </div>
          </nav>

          {/* Wallet Connect */}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;