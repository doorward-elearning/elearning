BUILD_DIR = build
CLEANCSS = ./node_modules/.bin/cleancss
LIBJITSIMEET_DIR = node_modules/lib-jitsi-meet/
LIBFLAC_DIR = node_modules/libflacjs/dist/min/
RNNOISE_WASM_DIR = node_modules/rnnoise-wasm/dist/
NODE_SASS = ./node_modules/.bin/node-sass
NPM = npm
OUTPUT_DIR = .
STYLES_BUNDLE = css/all.bundle.css
STYLES_MAIN = css/main.scss
WEBPACK = ./node_modules/.bin/webpack
WEBPACK_DEV_SERVER = ./node_modules/.bin/webpack-dev-server

DEPLOY_DIR = ../dist/apps/doorward-meet/libs/
DEPLOY_ENTRYPOINT = ../dist/apps/doorward-meet/
STYLES_DESTINATION = ../dist/apps/doorward-meet/css/

all: compile deploy clean

compile:
	$(WEBPACK) -p

clean:
	rm -fr $(BUILD_DIR)

.NOTPARALLEL:
deploy: deploy-init deploy-appbundle deploy-rnnoise-binary deploy-lib-jitsi-meet deploy-libflac deploy-css deploy-local deploy-html

deploy-init:
	rm -fr $(DEPLOY_DIR)
	mkdir -p $(DEPLOY_DIR)
	mkdir -p $(STYLES_DESTINATION)
	mkdir -p $(DEPLOY_ENTRYPOINT)

deploy-appbundle:
	cp \
		$(BUILD_DIR)/app.bundle.min.js \
		$(BUILD_DIR)/app.bundle.min.map \
		$(BUILD_DIR)/do_external_connect.min.js \
		$(BUILD_DIR)/do_external_connect.min.map \
		$(BUILD_DIR)/external_api.min.js \
		$(BUILD_DIR)/external_api.min.map \
		$(BUILD_DIR)/flacEncodeWorker.min.js \
		$(BUILD_DIR)/flacEncodeWorker.min.map \
		$(BUILD_DIR)/device_selection_popup_bundle.min.js \
		$(BUILD_DIR)/device_selection_popup_bundle.min.map \
		$(BUILD_DIR)/dial_in_info_bundle.min.js \
		$(BUILD_DIR)/dial_in_info_bundle.min.map \
		$(BUILD_DIR)/alwaysontop.min.js \
		$(BUILD_DIR)/alwaysontop.min.map \
		$(OUTPUT_DIR)/analytics-ga.js \
		$(BUILD_DIR)/analytics-ga.min.js \
		$(BUILD_DIR)/analytics-ga.min.map \
		$(BUILD_DIR)/video-blur-effect.min.js \
		$(BUILD_DIR)/video-blur-effect.min.map \
		$(BUILD_DIR)/rnnoise-processor.min.js \
		$(BUILD_DIR)/rnnoise-processor.min.map \
		$(BUILD_DIR)/close3.min.js \
		$(BUILD_DIR)/close3.min.map \
		$(DEPLOY_DIR)

deploy-lib-jitsi-meet:
	cp \
		$(LIBJITSIMEET_DIR)/lib-jitsi-meet.min.js \
		$(LIBJITSIMEET_DIR)/lib-jitsi-meet.min.map \
		$(LIBJITSIMEET_DIR)/connection_optimization/external_connect.js \
		$(LIBJITSIMEET_DIR)/modules/browser/capabilities.json \
		$(DEPLOY_DIR)

deploy-libflac:
	cp \
		$(LIBFLAC_DIR)/libflac4-1.3.2.min.js \
		$(LIBFLAC_DIR)/libflac4-1.3.2.min.js.mem \
		$(DEPLOY_DIR)

deploy-rnnoise-binary:
	cp \
		$(RNNOISE_WASM_DIR)/rnnoise.wasm \
		$(DEPLOY_DIR)

deploy-css:
	$(NODE_SASS) $(STYLES_MAIN) $(STYLES_BUNDLE) && \
	$(CLEANCSS) --skip-rebase $(STYLES_BUNDLE) > $(STYLES_DESTINATION)/all.css ; \
	rm $(STYLES_BUNDLE)

deploy-html:
	cp -r *.js *.html resources/*.txt connection_optimization scripts/include-virtual.js scripts/serve-static.sh favicon.ico fonts images libs static sounds LICENSE lang $(DEPLOY_ENTRYPOINT)

deploy-local:
	([ ! -x deploy-local.sh ] || ./deploy-local.sh)

.NOTPARALLEL:
dev: deploy-init deploy-css deploy-rnnoise-binary deploy-lib-jitsi-meet deploy-libflac
	$(WEBPACK_DEV_SERVER) --detect-circular-deps

source-package:
	mkdir -p source_package/jitsi-meet/css && \
	cp -r *.js *.html resources/*.txt connection_optimization favicon.ico fonts images libs static sounds LICENSE lang source_package/jitsi-meet && \
	cp css/all.css source_package/jitsi-meet/css && \
	(cd source_package ; tar cjf ../jitsi-meet.tar.bz2 jitsi-meet) && \
	rm -rf source_package
