import express from "express";
import { getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  const users = await getUsers();

  return res.status(200).json(users);
};
