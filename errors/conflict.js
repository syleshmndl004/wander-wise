export class ConflictError extends Error {
  constructor(message='Conflict Error') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}