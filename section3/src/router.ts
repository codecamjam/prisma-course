import { Router } from "express";
import { body, param } from "express-validator";
import { createCourse, deleteCourseById, getCourses, getCourseById, updateCourse } from "./handlers/course";

const router = Router();

/**
 * Course Routes
 */

router.get('/course', getCourses);
router.post('/course',
  body('title').isString().notEmpty(),
  body('duration').isFloat().notEmpty(),
  body('desc').isString().notEmpty(),
  body('instructorId').isInt().optional(),
  createCourse);

router.get('/course/:id', param('id').isInt(), getCourseById);
router.delete('/course/:id', param('id').isInt(), deleteCourseById);

// write the route here
router.put('/course/:id',
  param('id').isInt(),
  body('title').isString().optional(),
  body('duration').isFloat().optional(),
  body('desc').isString().optional(),
  body('instructorId').isInt().optional(),
  updateCourse);

/**
 * Instructor Routes
 */

/**
 * Video Routes
 */

export default router;