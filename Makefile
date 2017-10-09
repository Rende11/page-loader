install:
	npm install

run:
	npm run babel-node -- 'src/bin/index.js' --output test https://habrahabr.ru/sandbox/72340/

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
	npm run eslint src __tests__

lint-fix:
	npm run -- eslint src __tests__ --fix

publish:
	npm publish

start:
	rm -rf test
	mkdir test
	make run

.PHONY: test
