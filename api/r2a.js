const { romanToArabic } = require('../lib/Convertidor');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejo de preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 405 Method Not Allowed - Solo acepta GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Metodo no permitido. Usa GET.',
      method: req.method,
      allowed: ['GET']
    });
  }

  const romanNumeral = req.query.roman;

  // 400 Bad Request - Parametro faltante
  if (!romanNumeral) {
    return res.status(400).json({ 
      error: 'Parametro roman requerido.',
      example: '/api/r2a?roman=XIV',
      received: req.query
    });
  }

  // 400 Bad Request - Debe ser string
  if (typeof romanNumeral !== 'string') {
    return res.status(400).json({ 
      error: 'El parametro "roman" debe ser una cadena de texto.',
      received_type: typeof romanNumeral
    });
  }

  // Intentar conversion con manejo completo de excepciones
  try {
    const arabicNumber = romanToArabic(romanNumeral);
    
    // Verificacion adicional por si la funcion retorna null
    if (arabicNumber === null || arabicNumber === undefined) {
      return res.status(400).json({ 
        error: 'Numero romano invalido.',
        input: romanNumeral,
        reason: 'La conversion retorno un valor nulo o indefinido'
      });
    }

    console.log(`Conversion exitosa: ${romanNumeral} -> ${arabicNumber}`);
    
    // 200 OK - Conversion exitosa
    return res.status(200).json({ 
      arabic: arabicNumber 
    });

  } catch (error) {
    console.error('Error en conversion romano->arabigo:', error.message);
    
    const errorMessage = error.message || 'Error desconocido';
    
    // TODOS los errores de validación de formato romano son 400
    // porque son errores en la entrada del usuario
    return res.status(400).json({ 
      error: 'Numero romano invalido.',
      input: romanNumeral,
      details: errorMessage
    });
  }
};