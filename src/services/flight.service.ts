// Implements business logic for user operations.
// Processes requests from the controller and interacts with the repository as needed.

import { httpStatus } from '../config/httpStatusCodes';
import { AppError } from '../utils/application.error';
import { FlightRepository } from '../repositories/flight.repository';
import { IFlight } from '../types/flight.interface';

export class FlightService {
  private flightRepository: FlightRepository;

  constructor() {
    this.flightRepository = new FlightRepository();
  }

  getAll = async () => this.flightRepository.getAll();

  getById = async (id: string) => {
    const flight = await this.flightRepository.getById(id);
    if (!flight) {
      throw new AppError('flight not found', httpStatus.NOT_FOUND);
    }
    return flight;
  };


  createFlight = async (flight: IFlight) => {
    return await this.flightRepository.create(flight);
  };
  
  updateFlight = async (id: string, data: IFlight) => {
    const flighttoUpdate = await this.flightRepository.getById(id);
    if (!flighttoUpdate) {
      throw new AppError(`flight with ID ${id} NOT FOUND`, httpStatus.NOT_FOUND);
    }
    return this.flightRepository.update(id, data);
  }

  deleteFlight = async (id: string) => {
    const flightToDelete = await this.flightRepository.getById(id);
    if(!flightToDelete) {
      throw new AppError(`flight with ID ${id} NOT FOUND`, httpStatus.NOT_FOUND);
    }
    return this.flightRepository.delete(id);
  }
}
