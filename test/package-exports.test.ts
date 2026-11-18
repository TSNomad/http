/**
 * The public entry point, imported by package name. Runs now.
 */

import { expect, test } from 'vitest';
import * as http from '@tsnomad/http';

test('exports Method and the ResponseFactory token', () => {
  expect(Object.keys(http).sort()).toEqual(['Method', 'ResponseFactory']);
  expect(http.Method).toEqual({ Get: 'GET', Post: 'POST', Put: 'PUT', Delete: 'DELETE', Patch: 'PATCH', Options: 'OPTIONS' });
  expect(Object.isFrozen(http.Method)).toBe(true);
  expect(http.ResponseFactory.name).toBe('ResponseFactory');
});
