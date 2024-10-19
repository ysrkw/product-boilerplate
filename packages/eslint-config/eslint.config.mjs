import repo from './src/index.mjs'

export default [
  ...repo.configs.node,
  {
    ignores: ['.turbo', 'dist'],
  },
]
