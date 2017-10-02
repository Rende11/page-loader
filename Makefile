install:
	npm install

run:
	npm run babel-node -- 'src/bin/index.js'   https://google.com

install-flow-typed:
	npm run flow-typed install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test
