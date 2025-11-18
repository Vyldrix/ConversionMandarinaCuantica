# 🏛️ Conversor Romano-Arábigo

Aplicación web moderna para convertir números romanos a arábigos y viceversa, con una interfaz temática romana elegante al estilo pixel-art retro.

## ✨ Características Principales

- ✅ **Conversión bidireccional** (Romano ⇄ Arábigo)
- ✅ **Validación en tiempo real** con manejo robusto de errores
- ✅ **Interfaz pixel-art** inspirada en juegos retro
- ✅ **API RESTful** con endpoints especializados
- ✅ **Tests automatizados** con Jest (66.91% coverage)
- ✅ **CI/CD** integrado con GitHub Actions
- ✅ **Desplegado en Vercel** con configuración optimizada
- ✅ **Documentación completa** de API y código

## 🚀 Demo en Vivo

🔗 **[Ver Aplicación en Producción](https://conversion-mandarina-cuantica.vercel.app)**

## 🛠️ Tecnologías

### Frontend
- **HTML5, CSS3, JavaScript (Vanilla)**
- Diseño pixel-art responsivo
- Fuentes: Press Start 2P & VT323
- Animaciones CSS personalizadas

### Backend
- **Node.js** (>= 18.0.0)
- **TypeScript** para tipado estático
- **Vercel Serverless Functions**

### Testing & CI/CD
- **Jest** ^30.2.0 para testing
- **GitHub Actions** para integración continua
- **Vercel** para despliegue automático

### DevOps
- **Vercel** - Hosting y serverless
- **Git** - Control de versiones
- **npm** - Gestión de paquetes

## 💻 Instalación Local

### Requisitos Previos
- Node.js >= 18.0.0
- npm o yarn
- Git

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Vyldrix/ConversionMandarinaCuantica.git
cd ConversionMandarinaCuantica

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo local
npm run dev
# O usando Vercel CLI
vercel dev

# 4. Abrir en navegador
# http://localhost:3000
```

## 🎯 Uso de la Aplicación

### Interfaz Web

1. **Romano → Arábigo**
   - Ingresa números romanos (ej: `XIV`, `MCMXCIX`)
   - Presiona "Convertir" o Enter
   - Visualiza el resultado instantáneo

2. **Arábigo → Romano**
   - Ingresa números entre 1 y 3999
   - Presiona "Convertir" o Enter
   - Visualiza el número romano equivalente

### Ejemplos de Conversión

| Número Romano | Número Arábigo |
|---------------|----------------|
| I             | 1              |
| IV            | 4              |
| XIV           | 14             |
| MCMXCIX       | 1999           |
| MMXXIV        | 2024           |
| MMMCMXCIX     | 3999           |

## 📡 Documentación de API

### Endpoint Principal: `/api/index`

Endpoint unificado que maneja ambas conversiones según el parámetro proporcionado.

#### Romano → Arábigo

```http
GET /api/index?roman=XIV
```

**Respuesta exitosa (200):**
```json
{
  "input": "XIV",
  "result": 14,
  "type": "roman-to-arabic"
}
```

#### Arábigo → Romano

```http
GET /api/index?arabic=14
```

**Respuesta exitosa (200):**
```json
{
  "input": 14,
  "result": "XIV",
  "type": "arabic-to-roman"
}
```

### Endpoints Especializados

#### `/api/r2a` - Romano a Arábigo

```http
GET /api/r2a?roman=XIV
```

**Respuesta (200):**
```json
{
  "arabic": 14
}
```

#### `/api/a2r` - Arábigo a Romano

```http
GET /api/a2r?arabic=14
```

**Respuesta (200):**
```json
{
  "roman": "XIV"
}
```

### Códigos de Estado HTTP

| Código | Descripción | Ejemplo |
|--------|-------------|---------|
| `200` | Conversión exitosa | `{"arabic": 14}` |
| `400` | Error de validación básica | `{"error": "Parametro roman requerido"}` |
| `405` | Método no permitido | `{"error": "Metodo no permitido. Usa GET."}` |
| `422` | Error de regla de negocio | `{"error": "Numero romano invalido", "details": "..."}` |

### Ejemplos de Errores

**Parámetro faltante (400):**
```json
{
  "error": "Parametro roman requerido.",
  "example": "/api/r2a?roman=XIV",
  "received": {}
}
```

**Número romano inválido (422):**
```json
{
  "error": "Numero romano invalido.",
  "input": "IIII",
  "details": "Formato romano inválido. \"IIII\" no es la representación correcta. ¿Quisiste decir \"IV\"?"
}
```

**Número fuera de rango (422):**
```json
{
  "error": "Numero arabico invalido.",
  "input": 4000,
  "details": "El número debe ser menor o igual a 3999."
}
```

### Headers CORS

Todos los endpoints incluyen headers CORS para permitir peticiones desde cualquier origen:

```http
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Modo watch (desarrollo)
npm run test:watch

# Generar reporte de cobertura
npm run test:coverage
```

**Cobertura por módulo:**
- `lib/Convertidor.js`: 95.83% statements
- `api/r2a.js`: 81.48% statements
- `api/a2r.js`: 88.46% statements
- `api/index.js`: 0% (no testeado directamente)

### Tests Incluidos

#### Tests de Lógica de Negocio (`test/convertidor.test.js`)
- ✅ Conversiones básicas y complejas
- ✅ Manejo de sustracción romana
- ✅ Validación de entrada
- ✅ Conversión bidireccional
- ✅ Funciones auxiliares

#### Tests de API (`test/api.test.js`)
- ✅ Respuestas exitosas (200)
- ✅ Errores de validación (400)
- ✅ Método no permitido (405)
- ✅ Errores de negocio (422)
- ✅ Headers CORS
- ✅ Tests de integración

## 📁 Estructura del Proyecto

```
ConversionMandarinaCuantica/
├── .github/
│   └── workflows/
│       └── CR.yml                    # GitHub Actions CI/CD
├── api/
│   ├── index.js                      # Endpoint unificado
│   ├── r2a.js                        # Romano → Arábigo
│   └── a2r.js                        # Arábigo → Romano
├── lib/
│   └── Convertidor.js                # Lógica de conversión
├── public/
│   ├── index.html                    # Interfaz web
│   ├── style.css                     # Estilos pixel-art
│   └── script.js                     # Lógica frontend
├── test/
│   ├── convertidor.test.js           # Tests de lógica
│   └── api.test.js                   # Tests de API
├── coverage/                         # Reportes de cobertura
├── .gitignore                        # Archivos ignorados
├── jest.config.js                    # Configuración de Jest
├── package.json                      # Dependencias y scripts
├── vercel.json                       # Configuración de Vercel
└── README.md                         # Este archivo
```

## 🔄 CI/CD

### GitHub Actions

El proyecto incluye un pipeline de CI/CD que se ejecuta automáticamente:

**Triggers:**
- Push a `main` o `develop`
- Pull requests a `main`

**Jobs:**
1. **Test** - Ejecuta tests en Node 18.x y 20.x
2. **Lint** - Verifica TypeScript (sin bloquear)
3. **Build** - Compila el proyecto

```yaml
# .github/workflows/CR.yml
- Test en múltiples versiones de Node
- Generación de reportes de cobertura
- Verificación de TypeScript
- Build del proyecto
```

### Despliegue en Vercel

**Despliegue automático:**
- Cada push a `main` despliega a producción
- Pull requests generan preview deployments

**Despliegue manual:**
```bash
# Desarrollo
vercel

# Producción
vercel --prod
```

## 📖 Reglas de Conversión

### Sistema Romano

**Símbolos básicos:**
- I = 1
- V = 5
- X = 10
- L = 50
- C = 100
- D = 500
- M = 1000

**Reglas de sustracción:**
- I antes de V o X (IV = 4, IX = 9)
- X antes de L o C (XL = 40, XC = 90)
- C antes de D o M (CD = 400, CM = 900)

**Restricciones:**
- Solo números del 1 al 3999
- No se permiten más de 3 repeticiones consecutivas (III válido, IIII inválido)
- No se permiten restas incorrectas (IL inválido, debe ser XLIX)

### Validaciones Implementadas

**Romano → Arábigo:**
- ✅ Solo caracteres válidos (I, V, X, L, C, D, M)
- ✅ Formato correcto (IV en lugar de IIII)
- ✅ Conversión bidireccional para verificar validez
- ✅ Rango 1-3999

**Arábigo → Romano:**
- ✅ Números enteros (sin decimales)
- ✅ Mayor que 0
- ✅ Menor o igual a 3999

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

1. **Fork** el proyecto
2. **Crea una rama** para tu feature
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. **Commit** tus cambios
   ```bash
   git commit -m 'Agrega nueva característica'
   ```
4. **Push** a la rama
   ```bash
   git push origin feature/nueva-caracteristica
   ```
5. **Abre un Pull Request**

### Guidelines

- Agrega tests para nuevas funcionalidades
- Mantén la cobertura de tests por encima del 60%
- Sigue el estilo de código existente
- Actualiza la documentación si es necesario

## 🐛 Reportar Bugs

Abre un issue en GitHub con:
- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Versión de Node.js

## 📜 Licencia

Este proyecto está bajo la Licencia ISC.

```
ISC License
```

## 👤 Autor

**Loyola Lautaro**

- GitHub: [@Vyldrix](https://github.com/Vyldrix)
- Proyecto: [ConversionMandarinaCuantica](https://github.com/Vyldrix/ConversionMandarinaCuantica)

## 🙏 Agradecimientos

- Inspirado en el sistema numérico romano clásico
- Diseño pixel-art retro para una experiencia nostálgica
- Comunidad open-source por las herramientas utilizadas

---

<div align="center">

*"Audentes fortuna iuvat"* - La fortuna sonríe a los valientes

</div>
