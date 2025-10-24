module.exports = {
  preset: 'ts-jest', // Usa ts-jest para archivos TypeScript
  testEnvironment: 'node', // El entorno de pruebas
  testMatch: [
    "**/test/**/*.test.ts" // Patrón para encontrar archivos de prueba
  ],
};