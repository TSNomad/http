/**
 * ResponseFactory
 *
 * Builds a fresh `Response` in the platform's own implementation. A REST
 * lifecycle uses it to answer an error, and a controller can use it to
 * build its reply.
 *
 * Where this differs from PHPNomad: PHPNomad injects a `Response` itself,
 * and one PHP process serves one request, so one instance per process is
 * safe. A Node process serves many requests at once, and the container
 * shares one instance per binding, so a shared `Response` would carry one
 * request's status and body into another. A factory gives each call its
 * own.
 */

import { createToken } from '@tsnomad/di-container';
import type { Response } from './Response.js';

export interface ResponseFactory {
  /** A new, empty response: status 200, no headers, an empty body. */
  create(): Response;
}

export const ResponseFactory = createToken<ResponseFactory>('ResponseFactory');
