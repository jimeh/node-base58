NPM_EXECUTABLE_HOME := node_modules/.bin
PATH := ${NPM_EXECUTABLE_HOME}:${PATH}

publish: npm-dep
	npm publish

test: npm-dep
	npm run test

lint: npm-dep
	npm run lint

npm-dep:
	test `which npm` || echo 'You need npm to do npm install... makes sense?'

.SILENT:
.PHONY: publish test lint npm-dep
