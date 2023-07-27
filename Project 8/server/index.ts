import { listen } from './app';
import { dbConnect } from './db';
import { PORT_TRPC } from './config';

dbConnect();
listen(PORT_TRPC as number);
console.log(`Server is running on port ${PORT_TRPC}`);
