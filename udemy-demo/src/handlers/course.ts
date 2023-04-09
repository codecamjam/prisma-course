import { validationResult } from "express-validator";
import { RequestHandler } from 'express';
import prisma from "../db";
import { createPaginator } from 'prisma-pagination';
import { Course, Prisma } from "@prisma/client";

// display 5 courses per page
const paginate = createPaginator({});

export const getCourses: RequestHandler = async (req, res) => {
  const { page = '0', perPage = '0' } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty() || !req.query.page) {
    return res.status(400).json({ errors: errors.array() });
  }
  // call the paginate
  const results = await paginate<Course, Prisma.CourseFindManyArgs>(
    prisma.course,
    {
      where: {
        // title: {
        //   contains: 'Nodejs'
        // }
        instructorId: +req.params.instructorId,

      },
      include: {
        Instructor: true
      },
      orderBy: {
        id: 'desc'
      }
    },
    {
      page: +page,
      perPage: +perPage
    }
  );
  res.status(200).json(results);
};

export const createCourse: RequestHandler = async (req, res) => {
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
};

export const getCourseById: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const course = await prisma.course.findUnique({ where: { id: +req.params.id } });
  if (!course) {
    return res.status(404).json({ err: 'could not find course' });
  }
  return res.status(200).json(course);
};

export const deleteCourseById: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const course = await prisma.course.findUnique({ where: { id: +req.params.id } });
  if (!course) {
    return res.status(404).json({ err: 'could not find course' });
  }
  const deletedCourse = await prisma.course.delete({
    where: {
      id: parseInt(req.params.id)
    }
  });
  return res.status(200).json(deletedCourse);
};

// write the handler function
export const updateCourse: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const course = await prisma.course.findUnique({ where: { id: +req.params.id } });
  if (!course) {
    return res.status(404).json({ err: 'could not find course' });
  }
  const updatedCourse = await prisma.course.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: req.body
  });
  return res.status(200).json(updatedCourse);
};