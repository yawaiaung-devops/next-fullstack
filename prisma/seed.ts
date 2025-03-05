import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  {
    email: "superadmin@example.com",
    userName: "superadmin",
    password:"@dminP@ssword", // Replace with a real hashed password
    isLocked: false,
    loginAttempts: 0,
    loginAt: new Date(),
    isOnline: false,
    loginDevice: "Chrome",
    createdAt: new Date(),
    createdBy: "admin",
    updatedAt: new Date(),
    updatedBy: "admin",
    isActive: true,
  },
];

async function seed() {
  const salt = await bcrypt.genSaltSync(10);
  await prisma.$connect();
  users.map(async(user) => {
    await prisma.user.create({
      data:{
        ...user,
        password:await bcrypt.hash(user.password, salt)
      }
    })
  })

  console.log("Seed data created");
}
seed()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
