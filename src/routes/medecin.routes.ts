import { Router } from 'express';
import * as medecinController from '../controllers/medecin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { z } from 'zod';

const router = Router();

const medecinSchema = z.object({
  body: z.object({
    nom: z.string().min(2, 'Le nom est requis et doit contenir au moins 2 caractères'),
    dateNais: z.string().datetime().optional().or(z.date().optional()),
    photo: z.string().optional(),
  }),
});

// Protéger toutes les routes médecins avec JWT
router.use(authMiddleware);

router.get('/search', medecinController.searchMedecins);
router.get('/', medecinController.getMedecins);
router.get('/:id', medecinController.getMedecinById);
router.post('/', validate(medecinSchema), medecinController.createMedecin);
router.put('/:id', validate(medecinSchema), medecinController.updateMedecin);
router.delete('/:id', medecinController.deleteMedecin);

export default router;
