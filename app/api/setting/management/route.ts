import { cookies } from "next/headers";
import { handleResp } from "../../auth/login/route";

export async function GET() {
  const token = (await cookies()).get("auth");

  if(!token) {
    return handleResp(403, "UnAuthorized", "Your token is invalid", null);
  }
  return handleResp(200, "Success", "Success", {
    message: "management route",
  });
}
