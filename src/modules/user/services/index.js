import bcrypt from "bcrypt";
import model from "#@/modules/user/model/index.js";
import baseServicesFactory from "#@/modules/_shared/base-services.js";

const SALT_ROUNDS = 10;

async function createOne({ payload }) {
  const { name, email, password, role = "user", status = "active" } = payload;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await model.create({
    name,
    email,
    password: hashedPassword,
    role,
    status,
  });

  return user;
}

async function updateById({ id, payload }) {
  const updateData = { ...payload };

  // If password is being updated, hash it
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, SALT_ROUNDS);
  }

  const updatedUser = await model.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
}

export default {
  ...baseServicesFactory(model),
  createOne, // Override the base createOne with our custom implementation
  updateById, // Override the base updateById to handle password hashing
};
