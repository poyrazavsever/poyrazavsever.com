# Pixel Sınav: Mi Proyecto de Aprendizaje Más Completo

Hola, soy Poyraz Avsever. Como parte de mi proceso de aprendizaje en el desarrollo de software, creé un proyecto llamado **Pixel Sınav** con el objetivo de mejorar mis habilidades técnicas y construir un producto significativo.

Pixel Sınav es una plataforma educativa integral desarrollada con tecnologías web modernas. Los docentes pueden crear contenido de cursos y los estudiantes pueden seguir su progreso de aprendizaje.

En esta publicación, compartiré el proceso de desarrollo del proyecto, las tecnologías que utilicé, los desafíos que enfrenté, lo que aprendí y mis planes futuros.

---

## Objetivo y Contexto del Proyecto

Este proyecto nació de dos motivaciones principales:

1. Quería desarrollar proyectos de mayor calidad, más amplios y técnicamente más desafiantes.
2. Quería aprender tecnologías orientadas al backend como **NestJS** y **Docker**.

Además, mi interés en las tecnologías educativas y mi deseo de contribuir en este campo ayudaron a definir el concepto de Pixel Sınav. En un mundo donde la digitalización de la educación es cada vez mayor, quise crear una plataforma que ofreciera contenido útil para el aprendizaje.

---

## ¿Por qué una plataforma educativa?

La tecnología educativa (EdTech) está alineada con mis objetivos personales y también aporta valor social. La idea de un sistema donde los docentes puedan generar contenido fácilmente y los estudiantes puedan aprender a su propio ritmo me pareció tanto motivadora como técnicamente desafiante.

Gracias a este proyecto, pude aplicar muchos conceptos de frontend y backend de forma práctica.

---

## Stack Tecnológico

Decidí permanecer dentro del ecosistema JavaScript. Esto me permitió trabajar con Next.js y NestJS, utilizando **TypeScript** tanto en el frontend como en el backend.

### Tecnologías Principales

| Tecnología | Icono | Descripción |
|------------|--------|--------------|
| **Next.js** | ![Next.js](https://skillicons.dev/icons?i=next) | Framework moderno basado en React con renderizado del lado del servidor |
| **React** | ![React](https://skillicons.dev/icons?i=react) | Librería para construir interfaces de usuario |
| **TailwindCSS** | ![Tailwind](https://skillicons.dev/icons?i=tailwind) | Framework de CSS con enfoque utility-first |
| **NestJS** | ![NestJS](https://skillicons.dev/icons?i=nestjs) | Framework progresivo basado en Node.js y TypeScript |
| **MongoDB** | ![MongoDB](https://skillicons.dev/icons?i=mongodb) | Base de datos NoSQL orientada a documentos |
| **TypeScript** | ![TS](https://skillicons.dev/icons?i=ts) | Superconjunto tipado de JavaScript |
| **Docker** | ![Docker](https://skillicons.dev/icons?i=docker) | Tecnología de contenedores para entornos aislados |
| **Jest** | ![Jest](https://skillicons.dev/icons?i=jest) | Framework de pruebas para JavaScript |

### Otras Librerías

- **Framer Motion** – Animaciones fluidas
- **React Markdown** – Soporte para contenido en Markdown
- **Chart.js + react-chartjs-2** – Visualización del progreso del estudiante
- **React Hot Toast** – Sistema de notificaciones amigable

---

## Proceso de Diseño

Me inspiré en la plataforma [Codedex](https://www.codedex.io/). Su paleta de colores, tipografía limpia y diseño centrado en el usuario influyeron en muchas de mis decisiones.

Diseñé la interfaz yo mismo, enfocándome en:

- Contrastes de color adecuados
- Tipografía legible
- Espaciado y márgenes consistentes
- Sistema de diseño responsive para móviles

**Repositorio Frontend**: [GitHub - PixelSinav-Frontend](https://github.com/poyrazavsever/PixelSinav-Frontend)  
**Repositorio Backend**: [GitHub - PixelSinav-Backend](https://github.com/poyrazavsever/PixelSinav-Backend)

---

## Roles de Usuario y Estructura

Pixel Sınav tiene dos tipos principales de usuarios:

1. **Docente:** Puede crear cursos, añadir contenido y ver el progreso de los estudiantes.
2. **Estudiante:** Puede inscribirse en cursos, leer contenido y seguir su propio progreso.

El sistema se construyó con autenticación, autorización y endpoints protegidos según los roles.

---

## Proceso de Desarrollo

### Primeros pasos

Comencé con el frontend. Inicialmente construí el sistema de autenticación con JWT, incluyendo login y registro. Luego, desarrollé el panel de docentes y el módulo de creación de cursos.

### Integración del Backend

Aprendí NestJS desde cero. Los mayores desafíos fueron crear una arquitectura modular y generar documentación de API con Swagger.

Funciones implementadas:

- Registro e inicio de sesión de usuarios
- Autenticación segura con JWT
- Sistema de verificación por correo electrónico
- Creación, visualización y eliminación de cursos
- Filtro de cursos por docente

---

## Autenticación y Autorización

En el backend con NestJS, implementé autenticación basada en JWT. Se protegieron rutas según los roles y la documentación de la API se generó con Swagger/OpenAPI.

### Endpoints de ejemplo

- `POST /auth/register` – Registro de usuario
- `POST /auth/login` – Inicio de sesión con token
- `POST /lessons` – Crear curso (solo para docentes)
- `GET /lessons/teacher/:id` – Obtener cursos por docente

---

## Pruebas, Validación y Seguridad

- **Validation Pipe**: Todas las solicitudes se validan con `class-validator`
- **Jest**: Pruebas unitarias e integradas con Jest
- **Rate Limiting**: Límite de solicitudes por hora para usuarios no autenticados

---

## Lo que Aprendí

Este proyecto me permitió aprender y practicar:

- Arquitectura de APIs con NestJS
- MongoDB Aggregation para consultas avanzadas
- Principios de Clean Architecture en backend
- Diseño UI responsive desde cero

---

## Planes Futuros

Planeo seguir desarrollando Pixel Sınav. Algunos puntos de la hoja de ruta:

- Aplicación móvil con React Native
- Sistema avanzado de análisis de resultados de exámenes
- Notificaciones en tiempo real
- Panel de administración con reportes

---

## Conclusión

Pixel Sınav es más que un proyecto para mí. Es un reflejo de mi progreso, de lo que he aprendido y de lo que puedo lograr cuando me esfuerzo.

Si tú también estás en un camino similar, puedes clonar el proyecto, contribuir o dejar una estrella en GitHub.

---

## Enlaces Útiles

- [Repositorio Frontend](https://github.com/poyrazavsever/PixelSinav-Frontend)
- [Repositorio Backend](https://github.com/poyrazavsever/PixelSinav-Backend)
- [Diseño en Figma](https://www.figma.com/design/9lpzqI7EmUKKfEh0S7vfWO/Pixel-S%C4%B1nav?node-id=0-1&p=f&t=CHImoBwT1CzSSeqd-0)
- [LinkedIn](https://www.linkedin.com/in/poyrazavsever)
- [Correo electrónico](mailto:poyrazavsever@gmail.com)

---

Gracias por leer.
