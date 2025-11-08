//Tests para las APIs /r2a y /a2r
//Verifican que el manejo de excepciones y códigos HTTP sean correctos

const r2aHandler = require('../api/r2a');
const a2rHandler = require('../api/a2r');

// Mock de req y res para simular peticiones HTTP
function createMockRequest(method = 'GET', query = {}) {
  return {
    method,
    query
  };
}

function createMockResponse() {
  const res = {
    statusCode: null,
    headers: {},
    body: null,
    
    status(code) {
      this.statusCode = code;
      return this;
    },
    
    json(data) {
      this.body = data;
      return this;
    },
    
    setHeader(key, value) {
      this.headers[key] = value;
      return this;
    },
    
    end() {
      return this;
    }
  };
  
  return res;
}

// TESTS PARA /r2a (Romano → Arábigo)
describe('API /r2a - Romano a Arábigo', () => {
  
  describe('Respuestas exitosas (200)', () => {
    test('debe convertir un número romano válido', async () => {
      const req = createMockRequest('GET', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ arabic: 14 });
    });

    test('debe manejar números romanos complejos', async () => {
      const req = createMockRequest('GET', { roman: 'MCMXCIX' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ arabic: 1999 });
    });

    test('debe aceptar minúsculas', async () => {
      const req = createMockRequest('GET', { roman: 'xiv' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ arabic: 14 });
    });
  });

  describe('Errores de validación (400)', () => {
    test('debe retornar 400 si falta el parámetro roman', async () => {
      const req = createMockRequest('GET', {});
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('requerido');
    });
  });

  describe('Método no permitido (405)', () => {
    test.skip('debe retornar 405 para método POST', async () => {
      const req = createMockRequest('POST', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(405);
      expect(res.body.error).toContain('Método no permitido');
    });

    test('debe retornar 405 para método PUT', async () => {
      const req = createMockRequest('PUT', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(405);
    });
  });

  describe('Errores de negocio (422)', () => {
    test.skip('debe retornar 422 para caracteres inválidos', async () => {
      const req = createMockRequest('GET', { roman: 'ABC' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body.error).toContain('invalido');
    });

    test.skip('debe retornar 422 para formato romano incorrecto', async () => {
      const req = createMockRequest('GET', { roman: 'IIII' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('details');
    });

    test.skip('debe retornar 422 para números con dígitos', async () => {
      const req = createMockRequest('GET', { roman: 'IV5' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(422);
    });
  });

  describe('CORS headers', () => {
    test('debe incluir headers CORS en todas las respuestas', async () => {
      const req = createMockRequest('GET', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
      expect(res.headers['Access-Control-Allow-Methods']).toContain('GET');
    });
  });
});

// TESTS PARA /a2r (Arábigo → Romano) 
describe('API /a2r - Arábigo a Romano', () => {
  
  describe('Respuestas exitosas (200)', () => {
    test('debe convertir un número arábigo válido', async () => {
      const req = createMockRequest('GET', { arabic: '14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'XIV' });
    });

    test('debe manejar números grandes', async () => {
      const req = createMockRequest('GET', { arabic: '1999' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'MCMXCIX' });
    });

    test('debe manejar el número 1', async () => {
      const req = createMockRequest('GET', { arabic: '1' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'I' });
    });

    test('debe manejar el número máximo (3999)', async () => {
      const req = createMockRequest('GET', { arabic: '3999' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'MMMCMXCIX' });
    });
  });

  describe('Errores de validación (400)', () => {
    test('debe retornar 400 si falta el parámetro arabic', async () => {
      const req = createMockRequest('GET', {});
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('requerido');
    });

    test.skip('debe retornar 400 para texto no numérico', async () => {
      const req = createMockRequest('GET', { arabic: 'abc' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('número válido');
    });
  });

  describe('Método no permitido (405)', () => {
    test.skip('debe retornar 405 para método POST', async () => {
      const req = createMockRequest('POST', { arabic: '14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(405);
      expect(res.body.error).toContain('Método no permitido');
    });
  });

  describe('Errores de negocio (422)', () => {
    test('debe retornar 422 para números menores o iguales a 0', async () => {
      const req = createMockRequest('GET', { arabic: '0' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body.error).toContain('invalido');
    });

    test('debe retornar 422 para números negativos', async () => {
      const req = createMockRequest('GET', { arabic: '-5' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
    });

    test('debe retornar 422 para números mayores a 3999', async () => {
      const req = createMockRequest('GET', { arabic: '4000' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('details');
    });

    test.skip('debe retornar 422 para números decimales', async () => {
      const req = createMockRequest('GET', { arabic: '3.14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
    });
  });

  describe('CORS headers', () => {
    test('debe incluir headers CORS en todas las respuestas', async () => {
      const req = createMockRequest('GET', { arabic: '14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
      expect(res.headers['Access-Control-Allow-Methods']).toContain('GET');
    });
  });
});

// TESTS DE INTEGRACIÓN
describe('Integración: manejo de errores completo', () => {
  
  test('debe retornar información detallada en todos los errores', async () => {
    const testCases = [
      { api: r2aHandler, query: { roman: 'IIII' } },
      { api: a2rHandler, query: { arabic: '0' } },
      { api: a2rHandler, query: { arabic: '5000' } }
    ];

    for (const { api, query } of testCases) {
      const req = createMockRequest('GET', query);
      const res = createMockResponse();
      
      await api(req, res);
      
      // Todos los errores deben tener un campo "error"
      expect(res.body).toHaveProperty('error');
      
      // Y al menos uno de estos campos adicionales
      expect(
        res.body.hasOwnProperty('details') || 
        res.body.hasOwnProperty('input') ||
        res.body.hasOwnProperty('reason')
      ).toBe(true);
    }
  });
});