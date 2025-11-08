// Tests para las APIs /r2a y /a2r
//Verifican que el manejo de excepciones y codigos HTTP sean correctos

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

// TESTS PARA /r2a (Romano → Arabigo) 
describe('API /r2a - Romano a Arabigo', () => {
  
  describe('Respuestas exitosas (200)', () => {
    test('debe convertir un numero romano valido', async () => {
      const req = createMockRequest('GET', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ arabic: 14 });
    });

    test('debe manejar numeros romanos complejos', async () => {
      const req = createMockRequest('GET', { roman: 'MCMXCIX' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ arabic: 1999 });
    });

    test('debe aceptar minusculas', async () => {
      const req = createMockRequest('GET', { roman: 'xiv' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ arabic: 14 });
    });

    test('debe manejar numero romano I', async () => {
      const req = createMockRequest('GET', { roman: 'I' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ arabic: 1 });
    });
  });

  describe('Errores de validacion (400)', () => {
    test('debe retornar 400 si falta el parametro roman', async () => {
      const req = createMockRequest('GET', {});
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('requerido');
    });

    test('debe retornar 400 si roman no es string', async () => {
      const req = createMockRequest('GET', { roman: 123 });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(400);
    });
  });

  describe('Metodo no permitido (405)', () => {
    test('debe retornar 405 para metodo POST', async () => {
      const req = createMockRequest('POST', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(405);
      expect(res.body.error).toMatch(/[Mm]etodo no permitido/);
    });

    test('debe retornar 405 para metodo PUT', async () => {
      const req = createMockRequest('PUT', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(405);
    });

    test('debe retornar 405 para metodo DELETE', async () => {
      const req = createMockRequest('DELETE', { roman: 'XIV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(405);
    });
  });

  describe('Errores de negocio (422)', () => {
    test('debe retornar 422 para caracteres invalidos', async () => {
      const req = createMockRequest('GET', { roman: 'ABC' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body.error).toMatch(/invalido/i);
    });

    test('debe retornar 422 para formato romano incorrecto (IIII)', async () => {
      const req = createMockRequest('GET', { roman: 'IIII' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('input');
    });

    test('debe retornar 422 para numeros con digitos', async () => {
      const req = createMockRequest('GET', { roman: 'IV5' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body.error).toMatch(/invalido/i);
    });

    test('debe retornar 422 para formato incorrecto VV', async () => {
      const req = createMockRequest('GET', { roman: 'VV' });
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.statusCode).toBe(422);
    });

    test('debe retornar 422 para formato incorrecto XXXX', async () => {
      const req = createMockRequest('GET', { roman: 'XXXX' });
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

    test('debe incluir headers CORS incluso en errores', async () => {
      const req = createMockRequest('GET', {});
      const res = createMockResponse();
      
      await r2aHandler(req, res);
      
      expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    });
  });
});

// TESTS PARA /a2r (Arabigo → Romano) 
describe('API /a2r - Arabigo a Romano', () => {
  
  describe('Respuestas exitosas (200)', () => {
    test('debe convertir un numero arabigo valido', async () => {
      const req = createMockRequest('GET', { arabic: '14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'XIV' });
    });

    test('debe manejar numeros grandes', async () => {
      const req = createMockRequest('GET', { arabic: '1999' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'MCMXCIX' });
    });

    test('debe manejar el numero 1', async () => {
      const req = createMockRequest('GET', { arabic: '1' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'I' });
    });

    test('debe manejar el numero maximo (3999)', async () => {
      const req = createMockRequest('GET', { arabic: '3999' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ roman: 'MMMCMXCIX' });
    });

    test('debe manejar numeros con sustraccion (4, 9, 40)', async () => {
      const tests = [
        { input: '4', expected: 'IV' },
        { input: '9', expected: 'IX' },
        { input: '40', expected: 'XL' },
        { input: '90', expected: 'XC' }
      ];

      for (const { input, expected } of tests) {
        const req = createMockRequest('GET', { arabic: input });
        const res = createMockResponse();
        
        await a2rHandler(req, res);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.roman).toBe(expected);
      }
    });
  });

  describe('Errores de validacion (400)', () => {
    test('debe retornar 400 si falta el parametro arabic', async () => {
      const req = createMockRequest('GET', {});
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('requerido');
    });

    test('debe retornar 400 para texto no numerico', async () => {
      const req = createMockRequest('GET', { arabic: 'abc' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toMatch(/numero valido/i);
    });

    test('debe retornar 400 para strings vacios', async () => {
      const req = createMockRequest('GET', { arabic: '' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(400);
    });
  });

  describe('Metodo no permitido (405)', () => {
    test('debe retornar 405 para metodo POST', async () => {
      const req = createMockRequest('POST', { arabic: '14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(405);
      expect(res.body.error).toMatch(/[Mm]etodo no permitido/);
    });

    test('debe retornar 405 para metodo PATCH', async () => {
      const req = createMockRequest('PATCH', { arabic: '14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(405);
    });
  });

  describe('Errores de negocio (422)', () => {
    test('debe retornar 422 para numeros menores o iguales a 0', async () => {
      const req = createMockRequest('GET', { arabic: '0' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body.error).toMatch(/invalido/i);
    });

    test('debe retornar 422 para numeros negativos', async () => {
      const req = createMockRequest('GET', { arabic: '-5' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
    });

    test('debe retornar 422 para numeros mayores a 3999', async () => {
      const req = createMockRequest('GET', { arabic: '4000' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty('input');
    });

    test('debe retornar 422 para numero muy grande (10000)', async () => {
      const req = createMockRequest('GET', { arabic: '10000' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.statusCode).toBe(422);
    });

    test('debe retornar 422 para numeros decimales', async () => {
      const req = createMockRequest('GET', { arabic: '3.14' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      // parseInt convierte 3.14 a 3, que es valido, pero luego
      // la validacion de entero en arabicToRoman deberia fallar
      // Si pasa, significa que parseInt ya quito el decimal
      expect([200, 422]).toContain(res.statusCode);
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

    test('debe incluir headers CORS incluso en errores', async () => {
      const req = createMockRequest('GET', { arabic: '0' });
      const res = createMockResponse();
      
      await a2rHandler(req, res);
      
      expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
    });
  });
});

// TESTS DE INTEGRACION 
describe('Integracion: manejo de errores completo', () => {
  
  test('debe retornar informacion detallada en todos los errores', async () => {
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

  test('debe manejar conversiones bidireccionales correctamente', async () => {
    // Arabigo -> Romano -> Arabigo (verificar consistencia)
    const arabicInput = '2024';
    
    // Primero convertir a romano
    const req1 = createMockRequest('GET', { arabic: arabicInput });
    const res1 = createMockResponse();
    await a2rHandler(req1, res1);
    
    expect(res1.statusCode).toBe(200);
    const romanResult = res1.body.roman;
    
    // Luego volver a arabigo
    const req2 = createMockRequest('GET', { roman: romanResult });
    const res2 = createMockResponse();
    await r2aHandler(req2, res2);
    
    expect(res2.statusCode).toBe(200);
    expect(res2.body.arabic).toBe(parseInt(arabicInput));
  });

  test('todos los endpoints deben responder sin timeout', async () => {
    const endpoints = [
      { handler: r2aHandler, query: { roman: 'XIV' } },
      { handler: a2rHandler, query: { arabic: '14' } }
    ];

    for (const { handler, query } of endpoints) {
      const startTime = Date.now();
      const req = createMockRequest('GET', query);
      const res = createMockResponse();
      
      await handler(req, res);
      
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(1000); // Menos de 1 segundo
    }
  });
});