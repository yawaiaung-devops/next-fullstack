import { handleResp } from "@/app/api/auth/login/route";
import { prisma } from "@/app/api/auth/route";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/jwt";
import { JWTPayload } from "@/types/jwt";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // 'a', 'b', or 'c'

  return handleResp(200, "Success", "Success", id);
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const cookie = await cookies();
  const token = cookie.get("auth");

  try {
    if (!token) {
      return handleResp(403, "Unauthorized", "Unauthorized", null);
    }
    const userInfo: JWTPayload = await verifyToken(token.value);

    if (userInfo.payload.role !== "superadmin") {
      return handleResp(403, "Unauthorized", "Unauthorized", null);
    }
    const role = await prisma.role.findUnique({
      where: {
        id: +id,
      },
    });

    const data = await prisma.role.update({
      data: {
        status: !role?.status,
      },
      where: {
        id: +id,
      },
    });
    return handleResp(200, "Success", "Success", data);
  } catch (error) {
    throw new Error();
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const cookie = await cookies();
  const token = cookie.get("auth");

  try {
    if (!token) {
      return handleResp(403, "Unauthorized", "Unauthorized", null);
    }
    const userInfo: JWTPayload = await verifyToken(token.value);

    if (userInfo.payload.role !== "superadmin") {
      return handleResp(403, "Unauthorized", "Unauthorized", null);
    }

    await prisma.role.delete({
      where: { id: +id },
    });
    return handleResp(202, "Accepted", "Role deleted successfully", null);
  } catch (error) {
    throw new Error();
  }
}
