import {
  ExceptionFilter, // Interface for creating custom exception filters
  Catch, // Decorator to bind the filter to exceptions
  ArgumentsHost, // Interface to access the arguments passed to the handler
  HttpException, // Base class for HTTP exceptions
  HttpStatus, // Enum for standard HTTP status codes
} from '@nestjs/common';
import { Request, Response } from 'express'; // Importing Request and Response types from express

@Catch() // Decorator to catch all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // Switch context to HTTP
    const response = ctx.getResponse<Response>(); // Get the response object
    const request = ctx.getRequest<Request>(); // Get the request object
    const status =
      exception instanceof HttpException // Check if the exception is an instance of HttpException
        ? exception.getStatus() // If true, get the status code from the exception
        : HttpStatus.INTERNAL_SERVER_ERROR; // Otherwise, set status to 500 (Internal Server Error)

    const message =
      exception instanceof HttpException // Check if the exception is an instance of HttpException
        ? exception.getResponse() // If true, get the response message from the exception
        : 'Internal Server Error'; // Otherwise, set message to 'Internal Server Error'

    response.status(status).json({ // Send a JSON response with the status code
      statusCode: status, // Include the status code
      timestamp: new Date().toISOString(), // Include the current timestamp
      path: request.url, // Include the URL of the request
      message, // Include the error message
    });
  }
}