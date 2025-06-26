export type Exercise = {
    name: string;
    sets: number;
    reps: number | string;
    weight: number | null;
    otherWorkouts: string | null;
    RPE: number | null;
  };
  
  export type Session = {
    day: string;
    name: string;
    completed: boolean;
    exercises: Exercise[];
  };
  
  export type Feedback = {
    difficulty: string;
    injuries: string[];
    notes: string;
  };
  
  export type Week = {
    week: number;
    completedSessions: number;
    weekSubmitted: boolean;
    feedback: Feedback;
    sessions: Session[];
  };
  
  export type WorkoutHistory = {
    userId: string;
    weeks: Week[];
  };
  