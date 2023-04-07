/**
 * Fetch data from course table
 * Insert data into Course table
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  // write queries here
  //insert the record into course table

  // we need a course model

  // ----------------------------------------
  //insert the record into course like title, desc, duration, date
  // const course = await prisma.course.create({
  //   data: {
  //     title: 'LEARN PRISMA WITH NODEJS',
  //     desc: 'Step by Step learn how to use Prisma ORM',
  //     duration: 2.5
  //   }
  // });
  // const course = await prisma.course.create({
  //   data: {
  //     title: 'LEARN GatsbyJs',
  //     desc: 'Step by Step learn how to use Gatsby',
  //     duration: 3.5
  //   }
  // });
  // console.log(course);

  // ----------------------------------------
  // const courses = await prisma.course.findMany();
  // console.log(courses);


  // ----------------------------------------
  // const video = await prisma.video.create({
  //   data: {
  //     title: 'Learn relation',
  //     desc: 'One to many relationship between models',
  //     url: 'www.aws.s3.com/2131231',
  //     courseId: 1 // creating a video for the prisma course
  //   }
  // });
  // console.log(video);


  // ----------------------------------------
  // when we find the videos, attach the Course object
  const videos = await prisma.video.findMany({ include: { Course: {} } });
  console.log(videos);
}

main().then(async () => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}); 