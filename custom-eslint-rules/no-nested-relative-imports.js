export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow relative imports with depth greater than 1',
      category: 'Possible Errors',
      fixable: 'code',
      recommended: false,
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value

        if (!source.startsWith('.') || source.includes('/assets')) {
          return
        }

        const parts = source.replace(/(?<=^|\/)(\.\.\/|\.\/)/g, '').split('/')

        const depth = parts.length

        if (depth > 1) {
          context.report({
            node,
            message: `Relative imports with depth greater than 1 are not allowed (${source}).`,
          })
        }
      },
    }
  },
}
