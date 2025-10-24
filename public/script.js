document.addEventListener('DOMContentLoaded', () => {

    // --- Conversor 1: Romano -> Arábigo ---
    const toArabicButton = document.getElementById('toArabicButton');
    const romanInput = document.getElementById('romanInput');
    const arabicResultText = document.getElementById('arabicResultText');

    const convertRoman = async () => {
        const roman = romanInput.value.trim();
        if (!roman) {
            arabicResultText.textContent = 'Ingresa un valor.';
            return;
        }
        arabicResultText.textContent = 'Calculando...';
        try {
            // Llama a la API con ?roman=...
            const res = await fetch(`/api/index?roman=${encodeURIComponent(roman)}`);
            const data = await res.json();
            arabicResultText.textContent = res.ok ? data.result : `Error: ${data.error}`;
        } catch (error) {
            arabicResultText.textContent = 'Error de conexión.';
        }
    };
    toArabicButton.addEventListener('click', convertRoman);
    romanInput.addEventListener('keypress', (e) => (e.key === 'Enter') && convertRoman());

    // --- Conversor 2: Arábigo -> Romano ---
    const toRomanButton = document.getElementById('toRomanButton');
    const arabicInput = document.getElementById('arabicInput');
    const romanResultText = document.getElementById('romanResultText');

    const convertArabic = async () => {
        const arabic = arabicInput.value.trim();
        if (!arabic) {
            romanResultText.textContent = 'Ingresa un valor.';
            return;
        }
        romanResultText.textContent = 'Calculando...';
        try {
            // Llama a la MISMA API con ?arabic=...
            const res = await fetch(`/api/index?arabic=${encodeURIComponent(arabic)}`);
            const data = await res.json();
            romanResultText.textContent = res.ok ? data.result : `Error: ${data.error}`;
        } catch (error) {
            romanResultText.textContent = 'Error de conexión.';
        }
    };
    toRomanButton.addEventListener('click', convertArabic);
    arabicInput.addEventListener('keypress', (e) => (e.key === 'Enter') && convertArabic());
});