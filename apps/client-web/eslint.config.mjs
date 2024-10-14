// @ts-check

import eslint from '@eslint/js'
import perfectionist from 'eslint-plugin-perfectionist'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  perfectionist.configs['recommended-alphabetical'],
  {
    ignores: ['.turbo', 'dist'],
  },
)
