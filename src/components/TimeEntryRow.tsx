
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TimeEntryRowProps {
  id: string;
  startTime: string;
  endTime: string;
  onUpdate: (id: string, startTime: string, endTime: string) => void;
  onRemove: (id: string) => void;
}

const TimeEntryRow: React.FC<TimeEntryRowProps> = ({
  id,
  startTime,
  endTime,
  onUpdate,
  onRemove,
}) => {
  const [start, setStart] = useState(startTime);
  const [end, setEnd] = useState(endTime);

  useEffect(() => {
    onUpdate(id, start, end);
  }, [start, end, id, onUpdate]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4 animate-slide-up opacity-0 animation-delay-[100ms] animation-fill-mode-forwards">
      <div className="time-input-wrapper flex-1">
        <label htmlFor={`start-${id}`} className="time-input-label">
          Start Time
        </label>
        <input
          id={`start-${id}`}
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="time-input"
        />
      </div>

      <div className="time-input-wrapper flex-1">
        <label htmlFor={`end-${id}`} className="time-input-label">
          End Time
        </label>
        <input
          id={`end-${id}`}
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="time-input"
        />
        <button 
          className="remove-button"
          onClick={() => onRemove(id)}
          aria-label="Remove time entry"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default TimeEntryRow;
