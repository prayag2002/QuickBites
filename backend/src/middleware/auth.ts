import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"; // jwt is a library that will help us decode the JWT token
import User from "../models/user";
import { ExplainVerbosity } from "mongodb";

// in express, we can add new fields to the Request object or modify existing fields
declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

// This middleware will check the JWT token in the Authorization header of the request.
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE, // the audience is the identifier of the API
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL, // the issuerBaseURL is the URL of the Auth0 tenant
  tokenSigningAlg: "RS256", // the tokenSigningAlg is the algorithm used to sign the token
});

// This middleware will parse the JWT token and add the user id to the request object.
export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction // next is a function that will pass the request to the next middleware
) => {
  const { authorization } = req.headers;

  // check if the Authorization header is present and starts with "Bearer "
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1]; // extract the token from the header

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload; // decode the token, JwtPayload is the type of the decoded token
    const auth0Id = decoded.sub; // sub is the field in the token that contains the user id

    const user = await User.findOne({ auth0Id }); // find the user in the database

    if (!user) {
      return res.sendStatus(401);
    }

    //this should be after the user is found
    req.auth0Id = auth0Id as string; // add the auth0Id to the request object
    req.userId = user._id.toString(); // add the user id to the request object

    next(); // pass the request to the next middleware or controller
  } catch (error) {
    return res.sendStatus(401);
  }
};
