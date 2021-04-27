import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'InvalidValueError') {
    response.status(400).send({ error: error.message });
  }

  next(error);
};
