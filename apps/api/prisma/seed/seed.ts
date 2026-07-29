import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ---------- Hotel & Branch ----------
  const hotel = await prisma.hotel.upsert({
    where: { slug: "heroy-hotel" },
    update: {},
    create: {
      name: "Heroy Hotel",
      slug: "heroy-hotel",
    },
  });

  const branch = await prisma.branch.create({
    data: {
      hotelId: hotel.id,
      name: "Heroy Hotel - Addis Ababa",
      address: "Bole Road, Addis Ababa",
      city: "Addis Ababa",
      country: "Ethiopia",
      phone: "+251911000000",
      email: "reservations@heroyhotel.com",
      latitude: 8.9931,
      longitude: 38.7936,
    },
  });

  console.log(`Created hotel "${hotel.name}" and branch "${branch.name}"`);

  // ---------- Room Types ----------
  const roomTypesData = [
    {
      name: "Standard Room",
      description: "Comfortable and stylish, perfect for solo travelers or couples.",
      basePrice: 120,
      maxOccupancy: 2,
      amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Fridge"],
      imageUrls: [],
    },
    {
      name: "Deluxe Room",
      description: "Spacious room with a city view and premium furnishings.",
      basePrice: 220,
      maxOccupancy: 3,
      amenities: ["Free Wi-Fi", "City View", "Breakfast Included", "Rain Shower", "Mini Bar"],
      imageUrls: [],
    },
    {
      name: "Executive Suite",
      description: "A luxurious suite with a separate living area and premium amenities.",
      basePrice: 350,
      maxOccupancy: 4,
      amenities: ["Free Wi-Fi", "Living Area", "Late Check-out", "Bathtub", "Nespresso Machine"],
      imageUrls: [],
    },
    {
      name: "Family Room",
      description: "Extra space designed for families with children.",
      basePrice: 280,
      maxOccupancy: 5,
      amenities: ["Free Wi-Fi", "Two Bedrooms", "Kids Amenities", "Extra Beds Available"],
      imageUrls: [],
    },
    {
      name: "Presidential Suite",
      description: "Our finest suite with a private terrace and butler service.",
      basePrice: 480,
      maxOccupancy: 4,
      amenities: ["Private Terrace", "Personal Butler", "Airport Transfer", "VIP Lounge Access", "Jacuzzi"],
      imageUrls: [],
    },
  ];

  const roomTypes = [];
  for (const rt of roomTypesData) {
    const roomType = await prisma.roomType.create({ data: rt });
    roomTypes.push(roomType);
  }

  console.log(`Created ${roomTypes.length} room types`);

  // ---------- Rooms ----------
  // Distribute rooms across 4 floors, cycling through room types
  let roomCount = 0;
  const floors = 4;
  const roomsPerFloor = 6;

  for (let floor = 1; floor <= floors; floor++) {
    for (let i = 1; i <= roomsPerFloor; i++) {
      const roomType = roomTypes[(floor + i) % roomTypes.length];
      const number = `${floor}${String(i).padStart(2, "0")}`;

      await prisma.room.create({
        data: {
          branchId: branch.id,
          roomTypeId: roomType.id,
          number,
          floor,
          status: "AVAILABLE",
        },
      });
      roomCount++;
    }
  }

  console.log(`Created ${roomCount} rooms across ${floors} floors`);

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });