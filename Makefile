NPM_EXECUTABLE_HOME := node_modules/.bin
PATH := ${NPM_EXECUTABLE_HOME}:${PATH}

SOURCE = ./src
TARGET = ./lib

REPORTER = spec
TEST_DIR = ./test
TEST_FILES = *_test.coffee

build: coffee-dep
	coffee -b -o $(TARGET) -c $(SOURCE)

watch: coffee-dep
	coffee -b -o $(TARGET) -cw $(SOURCE)

remove-js:
	rm -fr lib/

publish: npm-dep build
	npm publish

test: build
	mocha --reporter $(REPORTER) \
		--compilers coffee:coffee-script \
		$(shell find $(TEST_DIR) -name $(TEST_FILES))

npm-dep:
	test `which npm` || echo 'You need npm to do npm install... makes sense?'

coffee-dep:
	test `which coffee` || echo 'You need to have CoffeeScript in your' \
		'PATH.\nPlease install it using `brew install coffee-script` or' \
		'`npm install coffee-script`.'


.SILENT:
.PHONY: build watch remove-js publish test npm-dep coffee-dep
