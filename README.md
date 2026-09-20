# Tierra Mágica — UI para Foundry VTT

Interfaz visual oficial de **Tierra Mágica** para Foundry VTT.

## Estado actual

**v0.3.0 — Overhaul Visual Mayor**

Esta versión reemplaza la tematización ligera de v0.2 por una capa visual mucho más reconocible.

Incluye:

- emblema oficial de Tierra Mágica;
- pantalla de pausa reconstruida alrededor del emblema oficial;
- ornamentación estructural global;
- placa superior de identidad;
- esquinas y separadores arcanos;
- barra izquierda convertida en panel metálico/arcano;
- navegación superior reforzada;
- sidebar derecha convertida en carcasa temática;
- chat con tarjetas propias;
- hotbar convertida en artefacto arcano con remates laterales;
- panel inferior izquierdo tematizado;
- soporte responsive;
- reducción de movimiento;
- modos Completo, Reducido y Compatibilidad.

## Alcance

Este repositorio contiene exclusivamente la **capa visual/UI de Tierra Mágica para Foundry VTT**.

**La ficha de personaje no forma parte de este repositorio en esta etapa.** Se desarrolla por separado y este módulo evita deliberadamente aplicar estilos globales a Actor Sheets e Item Sheets.

## Identidad visual

La interfaz utiliza:

- azul noche y azul petróleo;
- acero oscuro;
- latón y cobre;
- oro envejecido;
- energía arcana azul-cian;
- ornamentación de astrolabio y geometría arcana.

El emblema oficial se encuentra en:

```text
assets/ui/branding/tm-emblem-official.webp
```

## Modos de interfaz

### Completo

Aplica el overhaul completo: ornamentación, marca, controles, navegación, sidebar, chat, hotbar, jugadores y pausa.

### Reducido

Mantiene la pausa temática y el tratamiento fuerte de chat/hotbar sin envolver toda la interfaz.

### Compatibilidad

Reduce al mínimo la intervención sobre la UI estándar de Foundry.

## Instalación por Manifest URL

```text
https://raw.githubusercontent.com/gustavothinkinfinite-stack/Tierra-M-gica-UI/main/module.json
```

## Estructura

```text
assets/
  ui/
    branding/
      tm-emblem-official.webp
    ornaments/
      tm-corner.svg
      tm-divider.svg
      tm-endcap.svg
      tm-rosette.svg

lang/
scripts/

styles/
  tokens.css
  ornaments.css
  shell.css
  controls.css
  navigation.css
  sidebar.css
  chat.css
  hotbar.css
  players.css
  pause.css
  responsive.css

module.json
```

## Compatibilidad objetivo

- Foundry VTT v13.341+
- verificado contra Foundry VTT v14.368.

## Principios técnicos

- no modificar archivos del núcleo de Foundry;
- usar hooks, CSS y APIs públicas;
- no tocar la ficha de personaje;
- mantener un modo de compatibilidad;
- priorizar legibilidad, mapa y tokens;
- usar assets pequeños y reutilizables para la ornamentación.

## Licencia

Pendiente de definir para la distribución final.
