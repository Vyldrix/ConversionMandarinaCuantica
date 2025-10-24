import type { VercelRequest, VercelResponse } from '@vercel/node';
// Importamos AMBAS funciones de nuestra lógica
import { romanToArabic, arabicToRoman } from '../lib/Convertidor';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Leemos los parámetros de la URL (?roman=... o ?arabic=...)
  const { roman, arabic } = req.query;

  // Ruta 1: Convertir de Romano a Arábigo
  if (typeof roman === 'string') {
    try {
      const arabicNumber = romanToArabic(roman);
      return res.status(200).json({ input: roman, result: arabicNumber });
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Error al procesar.';
      return res.status(400).json({ error: message });
    }
  }

  // Ruta 2: Convertir de Arábigo a Romano
  if (typeof arabic === 'string') {
    const num = parseInt(arabic, 10);
    if (isNaN(num)) {
      return res.status(400).json({ error: 'El valor arábigo debe ser un número.' });
    }
    try {
      const romanNumber = arabicToRoman(num);
      return res.status(200).json({ input: num, result: romanNumber });
    } catch (error) {
      const message = (error instanceof Error) ? error.message : 'Error al procesar.';
      return res.status(400).json({ error: message });
    }
  }

  // Si no se provee ninguno
  return res.status(400).json({ error: "Parámetro no válido. Usa 'roman' o 'arabic'." });
}