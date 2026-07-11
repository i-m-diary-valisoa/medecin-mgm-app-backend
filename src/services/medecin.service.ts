import { prisma } from '../config/db';
import { Prisma } from '@prisma/client';

export const createMedecin = async (data: Prisma.MedecinCreateInput) => {
  return await prisma.medecin.create({
    data,
  });
};

export const getAllMedecins = async () => {
  return await prisma.medecin.findMany({
    orderBy: { nom: 'asc' },
  });
};

export const getMedecinById = async (id: number) => {
  return await prisma.medecin.findUnique({
    where: { idmed: id },
  });
};

export const updateMedecin = async (id: number, data: Prisma.MedecinUpdateInput) => {
  return await prisma.medecin.update({
    where: { idmed: id },
    data,
  });
};

export const deleteMedecin = async (id: number) => {
  return await prisma.medecin.delete({
    where: { idmed: id },
  });
};

export const searchMedecins = async (query: string) => {
  return await prisma.medecin.findMany({
    where: {
      nom: {
        contains: query,
        mode: 'insensitive',
      },
    },
    orderBy: { nom: 'asc' },
  });
};
