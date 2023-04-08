import { validationResult } from "express-validator";
import prisma from "../db";

import { Request, Response } from 'express';

export const createVideo = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const video = await prisma.video.create({
    data: {
      title: req.body.title,
      desc: req.body.desc,
      videoDetails: {
        create: {
          hostingProvider: req.body.hostingProvider,
          url: req.body.url,
        }
      }
    }
  });

  return res.status(201).json(video);
};

export const getVideos = async (req: Request, res: Response) => {
  const videos = await prisma.video.findMany({
    include: {
      videoDetails: true
    }
  });
  return res.status(200).json(videos);
};