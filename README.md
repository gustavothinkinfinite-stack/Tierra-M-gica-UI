# Tierra Mágica — UI para Foundry VTT

Repositorio de desarrollo de la interfaz visual oficial de **Tierra Mágica** para Foundry VTT.

## Estado actual

**v0.1.1 — Pausa + infraestructura visual**

Incluye:

- identidad visual base;
- pantalla de pausa personalizada;
- tokens cromáticos;
- soporte de animación reducida;
- estructura inicial del módulo;
- sin modificaciones a fichas de Actor, Item o personaje.

## Alcance del repositorio

Este repositorio contiene exclusivamente la **capa visual/UI de Tierra Mágica para Foundry VTT**.

La ficha de personaje se desarrolla por separado y queda fuera del alcance de este repositorio salvo integración futura expresamente decidida.

## Roadmap inmediato

### v0.2
- marco general;
- barra de herramientas izquierda;
- sidebar derecha;
- chat;
- hotbar;
- panel de jugadores.

### Principios

- No modificar archivos del núcleo de Foundry.
- Usar hooks, CSS, templates y APIs públicas.
- Mantener compatibilidad y degradación razonable.
- Priorizar legibilidad y mapa/tokens sobre ornamentación.
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
module.json
```

## Licencia

Pendiente de definir para la distribución final.
