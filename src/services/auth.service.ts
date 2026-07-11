import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/db';
import { env } from '../config/env';

export const registerUser = async (data: any) => {
  const { email, password, nom } = data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Un utilisateur avec cet email existe déjà');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nom,
    },
  });

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return { user: { id: user.id, email: user.email, nom: user.nom }, token };
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Identifiants invalides');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Identifiants invalides');
  }

  const token = jwt.sign({ id: user.id }, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return { user: { id: user.id, email: user.email, nom: user.nom }, token };
};
