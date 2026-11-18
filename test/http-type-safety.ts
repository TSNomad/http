/**
 * Compile-only checks, run by `npm run typecheck`. Each @ts-expect-error
 * line must stay an error. Nothing here runs.
 */

import { Method } from '@tsnomad/http';
import type { Request, Response, ResponseFactory } from '@tsnomad/http';

const get: Method = Method.Get;
const post: Method = 'POST';

// @ts-expect-error a method outside the six
const trace: Method = 'TRACE';

declare const response: Response;
const chained: Response = response.setStatus(201).setHeader('x-id', '1').setJson({ ok: true });
const json: unknown = response.getJson();

// @ts-expect-error a header value is a string
response.setHeader('x-count', 3);

declare const request: Request;
const header: string | null = request.getHeader('authorization');

// @ts-expect-error getHeader may answer null
const notNull: string = request.getHeader('authorization');

declare const factory: ResponseFactory;
const fresh: Response = factory.create();

void [get, post, trace, chained, json, header, notNull, fresh];
