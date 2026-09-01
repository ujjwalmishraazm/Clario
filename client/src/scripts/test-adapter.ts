import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

config({ path: ".env.local" });

async function main() {
  console.log("Testing PrismaPg adapter...");

  const adapter = new PrismaPg(process.env.DATABASE_URL!);

  try {
    const connection = await adapter.connect();

    console.log("PrismaPg connected successfully.");

    const result = await connection.queryRaw({
      sql: 'SELECT NOW() AS "now"',
      args: [],
      argTypes: [],
    });

    console.log("Query result:", result);

    await connection.dispose();

    console.log("PrismaPg disposed successfully.");
  } catch (error) {
    console.error("PrismaPg test failed:");
    console.error(error);
  }
}

main();