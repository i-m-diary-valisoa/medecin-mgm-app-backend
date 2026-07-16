import { Request, Response, NextFunction } from 'express';
import * as medecinService from '../services/medecin.service';

const mapMedecin = (m: any) => ({
  id: m.idmed.toString(),
  nom: m.nom,
  dateNaissance: m.dateNais,
  photo: m.photo,
  createdAt: m.createdAt,
  updatedAt: m.updatedAt,
});

export const createMedecin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = { ...req.body };
    
    // Si un fichier a été uploadé, construire l'URL de la photo
    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`;
    }

    // Si dateNais ou dateNaissance est fournie sous forme de string, on la convertit en Date
    if (data.dateNaissance) {
      data.dateNais = new Date(data.dateNaissance);
      delete data.dateNaissance;
    }
    if (data.dateNais) {
      data.dateNais = new Date(data.dateNais);
    }
    const medecin = await medecinService.createMedecin(data);
    res.status(201).json(mapMedecin(medecin));
  } catch (error) {
    next(error);
  }
};

export const getMedecins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const medecins = await medecinService.getAllMedecins();
    res.json(medecins.map(mapMedecin));
  } catch (error) {
    next(error);
  }
};

export const getMedecinById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const medecin = await medecinService.getMedecinById(Number(req.params.id));
    if (!medecin) {
      return res.status(404).json({ message: 'Médecin introuvable' });
    }
    res.json(mapMedecin(medecin));
  } catch (error) {
    next(error);
  }
};

export const updateMedecin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = { ...req.body };
    
    // Si un fichier a été uploadé, construire l'URL de la photo
    if (req.file) {
      data.photo = `/uploads/${req.file.filename}`;
    }

    if (data.dateNaissance) {
      data.dateNais = new Date(data.dateNaissance);
      delete data.dateNaissance;
    }
    if (data.dateNais) {
      data.dateNais = new Date(data.dateNais);
    }
    const medecin = await medecinService.updateMedecin(Number(req.params.id), data);
    res.json(mapMedecin(medecin));
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Médecin introuvable' });
    }
    next(error);
  }
};

export const deleteMedecin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await medecinService.deleteMedecin(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Médecin introuvable' });
    }
    next(error);
  }
};

export const searchMedecins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const q = req.query.q as string;
    if (!q) {
      return res.status(400).json({ message: 'Le paramètre de recherche q est requis' });
    }
    const medecins = await medecinService.searchMedecins(q);
    res.json(medecins.map(mapMedecin));
  } catch (error) {
    next(error);
  }
};
