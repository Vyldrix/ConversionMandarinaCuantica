// --- De Arábigo a Romano ---
export function arabicToRoman(num: number): string {
  if (num <= 0 || num > 3999 || !Number.isInteger(num)) {
    throw new Error("Número inválido. Debe ser un entero entre 1 y 3999.");
  }

  const arabicMap: { [key: string]: number } = {
    'M': 1000, 'CM': 900, 'D': 500, 'CD': 400, 'C': 100, 'XC': 90,
    'L': 50, 'XL': 40, 'X': 10, 'IX': 9, 'V': 5, 'IV': 4, 'I': 1,
  };

  let result = '';
  let numberToConvert = num;

  for (const key of Object.keys(arabicMap)) {
    const value = arabicMap[key];
    while (numberToConvert >= value) {
      result += key;
      numberToConvert -= value;
    }
  }
  return result;
}

// --- De Romano a Arábigo ---
export function romanToArabic(roman: string): number {
  const romanMap: { [key: string]: number } = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000,
  };

  let result = 0;
  const input = roman.toUpperCase();

  if (!/^[IVXLCDM]+$/.test(input)) {
    throw new Error("Caracteres romanos inválidos.");
  }

  for (let i = 0; i < input.length; i++) {
    const currentVal = romanMap[input[i]];
    const nextVal = romanMap[input[i + 1]];

    if (nextVal && currentVal < nextVal) {
      result -= currentVal; // Sustracción (IV, IX, etc.)
    } else {
      result += currentVal; // Adición
    }
  }
  return result;
}