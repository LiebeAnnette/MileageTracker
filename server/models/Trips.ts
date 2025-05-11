// --- server/models/Trip.ts ---
import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: { type: String, required: true },
  miles: { type: Number, required: true },
  date: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Trip', tripSchema);
