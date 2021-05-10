import { Request, Response, NextFunction } from 'express';

import { logger } from './logger';

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
  unknownEndpoint,
  errorHandler,
};
