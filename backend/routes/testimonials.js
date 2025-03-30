import express from 'express';
import { 
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial
} from '../controllers/testimonials.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getTestimonials)
  .post(protect, createTestimonial);

router.route('/:id')
  .get(getTestimonial)
  .put(protect, updateTestimonial)
  .delete(protect, authorize('admin'), deleteTestimonial);

router.route('/:id/approve')
  .put(protect, authorize('admin'), approveTestimonial);

export default router; 