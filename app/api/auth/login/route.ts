import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { isMatched } from "@/utils/encrypt";
import { generateToken } from "@/utils/jwt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const user = await prisma.user.findFirst({
      include: {
        role: true,
      },
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return handleResp(
        404,
        "Not found",
        "your email is not registered yet",
        null
      );
    }

    const isMatch = await isMatched(data.password, user.password);

    if (!isMatch) {
      return handleResp(401, "Authorized", "Invalid credentails", null);
    }

    const userPayload = {
      email: user.email,
      name: user.userName,
      id: user.id,
      role: user.role.roleName,
    };

    const token = await generateToken(userPayload);

    const cookie = await cookies();

    cookie.set("auth", token);
    cookie.set("login_user", JSON.stringify(userPayload));

    return handleResp(
      200,
      "user login successfully",
      "user login successfully",
      user
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) throw new Error(error.message as string);
  }
}

export const handleResp = <T>(
  status: number,
  statusText: string,
  message: string,
  data: T
) => {
  return new Response(
    JSON.stringify({
      message,
      data,
    }),
    {
      status,
      statusText,
    }
  );
};
