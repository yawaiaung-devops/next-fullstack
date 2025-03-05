import { encryptData } from "@/utils/encrypt";
import { generateToken } from "@/utils/jwt";
import { Prisma, PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { handleResp } from "./login/route";

export type ResponseData = {
  message: string;
};

const prisma = new PrismaClient();

export async function GET() {
  return NextResponse.json({
    message: "hello world",
  });
}

/** USER CREATE */
export async function POST(req: NextRequest) {
  const data: Prisma.UserCreateInput = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      const encryptedPassword = await encryptData(data.password);

      const user = await prisma.user.create({
        data: {
          userName: data.userName,
          email: data.email,
          createdBy: data.createdBy,
          password: encryptedPassword,
        },
      });

      const userPayload = {
        email: user.email,
        name: user.userName,
        id: user.id,
      };
      const token = await generateToken(userPayload);

      const cookie = await cookies();

      cookie.set("auth", token, {
        expires: Date.now() + 7 * 24 * 3600,
      });

      cookie.set("login_user", JSON.stringify(userPayload));

      return handleResp(
        201,
        "user created successfully",
        "user created successfully",
        user
      );
    }

    return handleResp(400, "user already exists", "user already exists", null);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message as string);
  }
}
