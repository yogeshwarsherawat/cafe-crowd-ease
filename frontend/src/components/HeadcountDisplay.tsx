import { useState, useEffect } from "react";
import { Coffee, Users, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchHeadcount } from "@/api/mockApi";


const HeadcountDisplay = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateHeadcount = async () => {
      const headcount = await fetchHeadcount();
      setCount(headcount);
      setIsLoading(false);
    };

    updateHeadcount();
    const interval = setInterval(updateHeadcount, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto p-8">
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <Coffee className="w-12 h-12 text-cafe-purple animate-float" />
      </div>
      
      <div className="backdrop-blur-sm bg-white/30 rounded-2xl p-8 shadow-lg border border-white/20">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-wider text-cafe-purpleDark font-medium">Current Occupancy</h2>
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-6 h-6 text-cafe-purple" />
              <span className={cn(
                "text-6xl font-bold bg-clip-text text-transparent",
                "bg-gradient-to-r from-cafe-purple to-cafe-purpleDark",
                isLoading && "animate-pulse"
              )}>
                {isLoading ? "..." : count}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-cafe-purpleDark text-lg">
              {count >= 80 ? "Pretty busy right now!" : 
               count >= 50 ? "Moderately occupied" : 
               "Perfect time to visit!"}
            </p>
            <p className="text-sm text-cafe-purpleDark/80">
              Plan your visit to enjoy a relaxed meal!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadcountDisplay;