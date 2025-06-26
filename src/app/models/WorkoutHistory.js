import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: Number,
    reps: { type: mongoose.Schema.Types.Mixed }, // allow number or string (e.g., "30s")
    weight: Number,                     // nullable
    otherWorkouts: String,
    RPE: Number,                       // Rate of Perceived Exertion, optional
  });
  
  const SessionSchema = new mongoose.Schema({
    day: String,
    name: String,
    exercises: [ExerciseSchema],
    completed: Boolean,
  });
  
  const FeedbackSchema = new mongoose.Schema({
    difficulty: String,
    injuries: [String],
    notes: String,
  });
  
  const WeekSchema = new mongoose.Schema({
    week: Number,
    completedSessions: Number,
    weekSubmitted: { type: Boolean, default: false },
    feedback: FeedbackSchema,
    sessions: [SessionSchema],
  });
  
  const WorkoutHistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    weeks: [WeekSchema],
    createdAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.models.WorkoutHistory || mongoose.model('WorkoutHistory', WorkoutHistorySchema);
  
  