import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../db/users";

export const isOwner = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    // console.log(get(req, "identity"));
    const currentUserId = get(req, "identity._id") as string;

    if (!currentUserId) return res.sendStatus(403);

    if (currentUserId.toString() !== id) return res.sendStatus(403);
    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went wrong." });
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["ALLY-REST-API"];

    if (!sessionToken)
      return res.status(403).json({ message: "Please log in." });

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) return res.status(403).json({ message: "Invalid user" });

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "something went wrong" });
  }
};
