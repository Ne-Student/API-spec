# OpenAPI specification of the Ne Student API

_Implementation can be found at [https://github.com/Ne-Student/ne-student-api](https://github.com/Ne-Student/ne-student-api)_

### Yep, this is a Node.js repo
I generate json schema and examples from the TypeScript files. I like it a lot better that way + added type-safety is nice. And yes, that means that you can't just plug `ne-student-api.yml` file into your favourite OpenAPI tools right away. Those examples and schemas must be first generated from ts files.

### How to build the darn thing?
`yarn install` and `yarn build`

_Duh..._

### How to use the darn thing?
- `yarn serve` - Launches live documentation on localhost
- `yarn lint` - Validate correctness of the spec
- `yarn mock` - Run mock server against the spec
- TODO: `yarn test` - Run test suite against the provided API to be spec-complient
