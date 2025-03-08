import { cookies } from "next/headers";
import { handleResp } from "../../auth/login/route";
import { NextRequest } from "next/server";
import { verifyToken } from "@/utils/jwt";
import { prisma } from "../../auth/route";
import { JWTPayload } from "@/types/jwt";

export async function GET() {
  const token = (await cookies()).get("auth");

  if (!token) {
    return handleResp(403, "UnAuthorized", "Your token is invalid", null);
  }
  const count = await prisma.role.count();
  const roles = await prisma.role.findMany();
  return handleResp(200, "Success", "get Role successfully", {
    count,
    roles,
  });
}

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
