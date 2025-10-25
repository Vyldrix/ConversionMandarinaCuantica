module.exports = {
  // Usa ts-jest para archivos TypeScript
  preset: 'ts-jest',
  
  // Entorno de pruebas (node para backend)
  testEnvironment: 'node',
  
  // Patrón para encontrar archivos de prueba
  testMatch: [
    '**/test/**/*.test.ts',
    '**/__tests__/**/*.test.ts'
  ],
  
  // Archivos a ignorar
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/.vercel/'
  ],
  
  // Cobertura de código
  collectCoverageFrom: [
    'lib/**/*.ts',
    'api/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  
  // Directorios a ignorar para cobertura
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/dist/'
  ],
  
  // Umbrales de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Directorio para reportes de cobertura
  coverageDirectory: 'coverage',
  
  // Formatos de reporte de cobertura
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],
  
  // Configuración de ts-jest
  globals: {
    'ts-jest': {
      tsconfig: {
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }
  },
  
  // Timeout para tests (5 segundos)
  testTimeout: 5000,
  
  // Verbose output
  verbose: true,
  
  // Limpiar mocks automáticamente entre tests
  clearMocks: true,
  
  // Restaurar mocks automáticamente entre tests
  restoreMocks: true
};