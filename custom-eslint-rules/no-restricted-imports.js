export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Restrict imports between specific directories',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value
        const filePath = context.getFilename().replace(/\\/g, '/')

        const getImportRoot = (path) => {
          const match = path.match(/^@?(pages|widgets|features|entities|app)/)
          return match ? match[1] : null
        }

        const getCurrentRoot = (path) => {
          const match = path.match(/\/(pages|widgets|features|entities|app)\//)
          return match ? match[1] : null
        }

        const importRoot = getImportRoot(source)
        const currentRoot = getCurrentRoot(filePath)

        if (currentRoot && importRoot === currentRoot && source.includes('/')) {
          context.report({
            node,
            message: `Forbidden import between subdirectories in ${currentRoot}: "${source}".`,
          })
        }

        const restrictedImports = {
          pages: ['app'],
          widgets: ['app', 'pages'],
          features: ['app', 'pages', 'widgets'],
          entities: ['app', 'pages', 'widgets', 'features'],
        }

        if (
          currentRoot &&
          restrictedImports[currentRoot] &&
          restrictedImports[currentRoot].includes(importRoot)
        ) {
          context.report({
            node,
            message: `Forbidden import from "${importRoot}" to "${currentRoot}": "${source}".`,
          })
        }
      },
    }
  },
}
