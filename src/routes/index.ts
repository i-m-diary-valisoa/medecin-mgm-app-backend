import { Router } from 'express';
import authRoutes from './auth.routes';
import medecinRoutes from './medecin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/medecins', medecinRoutes);

export default router;
