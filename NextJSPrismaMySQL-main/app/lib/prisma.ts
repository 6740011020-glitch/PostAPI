import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "myprisma",
  connectionLimit: 10,
  waitForConnections: true,
  connectionTimeoutMillis: 20000,
});

export const prisma = new PrismaClient({ adapter });