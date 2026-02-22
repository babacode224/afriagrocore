import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Clock, Mail } from "lucide-react";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureName?: string;
  description?: string;
}

const defaultDescription = `We're working hard to bring you these exciting features:

• Climate Forecasting & Weather Intelligence  
• Yield Optimization Analytics
• Soil & Crop Health Monitoring
• Multilingual AI Voice Assistant
• Expert Consultation Booking System
• Community Forums & Peer Learning
• Real-time Market Insights

Join our waitlist to be notified when these features launch!`;

export default function WaitlistModal({
  open,
  onOpenChange,
  featureName = "Exciting Features",
  description = defaultDescription,
}: WaitlistModalProps) {
  const [, setLocation] = useLocation();

  const handleJoinWaitlist = () => {
    onOpenChange(false);
    setLocation("/contact");
  };

  // Use default description if empty string is passed
  const displayDescription = description || defaultDescription;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mx-auto mb-4">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <DialogTitle className="text-center text-2xl">
            {featureName} Coming Soon!
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2 whitespace-pre-line">
            {displayDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={handleJoinWaitlist}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            size="lg"
          >
            <Mail className="w-4 h-4 mr-2" />
            Join Waitlist
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
