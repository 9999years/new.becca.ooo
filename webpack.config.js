const path = require('path')
const glob_entries = require('webpack-glob-entries')

const source_root = 'source/'
const script_root = 'source/scripts/'

function glob(...globs) {
    return Object.assign(...globs.map(glob => {
        const entries = glob_entries(glob)
        for(const k in entries) {
            entries[k] = path.relative(source_root, entries[k])
        }
        return entries
    }))
}

const prepend = (base, ...suffixes) => suffixes.map(s => base + s)

module.exports = {
    mode: 'none',
    entry: glob(...prepend("source/scripts/**/*.", "js", "ts", "tsx")),
    output: {
        filename: (dat) => path.join('scripts',
            // preserve intermediate dirs, e.g. 'unicode/' in
            // 'unicode/abbreviate.js'
            path.relative(
                path.join(__dirname, script_root),
                dat.chunk.entryModule.context,
                ),
            `${dat.chunk.name}.bundle.js`,
            ),
        //filename: 'scripts/[name].bundle.js',
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
}
