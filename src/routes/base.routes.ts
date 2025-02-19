// Main router file that configures and combines all API routes.
// Includes middleware and error handling for the application.

import express, { Router } from 'express';
import { errorMiddleware } from '../middlewares/error.middleware';
import { flightRouter } from './flight.routes';

export const baseRouter = Router();

baseRouter.use(express.json());

baseRouter.use('/flights', flightRouter);

baseRouter.use(errorMiddleware);
