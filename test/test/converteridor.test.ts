// Importamos las funciones que queremos probar
import { romanToArabic, arabicToRoman } from '../../lib/Convertidor';

// Pruebas para Roman -> Arabic
describe('Función romanToArabic', () => {
  it('debe convertir números complejos', () => {
    expect(romanToArabic('MCMXCIX')).toBe(1999);
    expect(romanToArabic('MMXXIV')).toBe(2024);
  });

  it('debe manejar sustracción (ej. IV, IX)', () => {
    expect(romanToArabic('IV')).toBe(4);
    expect(romanToArabic('IX')).toBe(9);
  });

  it('debe manejar mayúsculas y minúsculas', () => {
    expect(romanToArabic('ix')).toBe(9);
  });

  it('debe lanzar un error con caracteres inválidos', () => {
    expect(() => romanToArabic('ABC')).toThrow('Caracteres romanos inválidos.');
  });
});

// Pruebas para Arabic -> Roman
describe('Función arabicToRoman', () => {
  it('debe convertir números complejos', () => {
    expect(arabicToRoman(1999)).toBe('MCMXCIX');
    expect(arabicToRoman(2024)).toBe('MMXXIV');
  });

  it('debe manejar sustracción (ej. 4, 9)', () => {
    expect(arabicToRoman(4)).toBe('IV');
    expect(arabicToRoman(9)).toBe('IX');
  });

  it('debe lanzar un error con números fuera de rango', () => {
    expect(() => arabicToRoman(0)).toThrow('Número inválido');
    expect(() => arabicToRoman(4000)).toThrow('Número inválido');
    expect(() => arabicToRoman(1.5)).toThrow('Número inválido');
  });
});