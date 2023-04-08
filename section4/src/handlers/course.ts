import { validationResult } from "express-validator";
import prisma from "../db";

import { Request, Response } from 'express';

export const getCourses = async (req: Request, res: Response) => {

  // I would like to fetch all the courses on the based on instructor id
  // 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const courses = await prisma.course.findMany({
    where: {
      instructorId: +req.params.instructorId
    },
    include: {
      Instructor: true
    }
  });
  res.status(200).json(courses);
};

export const createCourse = async (req: Request, res: Response) => {

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

export const getCourseById = async (req: Request, res: Response) => {
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

export const deleteCourseById = async (req: Request, res: Response) => {
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
export const updateCourse = async (req: Request, res: Response) => {

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