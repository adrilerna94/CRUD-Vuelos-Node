// Mongoose schema and model definition for the User entity.
// Defines the structure of user documents in the database.

import mongoose, { Model, Document } from 'mongoose';
import { IFlight } from '../types/flight.interface';

export interface IFlightModel extends IFlight, Document {
  _id: mongoose.Types.ObjectId;
}

const flightSchema = new mongoose.Schema({
  aeropuerto_origen: {type: String, required: true, max: 10},
  aeropuerto_destino: {type: String, required: true, max: 10},
  fecha_salida: { type: Date, required: true},
  fecha_llegada: { type: Date, required: true},
  precio: {type: Number, required: true},
  nombre_pasajero: { type: String, max: 300},
});

// forma profe
// module.exports = mongoose.model('Movie', movieSchema);
// forma segun convencionesf
const FlightModel: Model<IFlightModel> = mongoose.model<IFlightModel>('Flight', flightSchema);

export { FlightModel };
