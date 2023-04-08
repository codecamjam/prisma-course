import { validationResult } from "express-validator";
import prisma from "../db";

import { Request, Response } from 'express';

export const getCourses = async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany();
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