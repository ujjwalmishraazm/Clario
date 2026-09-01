import { config } from "dotenv";
import { Pool } from "pg";

config({ path: ".env.local" });

async function main() {
  console.log("Testing pg Pool connection...");

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const result = await pool.query("SELECT NOW()");

    console.log("Pool connected successfully.");
    console.log("Database time:", result.rows[0]);

    const client = await pool.connect();

    console.log("Pool client acquired successfully.");

    const result2 = await client.query("SELECT COUNT(*) FROM \"User\"");

    console.log("User count:", result2.rows[0]);

    client.release();

    console.log("Pool client released successfully.");
  } catch (error) {
    console.error("Pool test failed:");
    console.error(error);
  } finally {
    await pool.end();
  }
}

main();