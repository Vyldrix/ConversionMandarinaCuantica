const { romanToArabic, arabicToRoman } = require('../lib/Convertidor');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejo de preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo acepta GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Método no permitido. Usa GET.' 
    });
  }

  const { roman, arabic } = req.query;

  // Log para debugging (visible en Vercel logs)
  console.log('Request received:', { roman, arabic, method: req.method });

  // Ruta 1: Convertir de Romano a Arábigo
  if (roman) {
    if (typeof roman !== 'string') {
      return res.status(400).json({ 
        error: 'El parámetro "roman" debe ser una cadena de texto.' 
      });
    }

    try {
      const arabicNumber = romanToArabic(roman);
      console.log(`Conversión exitosa: ${roman} → ${arabicNumber}`);
      
      return res.status(200).json({ 
        input: roman.toUpperCase(), 
        result: arabicNumber,
        type: 'roman-to-arabic'
      });
    } catch (error) {
      console.error('Error en conversión romano→arábigo:', error);
      const message = error.message || 'Error desconocido al procesar.';
      
      return res.status(400).json({ 
        error: message,
        input: roman
      });
    }
  }

  // Ruta 2: Convertir de Arábigo a Romano
  if (arabic) {
    if (typeof arabic !== 'string') {
      return res.status(400).json({ 
        error: 'El parámetro "arabic" debe ser un número.' 
      });
    }

    const num = parseInt(arabic, 10);
    
    if (isNaN(num)) {
      return res.status(400).json({ 
        error: 'El valor arábigo debe ser un número válido.',
        input: arabic
      });
    }

    try {
      const romanNumber = arabicToRoman(num);
      console.log(`Conversión exitosa: ${num} → ${romanNumber}`);
      
      return res.status(200).json({ 
        input: num, 
        result: romanNumber,
        type: 'arabic-to-roman'
      });
    } catch (error) {
      console.error('Error en conversión arábigo→romano:', error);
      const message = error.message || 'Error desconocido al procesar.';
      
      return res.status(400).json({ 
        error: message,
        input: num
      });
    }
  }

  // Si no se provee ningún parámetro
  return res.status(400).json({ 
    error: "Parámetros faltantes. Usa 'roman' o 'arabic'.",
    examples: {
      'romano-a-arabigo': '/api/index?roman=XIV',
      'arabigo-a-romano': '/api/index?arabic=14'
    }
  });
};