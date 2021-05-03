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
  } else if (error.name === 'InvalidValueError') {
    response.status(400).json({ error: error.message });
  }

  next(error);
};

export const middleware = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
