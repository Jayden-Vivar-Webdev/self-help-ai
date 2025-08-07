import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: String,
  email: { type: String, required: true, unique: true },
  photoURL: String,
  age: Number,
  height_cm: Number,
  weight_kg: Number,
  goal: String,                  // e.g., 'fat_loss'
  experience_level: String,      // e.g., 'intermediate'
  equipment: [String],           // e.g., ['dumbbells', 'bodyweight']
  workouts_per_week: Number,
  injuries: [String],
  healthConditions: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models?.User || mongoose.model('User', UserSchema);
export default User;

