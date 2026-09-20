# Tierra Mágica — UI para Foundry VTT

Repositorio de desarrollo de la interfaz visual oficial de **Tierra Mágica** para Foundry VTT.

## Estado actual

**v0.2.0 — Primera capa completa de interfaz**

Incluye:

- identidad visual base;
- pantalla de pausa personalizada;
- marco visual general;
- herramientas de escena;
- sidebar derecha;
- chat;
- hotbar;
- panel de jugadores;
- tokens cromáticos;
- soporte de animación reducida;
- tres modos visuales: Completo, Reducido y Compatibilidad;
- sin modificaciones a fichas de Actor, Item o personaje.

## Alcance del repositorio

Este repositorio contiene exclusivamente la **capa visual/UI de Tierra Mágica para Foundry VTT**.

La ficha de personaje se desarrolla por separado y queda fuera del alcance de este repositorio salvo integración futura expresamente decidida.

## Modos de interfaz

### Completo

Aplica el tema a pausa, marco general, herramientas, sidebar/chat, hotbar y panel de jugadores.

### Reducido

Mantiene la pausa temática y aplica el tratamiento visual solamente al chat y hotbar.

### Compatibilidad

Mantiene la infraestructura y la identidad esencial con una intervención mínima sobre la UI estándar de Foundry.

## Principios

- No modificar archivos del núcleo de Foundry.
- Usar hooks, CSS y APIs públicas.
- Mantener compatibilidad y degradación razonable.
- Priorizar legibilidad, mapa y tokens sobre ornamentación.
- No aplicar selectores globales a las fichas.
- Toda la UI debe seguir la identidad visual canónica de Tierra Mágica.

## Compatibilidad objetivo

- Foundry VTT v13.341+
- Verificado contra Foundry VTT v14.368.

## Estructura

```text
assets/
  ui/
    pause/
lang/
scripts/
styles/
  tokens.css
  shell.css
  controls.css
  sidebar.css
  hotbar.css
  players.css
  pause.css
  responsive.css
module.json
```

## Prueba de v0.2

1. Instalar o actualizar el módulo.
2. Activar **Tierra Mágica — UI** en el mundo.
3. En Configuración del módulo seleccionar **Completo — interfaz temática**.
4. Comprobar pausa, barra izquierda, sidebar, chat, hotbar y panel de jugadores.
5. Si otro módulo visual entra en conflicto, probar **Reducido** y luego **Compatibilidad**.

## Licencia

Pendiente de definir para la distribución final.
