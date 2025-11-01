const { romanToArabic, arabicToRoman, isValidRoman, isValidArabic } = require('../lib/Convertidor');

// ===== TESTS: ROMANO → ARÁBIGO =====
describe('Función romanToArabic', () => {
  
  describe('Conversiones básicas', () => {
    test('debe convertir números simples', () => {
      expect(romanToArabic('I')).toBe(1);
      expect(romanToArabic('V')).toBe(5);
      expect(romanToArabic('X')).toBe(10);
      expect(romanToArabic('L')).toBe(50);
      expect(romanToArabic('C')).toBe(100);
      expect(romanToArabic('D')).toBe(500);
      expect(romanToArabic('M')).toBe(1000);
    });

    test('debe convertir números aditivos', () => {
      expect(romanToArabic('II')).toBe(2);
      expect(romanToArabic('III')).toBe(3);
      expect(romanToArabic('VI')).toBe(6);
      expect(romanToArabic('VII')).toBe(7);
      expect(romanToArabic('VIII')).toBe(8);
      expect(romanToArabic('XI')).toBe(11);
      expect(romanToArabic('XV')).toBe(15);
      expect(romanToArabic('XX')).toBe(20);
      expect(romanToArabic('XXX')).toBe(30);
    });

    test('debe manejar sustracción correcta (IV, IX, XL, XC, CD, CM)', () => {
      expect(romanToArabic('IV')).toBe(4);
      expect(romanToArabic('IX')).toBe(9);
      expect(romanToArabic('XL')).toBe(40);
      expect(romanToArabic('XC')).toBe(90);
      expect(romanToArabic('CD')).toBe(400);
      expect(romanToArabic('CM')).toBe(900);
    });
  });

  describe('Conversiones complejas', () => {
    test('debe convertir números complejos correctamente', () => {
      expect(romanToArabic('MCMXCIX')).toBe(1999);
      expect(romanToArabic('MMXXIV')).toBe(2024);
      expect(romanToArabic('MDCCLXXVI')).toBe(1776);
      expect(romanToArabic('MCMXLIV')).toBe(1944);
      expect(romanToArabic('MMMCMXCIX')).toBe(3999); // Máximo
    });
  });

  describe('Manejo de mayúsculas/minúsculas', () => {
    test('debe aceptar minúsculas', () => {
      expect(romanToArabic('ix')).toBe(9);
      expect(romanToArabic('mcmxcix')).toBe(1999);
    });

    test('debe aceptar mixto de mayúsculas y minúsculas', () => {
      expect(romanToArabic('MmXxIv')).toBe(2024);
    });
  });

  describe('Validaciones y errores', () => {
    test('debe rechazar caracteres inválidos', () => {
      expect(() => romanToArabic('ABC')).toThrow('Caracteres inválidos');
      expect(() => romanToArabic('IXZ')).toThrow('Caracteres inválidos');
      expect(() => romanToArabic('123')).toThrow('Caracteres inválidos');
      expect(() => romanToArabic('IV5')).toThrow('Caracteres inválidos');
    });

    test.skip('debe rechazar cadenas vacías', () => {
      expect(() => romanToArabic('')).toThrow('vacía');
      expect(() => romanToArabic('   ')).toThrow('vacía');
    });

    test('debe rechazar formato incorrecto (IIII en lugar de IV)', () => {
      expect(() => romanToArabic('IIII')).toThrow('Formato romano inválido');
      expect(() => romanToArabic('VV')).toThrow('Formato romano inválido');
      expect(() => romanToArabic('XXXX')).toThrow('Formato romano inválido');
    });
  });
});

