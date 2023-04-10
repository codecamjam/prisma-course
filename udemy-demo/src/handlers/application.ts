import { validationResult } from "express-validator";
import prisma from "../db";
import { RequestHandler } from "express";

enum APPLICATION_TYPE {
  LOAN = "LOAN",
  CAR_FINANCING = "CAR_FINANCING",
  BUSINESS_FINANCING = "BUSINESS_FINANCING"
}

export const createApplication: RequestHandler = async (req, res) => {

  // validate params
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const results = await prisma.customer.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      address: {
        create: {
          city: req.body.city,
          country: req.body.country,
          zip: req.body.zip
        }
      },
      applications: {
        create: [
          {
            amount: req.body.amount, // change the value
            tenure: req.body.tenure,
            type: req.body.applicationType
          }
        ]
      }
    },
  });
  return res.status(201).json(results);
};

export const sequentialQueries: RequestHandler = async (req, res) => {
  const results = await prisma.$transaction([
    // find application
    prisma.application.findMany(),
    prisma.customer.findMany(),
    prisma.course.findMany(),
    prisma.address.findMany(),
    // find customer
    // find address
    // find courses 
  ]);
  res.status(200).json(results);
};