// pnpmfile.cjs
module.exports = {
  hooks: {
    readPackage(pkg) {
      return pkg
    },
    filterLog(log) {
      if (log.code === 'ERR_PNPM_IGNORED_BUILDS') {
        return false
      }
      return true
    },
    allowBuild(pkg) {
      // Aprova automaticamente esses pacotes
      if (pkg.name === '@tailwindcss/oxide' || pkg.name === 'esbuild') {
        return true
      }
      return false
    }
  }
}
