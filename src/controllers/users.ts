import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users";

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

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) return res.status(400).json({ message: "Bad request" });

    const user = await getUserById(id);

    if (!user) return res.status(400).json({ message: "Invalid user" });

    user.username = username;
    await user.save();

    res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
