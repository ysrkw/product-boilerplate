// @ts-check

import repo from '@repo/eslint-config'

export default [
  ...repo.configs.react,
  {
    ignores: ['.turbo', 'dist'],
  },
]
