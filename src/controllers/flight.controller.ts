// Manages HTTP requests related to Movies.
// Contains methods for handling routes like GET, POST, PUT, DELETE for Movies.
// Delegates business logic to the Movie service.

import { NextFunction, type Request, type Response } from 'express';
// import { httpStatus } from '../config/httpStatusCodes';
import { FlightService } from '../services/flight.service';
import { httpStatus } from '../config/httpStatusCodes';
// import { Http2ServerResponse } from 'http2';

export class MovieController {
  private flightService: FlightService;

  constructor() {
    this.flightService = new FlightService();
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flights = await this.flightService.getAll();
      const response = {
        message: 'Movies fetched successfully',
        flights
      };
      res.send(response);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const flight = await this.flightService.getById(req.params.id);
      const response = {
        message: 'Flight fetched successfully',
        flight
      };
      res.send(response);
    } catch (error) {
      next(error);
    }
  };


  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newFlight = await this.flightService.createFlight(req.body);
      const response = {
        message: 'Movie created successfully',
        newFlight
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const newFlight = req.body;
      const flight = await this.flightService.updateFlight(id, newFlight);
      const response = {
        message: 'Flight Updated successfully',
        flight
      };
      res.send(response)
    } catch (error) {
      next(error);
    }
  }
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.flightService.deleteFlight(id);
      res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }
}
