import { PrismaClient } from "@prisma/client";

// Ensure single PrismaClient instance across hot-reloads in dev
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    // Lazy instantiate to allow consumers to catch initialization errors
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

export default getPrisma;