// ===== TESTS: ARÁBIGO → ROMANO =====
describe('Función arabicToRoman', () => {
  
  describe('Conversiones básicas', () => {
    test('debe convertir números simples', () => {
      expect(arabicToRoman(1)).toBe('I');
      expect(arabicToRoman(5)).toBe('V');
      expect(arabicToRoman(10)).toBe('X');
      expect(arabicToRoman(50)).toBe('L');
      expect(arabicToRoman(100)).toBe('C');
      expect(arabicToRoman(500)).toBe('D');
      expect(arabicToRoman(1000)).toBe('M');
    });

    test('debe manejar sustracción (4, 9, 40, 90, 400, 900)', () => {
      expect(arabicToRoman(4)).toBe('IV');
      expect(arabicToRoman(9)).toBe('IX');
      expect(arabicToRoman(40)).toBe('XL');
      expect(arabicToRoman(90)).toBe('XC');
      expect(arabicToRoman(400)).toBe('CD');
      expect(arabicToRoman(900)).toBe('CM');
    });
  });

  describe('Conversiones complejas', () => {
    test('debe convertir números complejos correctamente', () => {
      expect(arabicToRoman(1999)).toBe('MCMXCIX');
      expect(arabicToRoman(2024)).toBe('MMXXIV');
      expect(arabicToRoman(1776)).toBe('MDCCLXXVI');
      expect(arabicToRoman(1944)).toBe('MCMXLIV');
      expect(arabicToRoman(3999)).toBe('MMMCMXCIX'); // Máximo
    });

    test('debe manejar casos especiales', () => {
      expect(arabicToRoman(1)).toBe('I');
      expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
      expect(arabicToRoman(444)).toBe('CDXLIV');
      expect(arabicToRoman(888)).toBe('DCCCLXXXVIII');
    });
  });

  describe('Validaciones y errores', () => {
    test('debe rechazar números fuera de rango (< 1)', () => {
      expect(() => arabicToRoman(0)).toThrow('mayor que 0');
      expect(() => arabicToRoman(-1)).toThrow('mayor que 0');
      expect(() => arabicToRoman(-100)).toThrow('mayor que 0');
    });

    test('debe rechazar números fuera de rango (> 3999)', () => {
      expect(() => arabicToRoman(4000)).toThrow('menor o igual a 3999');
      expect(() => arabicToRoman(5000)).toThrow('menor o igual a 3999');
      expect(() => arabicToRoman(10000)).toThrow('menor o igual a 3999');
    });

    test('debe rechazar números decimales', () => {
      expect(() => arabicToRoman(1.5)).toThrow('entero');
      expect(() => arabicToRoman(3.14)).toThrow('entero');
      expect(() => arabicToRoman(10.99)).toThrow('entero');
    });
  });
});

// ===== TESTS: FUNCIONES AUXILIARES =====
describe('Funciones auxiliares', () => {
  
  describe('isValidRoman', () => {
    test('debe validar números romanos correctos', () => {
      expect(isValidRoman('XIV')).toBe(true);
      expect(isValidRoman('MCMXCIX')).toBe(true);
      expect(isValidRoman('I')).toBe(true);
    });

    test('debe rechazar números romanos incorrectos', () => {
      expect(isValidRoman('ABC')).toBe(false);
      expect(isValidRoman('IIII')).toBe(false);
      expect(isValidRoman('')).toBe(false);
    });
  });

  describe('isValidArabic', () => {
    test('debe validar números válidos', () => {
      expect(isValidArabic(1)).toBe(true);
      expect(isValidArabic(1999)).toBe(true);
      expect(isValidArabic(3999)).toBe(true);
    });

    test('debe rechazar números inválidos', () => {
      expect(isValidArabic(0)).toBe(false);
      expect(isValidArabic(4000)).toBe(false);
      expect(isValidArabic(1.5)).toBe(false);
    });
  });
});

// ===== TESTS DE INTEGRACIÓN: CONVERSIÓN BIDIRECCIONAL =====
describe('Integración: conversión bidireccional', () => {
  
  test('debe ser consistente al convertir ida y vuelta', () => {
    // Arábigo → Romano → Arábigo
    const testNumbers = [1, 4, 9, 14, 44, 99, 444, 999, 1444, 1999, 2024, 3999];
    
    testNumbers.forEach(num => {
      const roman = arabicToRoman(num);
      const backToArabic = romanToArabic(roman);
      expect(backToArabic).toBe(num);
    });
  });

  test('debe ser consistente al convertir Romano → Arábigo → Romano', () => {
    const testRomans = ['I', 'IV', 'IX', 'XIV', 'XLIV', 'XCIX', 'CDXLIV', 'CMXCIX', 'MCMXLIV', 'MCMXCIX', 'MMXXIV'];
    
    testRomans.forEach(roman => {
      const arabic = romanToArabic(roman);
      const backToRoman = arabicToRoman(arabic);
      expect(backToRoman).toBe(roman);
    });
  });
});