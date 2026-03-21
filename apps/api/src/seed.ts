import bcrypt from "bcryptjs";
import { User } from "./models/User";

export async function seedAdmin() {
  const exists = await User.findOne({ username: "admin" });
  if (exists) return;

  const hash = await bcrypt.hash("admin", 10);
  await User.create({ username: "admin", password: hash, role: "admin" });
  console.log("Usuário admin criado!");
}
