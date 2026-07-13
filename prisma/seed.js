const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const contentEntries = [
    { key: 'heroHeading', value: 'Pidämme Suomen kodit lämpiminä ja energiatehokkaina.' },
    { key: 'heroBody', value: 'Kokeneet asentajat ja huolellisesti valitut ilmalämpöpumput sekä ilmavesilämpöpumput tekevät kodistasi miellyttävän ja tehokkaan.' },
    { key: 'companyName', value: 'Lämpökamu' },
    { key: 'companyEmail', value: 'info@lampokamu.fi' },
    { key: 'companyPhone', value: '+358 40 123 4567' },
    { key: 'companyAddress', value: 'Katu 12, 00100 Helsinki' },
  ];

  for (const entry of contentEntries) {
    await prisma.siteContent.upsert({
      where: { key: entry.key },
      update: { value: entry.value },
      create: { key: entry.key, value: entry.value },
    });
  }

  const products = [
    {
      name: 'Lämpökamu Air 7',
      type: 'Ilmalämpöpumppu',
      description: 'Tehokas ja hiljainen ratkaisu sisäilman mukavuuden parantamiseen.',
      price: 2490,
      heatingCapacity: '2,5–4,5 kW',
      scop: 4.2,
      imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
      isVisible: true,
    },
    {
      name: 'Lämpökamu Aqua 10',
      type: 'Ilmavesilämpöpumppu',
      description: 'Kestāvā ilmavesijärjestelmä, joka tarjoaa tasaisen lämmityksen koko taloon.',
      price: 4190,
      heatingCapacity: '6–10 kW',
      scop: 4.7,
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      isVisible: true,
    },
    {
      name: 'Lämpökamu Comfort 5',
      type: 'Ilmalämpöpumppu',
      description: 'Pieni ja tehokas laite, joka sopii erinomaisesti pientaloihin.',
      price: 1890,
      heatingCapacity: '2–3 kW',
      scop: 3.9,
      imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
      isVisible: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: (await prisma.product.findFirst({ where: { name: product.name } }))?.id ?? -1 },
      update: product,
      create: product,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
