import { Router } from "express";
import { body, param } from "express-validator";
import { createCourse, getCourses, getCourseById } from "./handlers/course";

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

/**
 * Instructor Routes
 */

/**
 * Video Routes
 */

export default router;