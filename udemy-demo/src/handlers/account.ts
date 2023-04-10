import { validationResult } from "express-validator";
import prisma from "../db";
import { transfer } from "../services/account";
import { RequestHandler } from "express";

export const createAccounts: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const account = await prisma.account.create({
    data: {
      title: req.body.title,
      balance: req.body.balance
    }
  });
  return res.status(201).json(account);
};

export const transferHandler: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // get the transfer from receiver
    const senderId = req.body.sender; // John
    const receiverId = req.body.receiver; // Sam
    const transferAmount = req.body.transferAmount; // $50

    const results = await transfer(senderId, receiverId, transferAmount);
    return res.json(results);

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'server error' });
  }
};