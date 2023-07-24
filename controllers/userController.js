import User from "../models/User.js";
import Note from "../models/Note.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

/**
 * @dec get all users
 * @route /users
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
});

/**
 * @dec post create users
 * @route /users
 */
const createUser = asyncHandler(async (req, res) => {});

/**
 * @dec put update users
 * @route /users
 */
const updateUser = asyncHandler(async (req, res) => {});

/**
 * @dec delete delete users
 * @route /users
 */
const deleteUser = asyncHandler(async (req, res) => {});

export { getAllUsers, updateUser, deleteUser, createUser };
