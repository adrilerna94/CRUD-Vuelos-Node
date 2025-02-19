// Defines the structure of a Movie object using a TypeScript interface.
// Ensures type safety throughout the application when working with movies.

export interface IFlight {
  aeropuerto_origen: string,
  aeropuerto_destino: string,
  fecha_salida: Date,
  fecha_llegada: Date,
  precio: number,
  nombre_pasajero: string,
}
