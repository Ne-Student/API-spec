mkdir -p out;
yarn schema src/requests.ts '*' -o out/requests.json --strictNullChechs --required &
yarn schema src/responses.ts '*' -o out/responses.json --strictNullChechs --required &
yarn schema src/errors.ts '*' -o out/errors.json --strictNullChechs --required &
yarn schema src/common.ts '*' -o out/common.json --strictNullChechs --required &
yarn examples src/examples.ts;
wait