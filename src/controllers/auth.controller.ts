import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === 'Un utilisateur avec cet email existe déjà') {
      res.status(409).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Identifiants invalides') {
      res.status(401).json({ message: error.message });
    } else {
      next(error);
    }
  }
};
