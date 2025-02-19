// A generic repository class providing common database operations.
// Can be extended by specific repositories like user.repository.ts.

import { Model, ProjectionFields } from 'mongoose';
import { IFlight } from '../types/flight.interface';

export class BaseRepository<Document> {
  private model: Model<Document>;
  private defaultProjection: ProjectionFields<Document>;

  constructor(model: Model<Document>) {
    this.model = model;
    this.defaultProjection = { __v: 0 };
  }

  getAll() {
    return this.model.find({}, this.defaultProjection);
  }

  getById(id: string, projection?: ProjectionFields<Document>) {
    const projectionFields = { ...projection, ...this.defaultProjection };
    return this.model.findById(id, projectionFields);
  }
  create = async (flightData: IFlight) => {
    const newFlight = new this.model(flightData);
    return await newFlight.save();
  }
  update = async (id: string, newFlight: IFlight) => {
    const filter = {_id: id}; // filtramos por el ID
    /*
      📌 function findOneAndUpdate(filter, update, options) {} 📌
      ➡️findOneAndUpdate(filter, updateData, {new:true})
      ⚡{new:true} ➡️ especificamos que retorne el documento después update sea aplicado.
       ❗default new:false ➡️ return before update applied.
    */
    return this.model.findOneAndUpdate(filter, newFlight , {new:true});
  }
  delete = async (id: string) => {
    const filter = {_id: id};
    return this.model.findOneAndDelete(filter);
  }

}
