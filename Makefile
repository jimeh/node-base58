NPM_EXECUTABLE_HOME := node_modules/.bin
PATH := ${NPM_EXECUTABLE_HOME}:${PATH}

SOURCE = ./src
TARGET = ./lib

REPORTER = spec
TEST_DIR = ./test
TEST_FILES = *_test.coffee

build:
	coffee -o $(TARGET) -c $(SOURCE)

watch:
	coffee -o $(TARGET) -cw $(SOURCE)

test:
	mocha --reporter $(REPORTER) \
		--compilers coffee:coffee-script \
		$(shell find $(TEST_DIR) -name $(TEST_FILES))


.SILENT:
.PHONY: build watch test
