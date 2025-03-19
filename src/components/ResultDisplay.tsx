
import React from "react";
import { Clock } from "lucide-react";

interface ResultDisplayProps {
  totalHours: number;
  totalMinutes: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  totalHours,
  totalMinutes,
}) => {
  const formatTime = () => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round(totalMinutes);
    
    return `${hours} hours ${minutes} minutes`;
  };

  const formattedDecimal = () => {
    const decimal = totalHours + totalMinutes / 60;
    return decimal.toFixed(2);
  };

  return (
    <div className="result-card animate-slide-up">
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <Clock className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-xl font-medium">Working Time</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex flex-col items-center">
          <p className="text-muted-foreground text-sm">Total Time</p>
          <p className="text-3xl font-bold">{formatTime()}</p>
        </div>
        
        <div className="flex flex-col items-center pt-2 border-t border-border">
          <p className="text-muted-foreground text-sm">Decimal Format</p>
          <p className="text-2xl font-medium">{formattedDecimal()} hours</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
