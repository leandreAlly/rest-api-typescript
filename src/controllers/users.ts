import express from "express";
import { deleteUserById, getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  const users = await getUsers();

  return res.status(200).json(users);
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const deletedUser = await deleteUserById(id);

  return res
    .status(200)
    .json({ deletedUser, message: "User deleted successfull." });
};
