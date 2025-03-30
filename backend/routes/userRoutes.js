import express from 'express';
import { 
  getUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/users.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Admin routes - use adminAuth directly
router.get('/', adminAuth, getUsers);
router.post('/', adminAuth, createUser);
router.get('/:id', adminAuth, getUser);
router.put('/:id', adminAuth, updateUser);
router.delete('/:id', adminAuth, deleteUser);

export default router; 