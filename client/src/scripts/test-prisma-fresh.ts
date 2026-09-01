import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

config({ path: ".env.local" });

async function main() {
  console.log("Testing fresh PrismaClient + PrismaPg...");

  const adapter = new PrismaPg(process.env.DATABASE_URL!);

  const prisma = new PrismaClient({
    adapter,
  });

  try {
    console.log("Running simple query...");

    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
      },
    });

    console.log("Simple query succeeded:", user);

    console.log("Running transaction...");

    const result = await prisma.$transaction(async (tx) => {
      const count = await tx.video.count();

      return count;
    });

    console.log("Transaction succeeded.");
    console.log("Video count:", result);
  } catch (error) {
    console.error("Fresh PrismaClient test failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();