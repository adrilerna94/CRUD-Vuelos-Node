// Defines the routes for flight-related operations.
// Maps HTTP methods and endpoints to the corresponding controller methods.

import { Router } from 'express';
import { FlightController } from '../controllers/flight.controller';
import { FlightValidator } from '../validators/flight.validator';
import { validate, ValidationSource } from '../middlewares/validate.middleware';

const flightController = new FlightController();
export const flightRouter = Router();

flightRouter.get('/:id', validate(FlightValidator.flightIdSchema, ValidationSource.PARAMS), flightController.getById);
flightRouter.get('/', validate(FlightValidator.flightSchema, ValidationSource.QUERY), flightController.getAll);
flightRouter.post('/', validate(FlightValidator.flightSchema, ValidationSource.BODY), flightController.create);
flightRouter.put('/:id', validate(FlightValidator.flightIdSchema, ValidationSource.PARAMS), validate(FlightValidator.flightSchema, ValidationSource.BODY), flightController.update);
flightRouter.delete('/:id', validate(FlightValidator.flightIdSchema, ValidationSource.PARAMS), flightController.delete);
