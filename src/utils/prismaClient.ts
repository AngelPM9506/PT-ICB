/* eslint-disable prefer-const */
import { PrismaClient } from "@prisma/client";
const { NODE_ENV } = process.env;

let prismaClient: PrismaClient;

if (NODE_ENV === 'production') {
    prismaClient = new PrismaClient({
        errorFormat: 'colorless'
    });
} else {
    let globalWithPrisma = global as typeof globalThis & {
        prisma: PrismaClient
    };
    if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient({
            errorFormat: 'colorless'
        })
    }
    prismaClient = globalWithPrisma.prisma;
}

export default prismaClient;