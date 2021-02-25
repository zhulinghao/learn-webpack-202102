/**
 * plugins: https://babeljs.io/docs/en/plugins
 */
// babel.config.js
/**
 * @babel/preset-env 与 @babel/plugin-transform-runtime 使用差别
 * https://segmentfault.com/a/1190000021188054
 * preset-env: polyfill全局, 污染全局
 * runtime: 沙盒, 只影响编译代码
 */
 const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true },
      modules: false,
      targets: {
        node: 'current'
      }
    }
  ],
  '@babel/preset-typescript'
]

const plugins = [
  // [
  //   'transform-async-to-module-method',
  //   {
  //     module: 'bluebird',
  //     method: 'coroutine'
  //   }
  // ],
  // '@babel/plugin-transform-typescript',
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: { version: 3, proposals: true },
      absoluteRuntime: false,
      helpers: true,
      regenerator: true,
      useESModules: false
    }
  ],
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  // '@babel/plugin-proposal-do-expressions',
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  // '@babel/plugin-proposal-json-strings',
  // '@babel/plugin-proposal-function-sent',
  // '@babel/plugin-proposal-numeric-separator',
  // '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-logical-assignment-operators',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  ['@babel/proposal-pipeline-operator', { proposal: 'fsharp' }],
  '@babel/plugin-proposal-object-rest-spread',
  // https://babeljs.io/docs/en/babel-plugin-transform-named-capturing-groups-regex
  '@babel/plugin-transform-named-capturing-groups-regex'
]

const env = {
  test: {
    presets: ['@babel/preset-env'],
    plugins: ['dynamic-import-node', '@babel/plugin-transform-modules-commonjs']
  }
}

module.exports = (api) => {
  api.cache(true)
  return {
    env,
    presets,
    plugins,
    sourceType: 'unambiguous'
  }
}
