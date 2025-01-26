import HeadcountDisplay from "@/components/HeadcountDisplay";
import { Coffee, UtensilsCrossed } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cafe-purpleLight to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src="/lovable-uploads/d3300e84-635d-48cc-a4c7-e582f561aaa5.png" 
              alt="Logo" 
              className="w-8 h-8"
            />
            <h1 className="text-4xl font-bold text-cafe-purpleDark">
              CafeCrowdEase
            </h1>
            <Coffee className="w-8 h-8 text-cafe-purple" />
          </div>
          <p className="text-cafe-purpleDark">
            10th Floor Cafeteria at BLRPTP
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <HeadcountDisplay />
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-cafe-purple/10 text-cafe-purpleDark">
              <span className="w-2 h-2 rounded-full bg-cafe-purple animate-pulse" />
              <span className="text-sm">Live updates every 30 seconds</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;