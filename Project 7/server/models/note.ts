import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const NoteModel = mongoose.model('Note', NoteSchema);
