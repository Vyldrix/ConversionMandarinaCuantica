/**
 * Conversor de números Romanos ⇄ Arábigos
 * Rango válido: 1-3999
 */

// ===== CONVERTIR DE ARÁBIGO A ROMANO =====
function arabicToRoman(num) {
  // Validación de entrada
  if (!Number.isInteger(num)) {
    throw new Error('El número debe ser un entero (sin decimales).');
  }

  if (num <= 0) {
    throw new Error('El número debe ser mayor que 0.');
  }

  if (num > 3999) {
    throw new Error('El número debe ser menor o igual a 3999.');
  }

  // Mapeo de valores romanos (orden descendente)
  const romanMap = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ];

  let result = '';
  let remaining = num;

  // Construir el número romano
  for (const [roman, value] of romanMap) {
    while (remaining >= value) {
      result += roman;
      remaining -= value;
    }
  }

  return result;
}

// ===== CONVERTIR DE ROMANO A ARÁBIGO =====
function romanToArabic(roman) {
  // Validación de entrada
  if (!roman || typeof roman !== 'string') {
    throw new Error('Debes proporcionar una cadena de texto válida.');
  }

  const input = roman.trim().toUpperCase();

  if (input.length === 0) {
    throw new Error('La cadena no puede estar vacía.');
  }

  // Validar que solo contenga caracteres romanos válidos
  if (!/^[IVXLCDM]+$/.test(input)) {
    throw new Error('Caracteres inválidos. Solo se permiten: I, V, X, L, C, D, M');
  }

  // Mapeo de valores individuales
  const romanMap = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  let result = 0;

  // Procesar cada carácter
  for (let i = 0; i < input.length; i++) {
    const currentVal = romanMap[input[i]];
    const nextVal = romanMap[input[i + 1]];

    // Si el valor actual es menor que el siguiente, restamos (sustracción romana)
    if (nextVal && currentVal < nextVal) {
      result -= currentVal;
    } else {
      result += currentVal;
    }
  }

  // Validación adicional: verificar que el resultado esté en rango
  if (result <= 0 || result > 3999) {
    throw new Error(`El resultado (${result}) está fuera del rango válido (1-3999).`);
  }

  // Validación de formato: convertir de vuelta y comparar
  // (evita aceptar números mal formados como "IIII" en lugar de "IV")
  try {
    const backToRoman = arabicToRoman(result);
    if (backToRoman !== input) {
      throw new Error(
        `Formato romano inválido. "${input}" no es la representación correcta. ` +
        `¿Quisiste decir "${backToRoman}"?`
      );
    }
  } catch (error) {
    // Si falla la conversión de vuelta, el formato era incorrecto
    if (error.message && error.message.includes('Formato romano inválido')) {
      throw error;
    }
  }

  return result;
}

// ===== FUNCIONES AUXILIARES (OPCIONAL) =====

/**
 * Verifica si una cadena es un número romano válido
 */
function isValidRoman(roman) {
  try {
    romanToArabic(roman);
    return true;
  } catch {
    return false;
  }
}

/**
 * Verifica si un número se puede convertir a romano
 */
function isValidArabic(num) {
  try {
    arabicToRoman(num);
    return true;
  } catch {
    return false;
  }
}

// Exportar las funciones
module.exports = {
  arabicToRoman,
  romanToArabic,
  isValidRoman,
  isValidArabic
};