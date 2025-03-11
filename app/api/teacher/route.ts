import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { JWTPayload } from "@/types/jwt";
import { handleResp } from "../auth/login/route";
import { prisma } from "../auth/route";

export async function POST(req: NextRequest) {
  const {
    roleName,
  }: {
    roleName: string;
  } = await req.json();
  const cookie = await cookies();
  const token = cookie.get("auth");

  try {
    if (token) {
      const userInfo: JWTPayload = await verifyToken(token.value);

      const data = await prisma.role.create({
        data: {
          roleName,
          status: true,
          createdBy: userInfo.payload.role,
        },
      });

      return handleResp(200, "Success", "role created successfully", data);
    }
  } catch (error) {
    return handleResp(403, "forbidden", "role already exists.", {
      error,
    });
  }
}
