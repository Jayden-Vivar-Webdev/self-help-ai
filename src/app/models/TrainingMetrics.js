import mongoose from 'mongoose';

const TrainingMetricsSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },  // Firebase UID
  blockNumber: { type: Number, required: true },          // e.g., 1, 2, 3...
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  totalSessionsPlanned: Number,
  totalSessionsCompleted: Number,
  adherenceRate: Number, // percentage

  totalVolume: Number,   // total weight lifted across all exercises
  averageRPE: Number,    // 1–10 difficulty scale

  topExercises: [{
    name: String,
    averageWeight: Number,
    highestWeight: Number,
    frequency: Number,
  }],

  injuriesReported: [String],
  notes: String,

  createdAt: { type: Date, default: Date.now }
});

const TrainingMetrics =
  mongoose.models?.TrainingMetrics ||
  mongoose.model('TrainingMetrics', TrainingMetricsSchema);

export default TrainingMetrics;
