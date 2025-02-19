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

  find = (
    filters: Record<string, unknown> = {},
    pagination: { skip: number; limit: number } = { skip: 0, limit: 0 },
  ) => {
    const options = { ...pagination };
    return this.baseRepository.find<IFlightModel>(filters, this.defaultProjection, options);
  };
  create = async (movie: Partial<IFlight>) => {
    const filteredMovie: Partial<IFlight> = {
      title: movie.title ?? "Unknown Title",
      plot: movie.plot ?? "No plot available",
      genres: movie.genres ?? [],
      year: movie.year ?? new Date().getFullYear(),
      directors: movie.directors ?? [],
      released: movie.released ?? new Date(),
    };

    return await this.baseRepository.create(filteredMovie);
  };
  update = async (id: string, movie: Partial<IMovie>) => {
    return await this.baseRepository.update(id, movie);
  }
  delete = async (id: string) => {
    return await this.baseRepository.delete(id);
  }


}
