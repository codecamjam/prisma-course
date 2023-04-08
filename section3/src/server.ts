import { PrismaClient } from '@prisma/client';
import express from 'express';
import morgan from 'morgan';
// @ts-ignore
import errorhandler from 'error-handler';
import { body, validationResult } from 'express-validator';

const app = express();
const prisma = new PrismaClient();

// custom middleware
// app.use((req, res, next) => {
//     console.log(`${req.url} ${new Date()}`);
//     next(); // call the next middleware in the stack
// });

// apply third party middleware
app.use(morgan('dev'));
app.use(express.json()); // parse the request body for me


app.get('/', (req, res) => {
	throw new Error('SOMETHING WENT WRONG');
	res.send('HELLO WORLD');
});

// GET api/course
app.get('/api/courses', async (req, res) => {
	// fetch all the courses from db
	const courses = await prisma.course.findMany();
	// get the prisma

	// get the course from the prisma object

	// call the many method

	// send back to user as a json
	res.status(200);
	res.json(courses);

});

// POST /api/course

// create endpoint
app.post('/api/course',
	body('title').isString().notEmpty(),
	body('duration').isFloat().notEmpty(),
	body('desc').isString().notEmpty(),
	body('instructorId').isInt().optional(),
	async (req, res) => {

		// validate our parameters
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const course = await prisma.course.create({
			data: {
				title: req.body.title,
				desc: req.body.desc,
				duration: req.body.duration,
				instructorId: req.body.instructorId
			}
		});
		return res.status(201).json(course);
	});

// app.use((error : any, req: express.Request,res: express.Response,next: express.NextFunction) => {
//     console.log(`ERROR: ${error.message}`);
//     next(error);
// })
if (process.env.NODE_ENV === 'development') {
	app.use(errorhandler());
}

export default app;