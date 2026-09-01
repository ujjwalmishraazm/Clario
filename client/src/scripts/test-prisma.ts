import { prisma } from "@/lib/prisma";
import { config } from "dotenv";

config({ path: ".env.local" });



async function main() {
  console.log("Testing Prisma connection...");

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      email: true,
    },
  });

  console.log("Simple query:", user);

  console.log("Testing transaction...");

  const result = await prisma.$transaction(async (tx) => {
    const count = await tx.video.count();
    return count;
  });

  console.log("Transaction succeeded. Video count:", result);
}

main()
  .catch((error) => {
    console.error("Prisma test failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });