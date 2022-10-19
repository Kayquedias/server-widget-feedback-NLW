import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ 
  log: ['query'],
});
// Qualquer query (Operações como: INSERT, DELETE) que o prisma faça, ele irá mostrar no console