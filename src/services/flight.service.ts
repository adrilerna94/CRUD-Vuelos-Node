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


  createflight = async (flight: Partial<IFlight>) => {
    const filteredflight = {
      title: flight.title,
      plot: flight.plot,
      directors: flight.directors,
      released: flight.released
    }
    return await this.flightRepository.create(filteredflight);
  };
  updateflight = async (id: string, data: Partial<IFlight>) => {
    const flighttoUpdate = await this.flightRepository.getById(id);
    if (!flighttoUpdate) {
      throw new AppError(`flight with ID ${id} NOT FOUND`, httpStatus.NOT_FOUND);
    }
    // Lista de palabras prohibidas
    const prohibited = ['porn', 'sex'];
    // validar si plot está en data y no es undefined
    if (data.plot) {
      // Normalizar datos ➡️ minúsculas y quitar espacios inicio y final.
      const normalizedPlot = data.plot.toLowerCase().trim();
      // Filtrar palabras prohibidas
      const prohibitedWords = prohibited.filter(word => normalizedPlot.includes(word));
      if (prohibitedWords.length > 0){
        throw new AppError(`flight can't contain banned words: ${prohibitedWords.join(', ')}`, httpStatus.BAD_REQUEST);
      }
    }
    return this.flightRepository.update(id, data);
  }
  deleteflight = async (id: string) => {
    const flightToDelete = await this.flightRepository.getById(id);
    if(!flightToDelete) {
      throw new AppError(`flight with ID ${id} NOT FOUND`, httpStatus.NOT_FOUND);
    }
    return this.flightRepository.delete(id);
  }
}
