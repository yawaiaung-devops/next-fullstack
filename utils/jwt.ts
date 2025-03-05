import { JWTPayload, SignJWT } from "jose";

/**
 * Generates a JWT token with the provided payload and secret key
 * @param {Object} payload - The data you want to encode in the token
 * @param {string} secretKey - The secret key to sign the token
 * @param {string} [issuer] - Optional: The issuer claim for the JWT
 * @param {string} [audience] - Optional: The audience claim for the JWT
 * @returns {string} - The generated JWT token
 */

const generateToken = async <T extends JWTPayload>(
  payload: T
): Promise<string> => {
    const iat = Math.floor(Date.now() / 1000);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .setIssuedAt(iat)
    .setIssuer("testing")
    .setAudience("testing")
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));

  return token;
};
export { generateToken };
