// pnpmfile.cjs
module.exports = {
  hooks: {
    allowBuild(pkg) {
      if (pkg.name === '@tailwindcss/oxide' || pkg.name === 'esbuild') {
        return true
      }
      return false
    }
  }
}
