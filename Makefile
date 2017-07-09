NPM_EXECUTABLE_HOME := node_modules/.bin
PATH := ${NPM_EXECUTABLE_HOME}:${PATH}

hooks: .git/hooks/pre-commit
hooks: .git/hooks/pre-push

.git/hooks/pre-commit: hook.sh
	cp $< $@

.git/hooks/pre-push: hook.sh
	cp $< $@

publish:
	npm publish

test:
	npm run test

lint:
	npm run lint

npm-dep:
	test `which npm` || echo 'You need npm to do npm install... makes sense?'

.SILENT:
.PHONY: publish test lint npm-dep
