import { validationResult } from "express-validator";
import prisma from "../db";

import { Request, Response } from 'express';

export const getInstructors = async (req: Request, res: Response) => {
  const courses = await prisma.instructor.findMany();
  res.status(200).json(courses);
};

export const createInstructor = async (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const instructor = await prisma.instructor.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country
    }
  });

  return res.status(201).json(instructor);

};