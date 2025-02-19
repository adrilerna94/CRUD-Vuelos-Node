// Handles direct data operations related to users.
// This layer interacts with the database or a data source to perform CRUD operations.

import {FlightModel, IFlightModel } from '../models/flight.model';
import { IFlight } from '../types/flight.interface';
import { BaseRepository } from './base.repository';

export class FlightRepository {
  private baseRepository: BaseRepository<IFlightModel>;
  private defaultProjection: { [key: string]: 1 | 0};

  constructor() {
    this.baseRepository = new BaseRepository(FlightModel);
    this.defaultProjection = { id: 0, plot: 0, genres: 0, year: 0}; // 🔥 Se excluye __v correctamente
  }

  getAll = async () => await this.baseRepository.getAll();

  getById = async (id: string) => {
    return await this.baseRepository.getById(id, this.defaultProjection);
  };

  create = async (flight: IFlight) => {
    return await this.baseRepository.create(flight);
  };

  update = async (id: string, flight: IFlight) => {
    return await this.baseRepository.update(id, flight);
  }
  delete = async (id: string) => {
    return await this.baseRepository.delete(id);
  }


}
