/**
 * Response
 *
 * PHPNomad's `PHPNomad\Http\Interfaces\Response`: an HTTP response, built
 * by a controller or answered by a fetch strategy. Setters return the
 * response, so calls chain.
 *
 * Where this differs from PHPNomad:
 * - Header names compare without regard to case, as HTTP defines them.
 * - `getJson()` answers whatever JSON value the body holds and throws a
 *   SyntaxError when the body is not JSON, the empty body included.
 *   PHPNomad's integrations answer an empty array for a body they cannot
 *   decode, which hides a broken reply.
 *
 * There is no container token. A response exists once per call. Code that
 * needs a fresh one resolves `ResponseFactory`.
 */
export interface Response {
  /** Sets the HTTP status code. */
  setStatus(code: number): this;

  /** The HTTP status code. */
  getStatus(): number;

  /** Sets a header, replacing any value under the same name in any case. */
  setHeader(name: string, value: string): this;

  /** The header's value, found in any case, or null when it is absent. */
  getHeader(name: string): string | null;

  /** Every header, name to value. */
  getHeaders(): Record<string, string>;

  /** Sets the raw body. */
  setBody(body: string): this;

  /** Sets the body to `data` encoded as JSON, and the JSON content type. */
  setJson(data: unknown): this;

  /**
   * The body decoded as JSON.
   *
   * @throws SyntaxError when the body is not JSON, the empty body included
   */
  getJson(): unknown;

  /** The raw body, or an empty string when there is none. */
  getBody(): string;

  /**
   * Marks the response as an error: sets the status, which defaults to
   * 400, records the message for `getErrorMessage()`, and sets a JSON
   * body of `{ "error": message }`.
   */
  setError(message: string, code?: number): this;

  /** The message `setError` recorded, or null. */
  getErrorMessage(): string | null;

  /**
   * The platform's own form of this response, for the strategy that hands
   * it back to the platform.
   */
  getResponse(): unknown;
}
