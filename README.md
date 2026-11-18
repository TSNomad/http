# @tsnomad/http

The HTTP contracts the other TS Nomad packages share: `Method`, the
`Request` and `Response` interfaces, and `ResponseFactory`. It holds no
implementation. `@tsnomad/node-integration` ships a plain `Response`
and `NodeResponseFactory`.

This is the TypeScript counterpart to PHPNomad's
[http](https://github.com/phpnomad/http) package.

## Install

```bash
npm install @tsnomad/http
```

The package ships compiled JavaScript with its type declarations, so
it needs no build step of its own. It needs Node 20.19 or later.
npm installs the TS Nomad package it depends on with it.

`scripts/consumer-check.sh [<commit>]` installs the package from git at
one commit into a scratch project and imports every export, from Node
and from TypeScript.

## Where it fits

`@tsnomad/fetch`, `@tsnomad/rest` and the platform integrations all
build on these contracts. `ResponseFactory` is also a container token,
made with `createToken` from `@tsnomad/di-container`.

## Use

```ts
import { Method, ResponseFactory, type Request, type Response } from '@tsnomad/http';

async function reply(request: Request, responses: ResponseFactory): Promise<Response> {
  const id = request.getParam('id');
  return responses.create().setStatus(200).setJson({ id });
}

// NodeInitializer from @tsnomad/node-integration binds NodeResponseFactory here.
const responses = await container.get(ResponseFactory);
```

`Method` is a frozen object of the six methods, `Method.Get` to
`Method.Options`, and a union type of the same name.

## Where this differs from PHPNomad

- `ResponseFactory` is new. PHPNomad's REST strategy takes one `Response`
  through its constructor, which is safe when a process serves one
  request. A Node process serves many requests at once from one
  container, so code that answers a request asks the factory for a new
  response each time.
- `Request` has no user. PHPNomad's request gets one from its auth
  package, and TS Nomad has no auth package yet.
- `Response.getJson()` answers `unknown`, and implementations throw for a
  body that is not JSON instead of answering an empty array.
- Header names compare without regard to case on `Request` and
  `Response`, as HTTP defines them. PHP leaves that to each
  implementation.
- `Request.getParam` and `hasParam` take a plain name. PHP's accept a
  dot-notated name, such as `address.city`, to reach into a nested
  param, so a validation key written that way finds nothing here.

## Extracted 2026-11-17

This package moved into its own repository on 2026-11-17, at version
0.1.0, with its tests.

## License

MIT.
