/**
 * Request
 *
 * PHPNomad's `PHPNomad\Http\Interfaces\Request`: one incoming HTTP
 * request, as a platform hands it to a controller. Each platform
 * integration implements it over its own request object.
 *
 * Where this differs from PHPNomad:
 * - PHP's `Request` extends `HasUser` from phpnomad/auth. TS Nomad has no
 *   auth package yet, so this `Request` has no user.
 * - Header names compare without regard to case, as HTTP defines them.
 *   PHP leaves that to each implementation.
 *
 * There is no container token. A request is a value that exists once per
 * call, so nothing resolves it from the container.
 */
export interface Request {
  /** The header's value, found in any case, or null when it is absent. */
  getHeader(name: string): string | null;

  /** Sets a header, replacing any value under the same name in any case. */
  setHeader(name: string, value: string): void;

  /** Every header, name to value. */
  getHeaders(): Record<string, string>;

  /** A route, query or body parameter, or null when it is absent. */
  getParam(name: string): unknown;

  /** True when the parameter is present, even when its value is null. */
  hasParam(name: string): boolean;

  /** Sets a parameter, as middleware does when it normalizes input. */
  setParam(name: string, value: unknown): void;

  /** Removes a parameter. Removing one that is absent does nothing. */
  removeParam(name: string): void;

  /** The raw request body, or an empty string when there is none. */
  getBody(): string;

  /** Every parameter, name to value. */
  getParams(): Record<string, unknown>;
}
