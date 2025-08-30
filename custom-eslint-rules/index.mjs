import noNestedRelativeImports from './no-nested-relative-imports.js'
import customNoRestrictedImports from './no-restricted-imports.js'

export default {
  rules: {
    'no-nested-relative-imports': noNestedRelativeImports,
    'no-restricted-imports': customNoRestrictedImports,
  },
}
