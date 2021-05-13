import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { config } from './config';

import { logger } from './logger';
import { UserToken } from './types';

const requestLogger = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const tokenExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }

  next();
};

const userExtractor = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  void (async () => {
    try {
      
      if (config.SECRET === undefined) {
        throw new Error('Environment variable SECRET is not given.');
      }
      if (request.token === undefined) {
        next();
        return;
      }
      
      const decodedTokenNever = jwt.verify(request.token, config.SECRET);
      if (typeof decodedTokenNever !== 'object') {
        next();
        return;
      }
      const decodedToken = decodedTokenNever as UserToken;

      if (decodedToken.id === undefined || decodedToken.id.length === 0) {
        next();
        return;
      }
      const user = await User.findById(decodedToken.id);
      if (user !== null) {
        request.user = user;
      }
      next();
    } catch (e) {
      next(e);
    }
  })();
};

const requireLogin = (
  request: Request,
  _response: Response,
  next: NextFunction
) => {
  if (request.user === undefined) {
    const noTokenError = new Error('token missing or invalid');
    noTokenError.name = 'JsonWebTokenError';
    throw noTokenError;
  }

  next();
};

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

export const middleware = {
  requestLogger,
  tokenExtractor,
  requireLogin,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
