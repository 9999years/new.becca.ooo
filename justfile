server:
	./node_modules/hexo/bin/hexo server --debug --verbose

build:
	./node_modules/hexo/bin/hexo generate --verbose

# Install development deps.
install:
	npm install
	pip3 install --user yamllint
	git lfs fetch
	git lfs checkout

# Update all deps in package.json to their latest release
update-all:
	npx npm-check-updates -u
