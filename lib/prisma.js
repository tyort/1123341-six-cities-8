// import { PrismaClient } from '@prisma/client';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

// eslint-disable-next-line import/no-mutable-exports
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
