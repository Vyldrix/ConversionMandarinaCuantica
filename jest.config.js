module.exports = {
  // Entorno de pruebas
  testEnvironment: 'node',
  
  // Patrón para encontrar archivos de prueba
  testMatch: [
    '**/test/**/*.test.js',
    '**/__tests__/**/*.test.js'
  ],
  
  // Archivos a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/.vercel/'
  ],
  
  // Cobertura de código
  collectCoverageFrom: [
    'lib/**/*.js',
    'api/**/*.js',
    '!**/node_modules/**'
  ],
  
  // Directorios a ignorar para cobertura
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/dist/'
  ],
  
  // Directorio para reportes de cobertura
  coverageDirectory: 'coverage',
  
  // Formatos de reporte de cobertura
  coverageReporters: [
    'text',
    'text-summary',
    'html'
  ],
  
  // Timeout para tests (5 segundos)
  testTimeout: 5000,
  
  // Verbose output
  verbose: true,
  
  // Limpiar mocks automáticamente entre tests
  clearMocks: true,
  
  // Restaurar mocks automáticamente entre tests
  restoreMocks: true
};