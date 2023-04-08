import { RequestHandler } from 'express';
import { JwtPayload, verify } from "jsonwebtoken";

export const authenticate: RequestHandler = async (req, res, next) => {
  try {
    // first of all make sure user has provided the authentication token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];

    // if there is no token send the authentication error
    if (!token || typeof token !== 'string') {
      return res.status(401).json({ msg: 'UnAuthorized: not authenticated!' });
    }
    const secret = process.env.WEB_TOKEN_SECRET;
    if (!secret) {
      throw new Error('WEB_TOKEN_SECRET is not defined');
    }
    // we need to verify the token
    const results = verify(token, secret) as JwtPayload;
    // you can verify by using jsonwebtoken function 
    // call the verify function
    // you will receive the id from the token
    // if verified then we need to add the user property in the request
    req.user = results.id;
    next();
  }
  catch (err) {
    return next(new Error('Authentication Error'));
  }
};