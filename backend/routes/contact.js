import express from 'express';
import { 
  submitContactForm, 
  getContactMessages, 
  getContactMessage, 
  updateContactStatus, 
  deleteContactMessage 
} from '../controllers/contact.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContactForm);
router.get('/', protect, authorize('admin'), getContactMessages);
router.get('/:id', protect, authorize('admin'), getContactMessage);
router.put('/:id', protect, authorize('admin'), updateContactStatus);
router.delete('/:id', protect, authorize('admin'), deleteContactMessage);

export default router; 