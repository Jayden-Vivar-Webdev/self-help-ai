import mongoose from 'mongoose';


/**
 * WorkoutHistory Schema (represents a single week of workout data for a user)
 *
 * Fields:
 * - userId:       (String) ID of the user this week belongs to (required)
 * - week:         (Number) Week number (e.g., 1, 2, 3...)
 * - completedSessions: (Number) Total number of completed sessions this week
 * - weekSubmitted:      (Boolean) Whether the week was submitted (e.g., for review or locked in) - default is false
 * - feedback:     (Object) User feedback for the week
 *    - difficulty: (String) Perceived difficulty level (e.g., "Easy", "Hard")
 *    - injuries:   ([String]) Any injuries reported during the week
 *    - notes:      (String) Additional comments or reflections
 * - sessions:     ([Object]) Array of workout sessions completed/planned during the week
 *    - day:        (String) The day of the session (e.g., "Monday")
 *    - name:       (String) Name of the session (e.g., "Push Day", "Cardio")
 *    - completed:  (Boolean) Whether the session was completed
 *    - exercises:  ([Object]) Exercises performed in the session
 *        - name:          (String) Name of the exercise (e.g., "Squat")
 *        - sets:          (Number) Number of sets
 *        - reps:          (Mixed) Reps (can be a number or a string like "30s")
 *        - weight:        (Number) Optional weight used
 *        - otherWorkouts: (String) Notes about other workouts done
 *        - RPE:           (Number) Rate of Perceived Exertion (e.g., 1-10 scale)
 * - createdAt:    (Date) Timestamp when the week entry was created (default is now)
 *
 * This schema is used to store one week of training data per document.
 * Multiple documents can be created for the same user across different weeks.
 */



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
    userId: { type: String, require: true},
    week: Number,
    completedSessions: Number,
    weekSubmitted: { type: Boolean, default: false },
    feedback: FeedbackSchema,
    sessions: [SessionSchema],
    createdAt: { type: Date, default: Date.now },
  });

  
  export default mongoose.models.WorkoutHistory || mongoose.model('WorkoutHistory', WeekSchema);
  
  