const nunjucks = require("nunjucks");
const {join, sep} = require("path");

const templateDir = join(hexo.theme_dir, "layout", "_tag") + sep;
const config = Object.assign({"autoescape": false}, hexo.config.nunjucks);
const env = nunjucks.configure(templateDir, config);
for (const name in hexo.extend.helper.list()) {
    env.addFilter(name, hexo.extend.helper.get(name));
}

for (const tpl_name of hexo.config.tag_partials || []) {
    if (tpl_name.has_inner) {
        tpl_name = tpl_name.name
    }
    const fn = (_args, content) => env.render(
        tpl_name + ".njk",
        {
            arguments: env,
            body: content,
        })
    hexo.extend.tag.register(tpl_name, fn)
}
