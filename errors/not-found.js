/*
This file defines a custom error class for handling "Not Found" errors in an application. 
The NotFoundError class extends the built-in Error class and sets a default message and
status code for 404 errors.
*/
export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);//parent class ma ni change gardenx
    //this.message = message; // Set the error message to the provided message or the default message only on child class
    this.name = 'NotFoundError';
    this.statusCode = 404;//here the word this is used to refer to the current instance of the NotFoundError class. It allows us to set properties (name and statusCode) on the specific instance of the error being created.
  }
}