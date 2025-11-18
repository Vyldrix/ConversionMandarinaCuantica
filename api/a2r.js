const { arabicToRoman } = require('../lib/Convertidor');

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

  const arabicParam = req.query.arabic;

  // 400 Bad Request - Parametro faltante
  if (!arabicParam) {
    return res.status(400).json({ 
      error: 'Parametro arabic requerido.',
      example: '/api/a2r?arabic=14',
      received: req.query
    });
  }

  const arabicNumber = parseInt(arabicParam, 10);

  // 400 Bad Request - Debe ser un numero valido
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ 
      error: 'El parametro "arabic" debe ser un numero valido.',
      input: arabicParam,
      received_type: typeof arabicParam
    });
  }

  // Intentar conversion con manejo completo de excepciones
  try {
    const romanNumeral = arabicToRoman(arabicNumber);
    
    // Verificacion adicional por si la funcion retorna null
    if (romanNumeral === null || romanNumeral === undefined) {
      return res.status(400).json({ 
        error: 'Numero arabico invalido.',
        input: arabicNumber,
        reason: 'La conversion retorno un valor nulo o indefinido'
      });
    }

    console.log(`Conversion exitosa: ${arabicNumber} -> ${romanNumeral}`);
    
    // 200 OK - Conversion exitosa
    return res.status(200).json({ 
      roman: romanNumeral 
    });

  } catch (error) {
    console.error('Error en conversion arabigo->romano:', error.message);
    
    const errorMessage = error.message || 'Error desconocido';
    
    // TODOS los errores de validación de rango o formato son 400
    // porque son errores en la entrada del usuario
    return res.status(400).json({ 
      error: 'Numero arabico invalido.',
      input: arabicNumber,
      details: errorMessage
    });
  }
};