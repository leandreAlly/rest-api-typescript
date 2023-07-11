import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    console.log("hit endpoint");
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).json({ message: "Invalid information" });

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return res.status(400).json({ message: "email already existed" });

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};
