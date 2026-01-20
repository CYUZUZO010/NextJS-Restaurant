
import { PrismaClient } from "@prisma/client";

// Ensure single PrismaClient instance across hot-reloads in dev
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

export default getPrisma;
