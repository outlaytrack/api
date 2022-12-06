import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Housing rent' },
  { name: 'Electricity' },
  { name: 'Water' },
  { name: 'Air Conditioning' },
];

async function main() {
  await prisma.category.createMany({
    data: categories,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
