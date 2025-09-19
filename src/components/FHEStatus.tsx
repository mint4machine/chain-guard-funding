import { Card } from "@/components/ui/card";
import { Key, Shield, Database, CheckCircle, AlertCircle } from "lucide-react";

interface FHEStatusProps {
  status: 'idle' | 'encrypting' | 'submitting' | 'success' | 'error';
  message?: string;
}

const FHEStatus = ({ status, message }: FHEStatusProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'encrypting':
        return <Key className="w-6 h-6 text-gold animate-spin" />;
      case 'submitting':
        return <Database className="w-6 h-6 text-trust animate-pulse" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Shield className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'encrypting':
        return 'Encrypting data with FHE...';
      case 'submitting':
        return 'Submitting encrypted data to blockchain...';
      case 'success':
        return 'FHE encryption and blockchain submission successful!';
      case 'error':
        return 'FHE encryption or submission failed';
      default:
        return 'Ready for FHE encryption';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'encrypting':
        return 'border-gold/20 bg-gold/5';
      case 'submitting':
        return 'border-trust/20 bg-trust/5';
      case 'success':
        return 'border-green-500/20 bg-green-500/5';
      case 'error':
        return 'border-red-500/20 bg-red-500/5';
      default:
        return 'border-muted/20 bg-muted/5';
    }
  };

  return (
    <Card className={`p-4 border ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div>
          <p className="text-sm font-medium text-foreground">
            {getStatusMessage()}
          </p>
          {message && (
            <p className="text-xs text-muted-foreground mt-1">
              {message}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FHEStatus;
