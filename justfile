server:
	./node_modules/hexo/bin/hexo server --debug --verbose

build:
	./node_modules/hexo/bin/hexo generate --verbose

# Install build deps
install:
	npm install
	git lfs fetch
	git lfs checkout

# Update all deps in package.json to their latest release
update-all:
	npx npm-check-updates -u
