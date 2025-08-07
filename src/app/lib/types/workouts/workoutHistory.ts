  
  export type Exercise = {
    _id: string;
    name: string;
    sets: number | null;
    reps: number | null;
    weight: number | null;
    otherWorkouts: string | null;
    RPE: number | null;
  }
  
  export type Session = {
    _id: string;
    day: string;
    name: string;
    exercises: Exercise[];
    completed: boolean;
  }
  
  export type Feedback = {
    _id: string;
    difficulty: string;
    injuries: string[];
    notes: string;
  }
  
  export type WorkoutWeek = {
    _id: string;
    userId: string;
    week: number;
    completedSessions: number;
    weekSubmitted: boolean;
    feedback: Feedback;
    sessions: Session[];
    createdAt: string;
    __v: number;
  }