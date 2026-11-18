/**
 * Method
 *
 * PHPNomad's `PHPNomad\Http\Enums\Method`: the HTTP methods, by name.
 *
 * Where this differs from PHPNomad: PHP has no enum before 8.1, so
 * PHPNomad uses a class of constants. Here `Method` is a frozen object of
 * the same names and values, and the type `Method` is the union of its
 * values. The helpers PHPNomad's `Enum` trait adds, such as listing the
 * values or checking one, are not ported.
 */
export const Method = Object.freeze({
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Patch: 'PATCH',
  Options: 'OPTIONS',
} as const);

export type Method = (typeof Method)[keyof typeof Method];
