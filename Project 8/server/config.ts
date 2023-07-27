import 'dotenv/config';

export const PORT_TRPC = parseInt(process.env.PORT_TRPC || '') || 3001;
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
