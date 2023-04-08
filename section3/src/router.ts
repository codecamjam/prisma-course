import { Router } from "express";
import { body } from "express-validator";
import { createCourse, getCourses } from "./handlers/course";

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

/**
 * Instructor Routes
 */

/**
 * Video Routes
 */

export default router;