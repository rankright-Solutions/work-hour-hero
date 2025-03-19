
import React, { useState, useCallback } from "react";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import TimeEntryRow from "./TimeEntryRow";
import ResultDisplay from "./ResultDisplay";
import { toast } from "sonner";

interface TimeEntry {
  id: string;
  startTime: string;
  endTime: string;
}

const HourCalculator: React.FC = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { id: uuidv4(), startTime: "09:00", endTime: "17:00" },
  ]);

  const [totalHours, setTotalHours] = useState(8);
  const [totalMinutes, setTotalMinutes] = useState(0);

  const addTimeEntry = () => {
    const newEntry = {
      id: uuidv4(),
      startTime: "09:00",
      endTime: "17:00",
    };
    setTimeEntries([...timeEntries, newEntry]);
    toast.success("Added new time entry");
  };

  const updateTimeEntry = useCallback((id: string, startTime: string, endTime: string) => {
    setTimeEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, startTime, endTime } : entry
      )
    );
    calculateTotalTime();
  }, []);

  const removeTimeEntry = (id: string) => {
    if (timeEntries.length === 1) {
      toast.error("Cannot remove the last time entry");
      return;
    }
    
    setTimeEntries((prev) => prev.filter((entry) => entry.id !== id));
    toast.success("Removed time entry");
  };

  const calculateTotalTime = useCallback(() => {
    let totalMinutes = 0;

    timeEntries.forEach((entry) => {
      // Parse times
      const [startHour, startMinute] = entry.startTime.split(":").map(Number);
      const [endHour, endMinute] = entry.endTime.split(":").map(Number);

      // Convert to minutes
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;

      // Calculate difference
      let diff = endTotalMinutes - startTotalMinutes;
      if (diff < 0) diff += 24 * 60; // Handle crossing midnight

      totalMinutes += diff;
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setTotalHours(hours);
    setTotalMinutes(minutes);
  }, [timeEntries]);

  // Call calculateTotalTime whenever timeEntries change
  React.useEffect(() => {
    calculateTotalTime();
  }, [timeEntries, calculateTotalTime]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8 animate-slide-down">
        <h1 className="text-3xl font-bold text-center mb-2">Work Hour Calculator</h1>
        <p className="text-center text-muted-foreground">
          Track and calculate your working hours easily
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft mb-8 animate-fade-in">
        <div className="space-y-4">
          {timeEntries.map((entry) => (
            <TimeEntryRow
              key={entry.id}
              id={entry.id}
              startTime={entry.startTime}
              endTime={entry.endTime}
              onUpdate={updateTimeEntry}
              onRemove={removeTimeEntry}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            onClick={addTimeEntry}
            className="button-outline group"
          >
            <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Add Time Entry
          </button>
        </div>
      </div>

      <ResultDisplay totalHours={totalHours} totalMinutes={totalMinutes} />

      <div className="mt-8 text-center text-sm text-muted-foreground animate-fade-in">
        <p>Powered by <a href="https://stundenrechner.org/" className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">stundenrechner.org</a></p>
      </div>
    </div>
  );
};

export default HourCalculator;
