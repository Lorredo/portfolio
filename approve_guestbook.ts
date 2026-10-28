import { db } from './src/lib/db';

async function main() {
  const pending = await db.guestbookEntry.findMany({
    where: { status: 'PENDING' }
  });
  
  if (pending.length === 0) {
    console.log("No pending entries.");
    return;
  }
  
  console.log(`Found ${pending.length} pending entries. Approving them...`);
  
  await db.guestbookEntry.updateMany({
    where: { status: 'PENDING' },
    data: { status: 'APPROVED' }
  });
  
  console.log("Done!");
}

main().catch(console.error).finally(() => process.exit(0));
