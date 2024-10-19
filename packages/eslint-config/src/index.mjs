import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

export default {
  configs: {
    node: tseslint.config(
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      perfectionist.configs['recommended-alphabetical'],
      unicorn.configs['flat/all'],
      prettier,
    ),
    react: tseslint.config(
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
      perfectionist.configs['recommended-alphabetical'],
      unicorn.configs['flat/all'],
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      prettier,
      {
        plugins: {
          'react-hooks': reactHooks,
        },
        rules: {
          ...reactHooks.configs.recommended.rules,
        },
        settings: {
          react: {
            version: 'detect',
          },
        },
      },
    ),
  },
}
