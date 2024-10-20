import repo from '@repo/eslint-config'

export default [
  ...repo.configs.node,
  {
    ignores: ['.turbo', 'dist'],
  },
]
