import mongoose, { Schema, Document } from 'mongoose';

interface IPerson extends Document {
  id: string;
  name: string;
  entryGate: string;
  exitGate?: string;
  entryDate: string;
  entryTime: string;
  exitDate?: string;
  exitTime?: string;
}

const PersonSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  entryGate: { type: String, required: true },
  exitGate: { type: String },
  entryDate: { type: String, required: true },
  entryTime: { type: String, required: true },
  exitDate: { type: String },
  exitTime: { type: String },
});

export default mongoose.model<IPerson>('Person', PersonSchema);