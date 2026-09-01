import pg from "pg";

const BASELINE_MIGRATION_NAME = "20260831_190822";

async function main() {
  const connectionString = process.env.DATABASE_URI;

  if (!connectionString) {
    throw new Error("DATABASE_URI must be configured before marking migrations");
  }

  const client = new pg.Client({ connectionString });

  await client.connect();

  try {
    const devSchema = await client.query<{ exists: boolean }>(
      `select exists (
        select 1
        from payload_migrations
        where batch = -1
      )`,
    );

    if (!devSchema.rows[0]?.exists) {
      console.log("No Payload dev schema marker found.");
      return;
    }

    const baseline = await client.query<{ exists: boolean }>(
      `select exists (
        select 1
        from payload_migrations
        where name = $1
      )`,
      [BASELINE_MIGRATION_NAME],
    );

    if (baseline.rows[0]?.exists) {
      console.log("Baseline migration is already marked as applied.");
      return;
    }

    await client.query(
      `insert into payload_migrations (name, batch, created_at, updated_at)
       values ($1, 1, now(), now())`,
      [BASELINE_MIGRATION_NAME],
    );

    console.log("Marked existing Payload dev schema as baseline migration.");
  } catch (error) {
    if (
      error instanceof Error &&
      /relation "payload_migrations" does not exist/i.test(error.message)
    ) {
      console.log("No migration table found; baseline migration will run.");
      return;
    }

    throw error;
  } finally {
    await client.end();
  }
}

await main();
