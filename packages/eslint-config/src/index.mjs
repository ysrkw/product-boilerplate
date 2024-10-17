// @ts-check

import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'

const node = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  perfectionist.configs['recommended-alphabetical'],
  unicorn.configs['flat/recommended'],
  prettier,
)

const react = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  perfectionist.configs['recommended-alphabetical'],
  unicorn.configs['flat/recommended'],
  prettier,
)

export default {
  configs: {
    node,
    react,
  },
}
