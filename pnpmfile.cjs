// pnpmfile.cjs
module.exports = {
  hooks: {
    allowBuild(pkg) {
      // Aprova automaticamente pacotes que precisam rodar scripts de build
      if (pkg.name === '@tailwindcss/oxide' || pkg.name === 'esbuild') {
        return true
      }
      return false
    }
  }
}
