# Changelog

## 0.3.5 — Restauración del emblema de pausa

- Corregida la regresión de v0.3.4 que podía dejar visible solamente el título de pausa.
- La pausa ya no depende del `img` nativo de Foundry para mostrar el emblema.
- Añadida una capa visual propia `.tm-pause-emblem-visual`.
- El asset grande y el emblema oficial probado se dibujan como fondos apilados, proporcionando fallback visual real.
- El `img` nativo se mantiene únicamente como respaldo semántico y se oculta en la composición.
- El pulso arcano sigue sin escalar el raster; solo cambia la iluminación.
- Actualizado el comportamiento responsive de la pausa.
- Confirmado en la captura de v0.3.4 que barra izquierda, hotbar y bordes recortados quedaron corregidos.
- La ficha de personaje continúa fuera del alcance.

## 0.3.4 — Pulido visual y emblema nítido

- Añadido `tm-emblem-official-large.webp` de alta resolución para la pantalla de pausa.
- La pausa deja de reutilizar el asset liviano pensado para iconos pequeños.
- Eliminado el escalado animado del emblema durante el pulso arcano; ahora solo anima iluminación para evitar interpolación y desenfoque.
- Reducido el glow del emblema para preservar detalle fino.
- Ajustada la barra izquierda con mayor padding y botones centrados.
- Añadido espacio mínimo seguro alrededor de los controles de escena.
- Eliminada la roseta inferior del panel izquierdo que podía quedar cortada.
- Eliminados los ornamentos globales de esquina que se superponían al botón de selección de tokens.
- Eliminado el remate inferior global que podía verse parcialmente fuera del viewport.
- Eliminada la línea ornamental inferior de la hotbar que podía asomar cortada.
- La ficha de personaje continúa fuera del alcance.

## 0.3.3 — Anclaje real de la hotbar

- Confirmado mediante la captura real que `#hotbar` ocupa una caja de aplicación mucho mayor que la barra visible.
- Eliminados los remates laterales anclados al contenedor completo, responsables de las piezas flotantes alejadas de la hotbar.
- El emblema central deja de vivir directamente bajo `#hotbar`.
- El emblema oficial ahora se inserta dentro de `nav.macro-list/.macro-list`, la superficie visible de los slots.
- El fondo y borde principal de la hotbar se aplican a la macro-list real.
- Los controles laterales conservan tematización propia sin modificar la geometría general.
- Se limpia automáticamente cualquier crest residual de versiones anteriores.
- La ficha de personaje continúa fuera del alcance.

## 0.3.2 — Superficies reales de Foundry

- Eliminado el fondo/borde aplicado al wrapper amplio `#ui-right`, que cubría una gran franja del canvas aunque la sidebar real estuviera a la derecha.
- La carcasa visual ahora se aplica a `#sidebar/.sidebar`, la superficie visible real.
- El ancho usado por la ornamentación superior/inferior ahora se calcula desde la sidebar real.
- Hotbar y emblema central ahora se vinculan únicamente a `#hotbar`.
- Eliminada la tematización ornamental duplicada sobre `#action-bar`, responsable de piezas flotantes en el centro y a la izquierda del canvas.
- Eliminada la roseta superpuesta al panel de jugadores/latencia.
- Se mantiene el emblema oficial, pausa, chat, barra izquierda, navegación y modos visuales.
- La ficha de personaje continúa fuera del alcance.

## 0.3.1 — Corrección de layout y refinamiento

- Corregida la geometría de la columna derecha: la capa ornamental ya no reemplaza `position` ni dimensiones nativas de Foundry.
- Restaurada la alineación natural entre pestañas, mensajes y formulario de chat.
- Eliminados pseudo-marcos genéricos que podían interferir con componentes del núcleo.
- Simplificado el marco global para que no compita con mapa, tokens y mensajes.
- Reducidas esquinas y líneas ornamentales.
- Reducida y aligerada la placa superior de Tierra Mágica.
- Reducido el volumen visual de la hotbar, sus remates y el emblema central.
- Refinada la barra izquierda y reducida su ornamentación inferior.
- Se mantiene el emblema oficial introducido en v0.3.0.
- La ficha de personaje continúa fuera del alcance.

## 0.3.0 — Overhaul Visual Mayor

- Sustituido el emblema provisional por el emblema oficial de Tierra Mágica.
- Añadido asset oficial optimizado para Foundry.
- Añadida capa de ornamentación estructural global.
- Añadida placa superior de identidad Tierra Mágica.
- Añadidos assets reutilizables de esquinas, rosetas, divisores y remates.
- Reconstruida la barra izquierda como panel metálico/arcano.
- Reforzada la navegación superior con separadores propios.
- Reconstruida la carcasa visual de la sidebar derecha.
- Separado el estilo de chat en un componente propio.
- Rediseñadas las tarjetas de chat y resultados de dados.
- Reconstruida la hotbar con remates laterales y emblema central.
- Rediseñado el panel inferior izquierdo.
- Reconstruida la pausa alrededor del emblema oficial.
- Añadida opción para desactivar ornamentación avanzada.
- Añadido observer de UI para reponer decoraciones tras re-render de Foundry.
- Mejorado responsive y soporte de reducción de movimiento.
- La ficha de personaje continúa expresamente fuera del alcance.

## 0.2.1

- Corregidos selectores de interfaz para Foundry VTT V13/V14.
- La barra izquierda ahora apunta a `#scene-controls`.
- El marco derecho ahora usa el wrapper `#ui-right`.
- Reforzada la tematización de pestañas, campos y chat.
- Añadida tematización de navegación superior de escenas.
- Ajustada la especificidad CSS frente a estilos del núcleo.
- La ficha de personaje permanece expresamente fuera del alcance.

## 0.2.0

- Añadido marco visual general de Tierra Mágica.
- Tematizada la barra de herramientas izquierda.
- Tematizada la sidebar derecha.
- Añadido tratamiento visual propio al chat.
- Tematizada la hotbar.
- Tematizado el panel de jugadores.
- Añadidos modos Completo, Reducido y Compatibilidad.
- Añadidas reglas responsive y soporte ampliado para reducción de movimiento.
- Ampliados los tokens visuales.
- La ficha de personaje permanece expresamente fuera del alcance.

## 0.1.1

- Estabilizada la pantalla de pausa de Tierra Mágica.
- Ajustada la composición del emblema y el texto.
- Eliminadas líneas decorativas de ancho completo.
- Añadido pulso arcano opcional.
- Añadido soporte para `prefers-reduced-motion`.
- Consolidada la paleta cromática base.
- La ficha de personaje permanece fuera del alcance.
