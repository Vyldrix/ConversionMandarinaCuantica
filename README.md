# 🏛️ Conversor Romano-Arábigo

Aplicación web para convertir números romanos a arábigos y viceversa, con una interfaz temática romana elegante.

## ✨ Características

- ✅ Conversión bidireccional (Romano ⇄ Arábigo)
- ✅ Validación de entrada en tiempo real
- ✅ Interfaz con diseño romano clásico
- ✅ Pruebas automatizadas con Jest
- ✅ CI/CD con GitHub Actions
- ✅ Desplegado en Vercel

## 🚀 Demo en Vivo

[Ver Demo](https://vercel.com/vyldrixs-projects/conversion-mandarina-cuantica)

## 🛠️ Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: TypeScript, Node.js
- **Testing**: Jest, ts-jest
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel

## 📦 Instalación Local
```bash
# Clonar repositorio
git clone https://github.com/Vyldrix/ConversionMandarinaCuantica.git
cd tu-repo

# Instalar dependencias
npm install

# Ejecutar pruebas
npm test

# Desarrollo local
vercel dev
```

## 🧪 Pruebas
```bash
# Ejecutar todas las pruebas
npm test

# Modo watch
npm run test:watch
```

## 📝 API

### Convertir Romano a Arábigo
```
GET /api/index?roman=XIV
Response: {"input":"XIV","result":14}
```

### Convertir Arábigo a Romano
```
GET /api/index?arabic=14
Response: {"input":14,"result":"XIV"}
```

## 🎨 Diseño

Interfaz inspirada en la arquitectura romana clásica con:
- Columnas decorativas
- Paleta de colores dorado/rojo/mármol
- Tipografía Cinzel (estilo romano)
- Animaciones sutiles

## 📄 Licencia

ISC

## 👤 Autor

**Loyola Lautaro**
