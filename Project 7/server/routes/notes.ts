import { publicProcedure, router } from '../trpc';
import { NoteModel } from '../models/note';
import { z } from 'zod';

const getNotes = publicProcedure.query(async () => {
  const notes = await NoteModel.find();
  return notes;
});

const getOneNote = publicProcedure.input(z.string()).query(async (opts) => {
  const notes = await NoteModel.findById(opts.input);
  return notes;
});

const createNote = publicProcedure
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .mutation(async ({ input: { title, description } }) => {
    const newNote = new NoteModel({ title, description });
    const savedNote = await newNote.save();
    return savedNote;
  });

const deleteNote = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input: { id } }) => {
    try {
      const deletedTask = await NoteModel.findByIdAndDelete(id);
      if (!deletedTask) {
        throw new Error('Note not found');
      }
      return true;
    } catch (error) {
      //console.error(error);
      return false;
    }
  });

const toggleDone = publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ input: { id } }) => {
    try {
      const foundNote = await NoteModel.findById(id);
      if (!foundNote) {
        throw new Error('Note not found');
      }
      foundNote.done = !foundNote.done;
      await foundNote.save();
      return true;
    } catch (error) {
      //console.error(error);
      return false;
    }
  });

export const notesRouter = router({
  create: createNote,
  delete: deleteNote,
  getAll: getNotes,
  getOne: getOneNote,
  toggleDone,
});
