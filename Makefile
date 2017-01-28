ENV_DEV = NODE_ENV=development
ENV_PROD = NODE_ENV=production

BIN = node_modules/.bin
NODE = $(BIN)/babel-node --presets es2015 --presets react --presets stage-0
LINT = $(BIN)/eslint
TAPE = $(BIN)/tape
TEST_REPORTER = $(BIN)/tap-spec
WEBPACK = $(BIN)/webpack
DEV_SERVER = $(BIN)/webpack-dev-server
PARALLEL = $(BIN)/parallelshell
CHOKIDAR = $(BIN)/chokidar
JEST = $(BIN)/jest
FLOW = $(BIN)/flow

ASSET_FILES = $(shell find src/assets -type f)
LIB_FILES = $(shell find src -name "*.js")
PACKAGE = $(shell cat package.json | grep name | tr -d " \t\n\r\":," | sed 's:name::')
VERSION = $(shell cat package.json | grep version | tr -d " \t\n\r\":,(a-z)")



# default
.PHONY: all
all: develop



#setup
.PHONY: setup
setup:
	@yarn install



# clean
.PHONY: clean
clean:
	# Cleaning dist
	@rm -rf dist



# lint
.PHONY: lint
lint:
	# linting with eslint
	@$(LINT) 'src/**/*.js' --quiet
	# lint success



# type checking
.PHONY: flow
flow:
	# type checking with flow
	@$(NODE) $(FLOW) check
	# type check success



# testing and coverage
.PHONY: test
test:
	# testing with jest
	@$(NODE) $(JEST)



# run all code validations
.PHONY: validate
validate: flow lint test
	# success



# assets
.PHONY: assets dist/

pre-assets:
	# Cleaning assets
	@mkdir -p dist/images
	@mkdir -p dist/fonts

src/assets/%: dist/
	@cp $@ $<$*

assets: pre-assets $(ASSET_FILES)



# dev server
.PHONY: dev-server
dev-server:
	@NODE_ENV=development $(DEV_SERVER) --config webpack-dev-server.config.babel.js --progress --hot --host '0.0.0.0'



# develop
develop: clean assets dev-server
	# Starting dev server and watchers
	@$(PARALLEL) 'make dev-server'



# build
.PHONY: build
build: clean assets
	# bundling
	$(WEBPACK) --config webpack-build.config.babel.js --progress --bail
