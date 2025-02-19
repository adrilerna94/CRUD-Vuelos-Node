// Defines Joi schemas for validating movie-related requests.
// Ensures that incoming data adheres to the required structure and rules.

import Joi from 'joi';

export class FlightValidator {
  private static id = Joi.string().hex().length(24);

  static flightIdSchema = Joi.object({ id: FlightValidator.id.required() });
  static flightSchema = Joi.object({
    aeropuertoOrigen: Joi.string()
        .pattern(/^[A-Za-z\s]+$/)
        .max(10)
        .required(),

    aeropuertoDestino: Joi.string()
        .pattern(/^[A-Za-z\s]+$/)
        .max(10)
        .required(),

    fechaSalida: Joi.date().required(),

    fechaLlegada: Joi.date().required(),

    precio: Joi.number()
        .min(0)
        .max(9999.99)
        .precision(2)
        .required(),

    nombrePasajero: Joi.string()
        .pattern(/^[A-Za-z\s]+$/)
        .max(300)
        .required(),
  });
}
