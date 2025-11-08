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
      return res.status(422).json({ 
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
    
    // 422 Unprocessable Entity - TODOS los errores de Convertidor.js son reglas de negocio
    // Excepto los que son claramente de validacion basica (null, undefined, tipo incorrecto)
    
    // Si el error menciona cualquiera de estas cosas, es un error 422 (regla de negocio):
    if (
      errorMessage.includes('Caracteres invalidos') ||
      errorMessage.includes('Caracteres inválidos') ||
      errorMessage.includes('Formato romano invalido') ||
      errorMessage.includes('Formato romano inválido') ||
      errorMessage.includes('fuera del rango') ||
      errorMessage.includes('vacia') ||
      errorMessage.includes('vacía') ||
      errorMessage.includes('no es la representacion correcta') ||
      errorMessage.includes('no es la representación correcta') ||
      errorMessage.includes('Solo se permiten') ||
      errorMessage.includes('representacion correcta') ||
      errorMessage.includes('representación correcta')
    ) {
      return res.status(422).json({ 
        error: 'Numero romano invalido.',
        input: romanNumeral,
        details: errorMessage
      });
    }
    
    // 400 Bad Request - Errores de validacion muy basica
    if (
      errorMessage.includes('cadena de texto valida') ||
      errorMessage.includes('cadena de texto válida') ||
      errorMessage.includes('proporcionar')
    ) {
      return res.status(400).json({ 
        error: 'Parametro roman invalido.',
        input: romanNumeral,
        details: errorMessage
      });
    }
    
    // Por defecto, asumimos que cualquier error del Convertidor es 422 (regla de negocio)
    // porque ya validamos tipo y presencia arriba
    return res.status(422).json({ 
      error: 'Numero romano invalido.',
      input: romanNumeral,
      details: errorMessage
    });
  }
};