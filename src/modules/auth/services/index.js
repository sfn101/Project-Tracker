import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import model from "#@/modules/auth/model/index.js";

const SALT_ROUNDS = 10;

async function signup({ payload }) {
  const { name, email, password, role = "user" } = payload;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await model.create({
    name,
    email,
    password: hashedPassword,
    role,
    status: "active",
  });

  return user;
}

async function login({ payload }) {
  const { email, password } = payload;

  const user = await model.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user, token };
}

export default {
  signup,
  login,
};