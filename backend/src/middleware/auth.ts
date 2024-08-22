import { auth } from "express-oauth2-jwt-bearer";

// This middleware will check the JWT token in the Authorization header of the request.
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});
