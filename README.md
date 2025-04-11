# pysw-2025-tps
Trabajos prácticos de la cursada 2025
# Requisitos Generales

## Editor de Código

Se recomienda utilizar **Visual Studio Code** con los complementos:

- **HTML CSS Support**: para mejorar la autocompleción y sugerencias.
- **Live Server**: para visualizar el sitio en un servidor local de manera instantánea.

## Estructura del Proyecto

- Utilizar **HTML5** para la estructura del contenido con etiquetas semánticas (`header`, `nav`, `footer`, `section`, `aside`, `article`).
- Aplicar estilos desde un archivo **CSS externo** para mantener una organización limpia.
- Utilizar el **modelo de cajas de CSS (box model)** para definir la disposición de los elementos.

---

# Estructura del Sitio Web: Gimnasio

## 1. Página Principal (Home)

- **Encabezado (Header)** con un **mega-menú desplegable**, con opciones como:
  - Clases
  - Entrenadores
  - Precios
- **Sección Hero** con:
  - Video de fondo (por ejemplo, de un entrenamiento motivacional)
  - Overlay de texto animado
- **Clases destacadas**: tarjetas (cards) con efectos hover y transiciones CSS.
- **Contador animado** con `@keyframes` (Ejemplo: "500+ socios satisfechos").
- **Testimonios** en un carrusel solo con CSS.
- **Pie de página (Footer)** con:
  - Formulario para suscripción al newsletter
  - Enlaces a redes sociales
  - Mapa interactivo embebido (Google Maps o OpenStreetMap)

## 2. Página de Clases (Grid Avanzado + Filtros)

- Sistema de **filtrado por categoría** (Musculación, CrossFit, Yoga, Spinning) utilizando solo CSS (`:checked` y combinadores).
- **Galería tipo "masonry"** con CSS Grid, con imágenes de diferentes alturas. Tarjetas con información y efectos de zoom/overlay al pasar el cursor.
- **Tabla responsiva de horarios semanales**, adaptada para móviles y escritorio.

## 3. Página de Entrenadores (Perfiles Interactivos)

- Tarjetas con **efecto flip** (rotación al hacer hover para ver detalles).
- **Barra de habilidades animada** (Ejemplo: Fuerza 90%, Flexibilidad 80%).
- Sistema de **rating con estrellas animadas** (solo CSS).

## 4. Formulario de Contacto Avanzado

- **Validación en tiempo real** usando `:valid` y `:invalid`.
- **Spinner de carga** en CSS al enviar.
- Diseño **responsivo** con Flexbox y Grid.
- **Modal de confirmación** tras envío exitoso.

## 5. Página de Precios (Comparador de Planes)

- Tabla de precios con **efecto de resaltado** al hacer hover.
- **Toggle mensual/anual**, cambiando los precios solo con CSS.
- **Tooltips explicativos** (Ejemplo: "Incluye acceso ilimitado").

## 6. Blog de Fitness (Estilo Revista)

- Diseño tipo **"newspaper"** usando CSS Grid.
- Sistema de **tags y categorías** con filtrado solo CSS.
- Sección de **comentarios estilizada**, con avatares creados con CSS y pseudoelementos.
- **Efecto Scroll Reveal**, donde los artículos aparecen al hacer scroll.

---

# Técnicas Avanzadas a Implementar

## CSS Avanzado

- Uso de **Custom Properties** (Variables CSS) para definir colores y temas.
- **Clip-path & Masking** para imágenes con formas creativas.
- **Scroll Snap** para secciones que encajan perfectamente.
- **Modo Oscuro (Dark Mode)** con CSS Variables y mínimo uso de JavaScript.

## Animaciones y Efectos

- **Micro-interacciones** en botones, enlaces y tarjetas.
- **Transiciones SVG** en logo e iconos.
- **Keyframes** para animaciones avanzadas (contador, spinner, etc.).

## Accesibilidad

- **Contraste adecuado** (estándares AA/AAA).
- **Estados de focus visibles** para navegación con teclado.
- Uso de **ARIA labels** para elementos interactivos.

---

# Entregables

Los alumnos deben entregar:

1. Código HTML y CSS bien estructurado.
2. Documentación técnica explicando decisiones de diseño y código.
3. **Demo publicada** en GitHub Pages o Netlify.
4. **Video de presentación** con las funcionalidades implementadas.

---

## Páginas de referencia

- [https://www.gymtop.com.ar/](https://www.gymtop.com.ar/)

