import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const prisma = new PrismaClient();

// custom middleware
app.use((req, res, next) => {
	console.log(`${req.url} ${new Date()}`);
	next(); // call the next middleware in the stack
});

app.get('/', (req, res) => {
	res.send('HELLO WROLD');
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
app.post('/api/course', async (req, res) => {


	// create a new instructor 
	// const instructor = await prisma.instructor.create({
	//     data:{
	//         name: 'Jhony',
	//         city: 'London',
	//         country: 'UK',
	//         email:'john@gmail.com',
	//         zip: '2300'
	//     }
	// });
	// create new record
	const course = await prisma.course.create({
		data: {
			title: 'Learn Loopback',
			desc: 'Build apis with Loopback',
			duration: 12.4,
			instructorId: 1
			// Instructor:{
			//     connect:{
			//         id: 1
			//     }
			// }
		}
	});

	// send the record back to response
	res.status(201);
	return res.json(course);
});

export default app;