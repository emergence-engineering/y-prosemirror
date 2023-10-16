import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

/**
 * in order to use Yjs' testing framework, we need to depend on the bare-bone (untransformed) Yjs bundle
 */
/*
const debugResolve = {
  resolveId (importee) {
    if (importee === 'yjs') {
      return `${process.cwd()}/node_modules/yjs/src/index.js`
    }
  }
}
*/

export default [{
  input: './src/y-prosemirror.js',
  output: [{
    name: 'Y',
    file: 'dist2/y-prosemirror.cjs',
    format: 'cjs',
    sourcemap: true
  }],
  external: id => /^(lib0|y-protocols|prosemirror|yjs)/.test(id)
}, {
  input: './test/index.js',
  output: {
    name: 'test',
    file: 'dist2/test.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    // debugResolve,
    nodeResolve({
      mainFields: ['module', 'browser', 'main']
    }),
    commonjs()
  ]
}, {
  input: './demo/prosemirror.js',
  output: {
    name: 'demo',
    file: 'demo/dist2/prosemirror.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'browser', 'main']
    }),
    commonjs()
  ]
}, {
  input: './test/index.node.js',
  output: {
    name: 'test',
    file: 'dist2/test.cjs',
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    // debugResolve,
    nodeResolve({
      mainFields: ['module', 'main']
    }),
    commonjs()
  ],
  external: id => /^(lib0|prosemirror|fs|path|jsdom|isomorphic)/.test(id)
}]
