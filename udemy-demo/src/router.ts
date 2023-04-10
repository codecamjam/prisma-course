import { Router } from "express";
import { body, param } from "express-validator";
import { createCourse, deleteCourseById, getCourses, getCourseById, updateCourse } from "./handlers/course";
import { getInstructors, createInstructor, getInstructor } from "./handlers/instructor";
import { deactivateAccount, privateRoute, signin, signup } from "./handlers/user";
import { createVideo, getVideos } from "./handlers/video";
import { authenticate } from "./middlewares/auth";
import { createApplication } from "./handlers/application";

const router = Router();

/*******************************************************************************
 * Course Routes
 */
router.get('/courses/:instructorId', param('instructorId').isInt(), getCourses);
router.post('/course', authenticate,
  body('title').isString().notEmpty(),
  body('duration').isFloat().notEmpty(),
  body('desc').isString().notEmpty(),
  body('instructorId').isInt().optional(),
  createCourse);
router.get('/course/:id', param('id').isInt(), getCourseById);
router.delete('/course/:id', param('id').isInt(), deleteCourseById);
router.put('/course/:id',
  param('id').isInt(),
  body('title').isString().optional(),
  body('duration').isFloat().optional(),
  body('desc').isString().optional(),
  body('instructorId').isInt().optional(),
  updateCourse);

/*******************************************************************************
 * Instructor Routes
 */
router.get('/instructors', getInstructors);
router.post('/instructor', authenticate,
  body('name').isString().notEmpty(),
  body('zip').isString().notEmpty(),
  body('country').isString().notEmpty(),
  body('city').isString().notEmpty(),
  createInstructor);
router.get('/instructor/:id', param('id').isInt(), getInstructor);

/*******************************************************************************
 * Video Routes
 */
router.post('/video',
  body('title').isString().notEmpty(),
  body('desc').isString().notEmpty(),
  body('url').isString().notEmpty(),
  body('hostingProvider').isString().notEmpty(),
  body('key').isString().optional(),
  body('metaData').isString().optional(),
  createVideo);
router.get('/videos', getVideos);

/*******************************************************************************
 * User Routes
 */
router.post('/signup',
  body('email').isString().isEmail().notEmpty(),
  body('password').isString().notEmpty(),
  signup
);
router.post('/signin',
  body('email').isString().isEmail().notEmpty(),
  body('password').isString().notEmpty(),
  signin
);
router.delete('/deactivate-acct',
  authenticate,
  body('email').isString().isEmail().notEmpty(),
  body('password').isString().notEmpty(),
  deactivateAccount
);
router.get('/private', authenticate, privateRoute);

/*******************************************************************************
 * Application Route
 */
router.post('/application', createApplication);

export default router;
