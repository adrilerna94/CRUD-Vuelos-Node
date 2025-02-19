# Ejercicio 01

## API CRUD para una colección de viajes

Crea una API para poder realizar todas las operaciones de CRUD sobre una colección de objetos de viajes de una BBDD. Sigue las buenas prácticas de calidad de código.

### Estructura del objeto "viaje"

Cada objeto **viaje** tendrá los siguientes campos requeridos:

- **Aeropuerto de origen**:
  - Debe ser un *string* con solo letras y/o espacios.
  - Máximo **10 caracteres**.

- **Aeropuerto de destino**:
  - Debe ser un *string* con solo letras y/o espacios.
  - Máximo **10 caracteres**.

- **Fecha de salida**:
  - Debe ser un **date**.

- **Fecha de llegada**:
  - Debe ser un **date**.

- **Precio**:
  - Debe ser un **número**.
  - Debe tener **2 decimales**.
  - Debe estar entre **0,00 y 9999,99**.

- **Nombre del pasajero**:
  - Debe ser un *string* con solo letras y/o espacios.
  - Debe contener máximo **300 caracteres**.
