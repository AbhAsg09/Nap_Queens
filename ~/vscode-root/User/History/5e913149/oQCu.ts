import mongoose, { Schema, Document } from 'mongoose';

interface IPerson extends Document {
  id: string;
  name: string;
  entryGate: string;
  exitGate?: string;
  timestamp: Date;
}

const PersonSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  entryGate: { type: String, required: true },
  exitGate: { type: String },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IPerson>('Person', PersonSchema);
