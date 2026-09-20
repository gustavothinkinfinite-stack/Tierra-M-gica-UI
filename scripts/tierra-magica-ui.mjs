const MODULE_ID = "tierra-magica-ui";
const VERSION = "0.3.4";
const ASSET_ROOT = `modules/${MODULE_ID}/assets/ui`;
const OFFICIAL_EMBLEM = `${ASSET_ROOT}/branding/tm-emblem-official.webp`;
const PAUSE_ICON = `${ASSET_ROOT}/branding/tm-emblem-official-large.webp`;

const THEME_CLASSES = [
  "tm-theme-full",
  "tm-theme-reduced",
  "tm-theme-compat"
];

let uiObserver = null;
let resizeObserver = null;
let decorateQueued = false;

function pauseEnabled() {
  return game.settings.get(MODULE_ID, "pauseEnabled");
}

function ornamentsEnabled() {
  return game.settings.get(MODULE_ID, "ornamentsEnabled");
}

function getThemeMode() {
  return game.settings.get(MODULE_ID, "themeMode") || "full";
}

function applyThemeMode(mode = getThemeMode()) {
  const body = document.body;
  if (!body) return;

  body.classList.add("tierra-magica-ui");
  body.classList.remove(...THEME_CLASSES);

  const safeMode = ["full", "reduced", "compat"].includes(mode) ? mode : "full";
  body.classList.add(`tm-theme-${safeMode}`);
  body.dataset.tmUiMode = safeMode;

  scheduleDecorateInterface();
}

function applyPausePulse(enabled = game.settings.get(MODULE_ID, "pausePulse")) {
  document.body?.classList.toggle("tm-pause-pulse", Boolean(enabled));
}

function createElement(tag, className, attrs = {}) {
  const el = document.createElement(tag);
  if (className) el.className = className;

  for (const [key, value] of Object.entries(attrs)) {
    if (key === "text") el.textContent = value;
    else if (key === "src") el.src = value;
    else if (key === "alt") el.alt = value;
    else el.setAttribute(key, value);
  }

  return el;
}

function ensureOrnamentLayer() {
  const full = getThemeMode() === "full";
  const enabled = ornamentsEnabled();

  let layer = document.getElementById("tm-ui-ornaments");
  let brand = document.getElementById("tm-brand-plate");

  if (!full || !enabled) {
    layer?.remove();
    brand?.remove();
    return;
  }

  if (!layer) {
    layer = createElement("div", "", {
      id: "tm-ui-ornaments",
      "aria-hidden": "true"
    });

    layer.append(
      createElement("div", "tm-top-rail"),
      createElement("div", "tm-bottom-rail"),
      createElement("div", "tm-corner tl"),
      createElement("div", "tm-corner tr"),
      createElement("div", "tm-corner bl"),
      createElement("div", "tm-corner br")
    );

    document.body.appendChild(layer);
  }

  if (!brand) {
    brand = createElement("div", "", {
      id: "tm-brand-plate",
      "aria-hidden": "true"
    });

    const image = createElement("img", "", {
      src: OFFICIAL_EMBLEM,
      alt: ""
    });

    const copy = createElement("span", "tm-brand-copy");
    copy.append(
      createElement("span", "tm-brand-title", { text: "TIERRA MÁGICA" }),
      createElement("span", "tm-brand-subtitle", { text: "FOUNDRY VTT" })
    );

    brand.append(image, copy);
    document.body.appendChild(brand);
  }
}

function ensureHotbarCrest() {
  const hotbar = document.querySelector("#hotbar");
  if (!hotbar) return;

  const anchor = hotbar.querySelector("nav.macro-list, .macro-list");
  const shouldShow =
    ornamentsEnabled() &&
    ["full", "reduced"].includes(getThemeMode());

  /* Limpia cualquier crest antiguo anclado al workspace completo. */
  hotbar.querySelector(":scope > .tm-hotbar-crest")?.remove();

  if (!anchor || !shouldShow) {
    hotbar.querySelectorAll(".tm-hotbar-crest").forEach((node) => node.remove());
    return;
  }

  let crest = anchor.querySelector(":scope > .tm-hotbar-crest");

  if (!crest) {
    crest = createElement("div", "tm-hotbar-crest", {
      "aria-hidden": "true"
    });

    const image = createElement("img", "", {
      src: OFFICIAL_EMBLEM,
      alt: ""
    });

    crest.appendChild(image);
    anchor.appendChild(crest);
  }
}

function decorateStableTargets() {
  const targets = [
    document.querySelector("#sidebar, .sidebar"),
    document.querySelector("#players"),
    document.querySelector("#navigation"),
    document.querySelector("#hotbar")
  ].filter(Boolean);

  for (const target of targets) {
    target.classList.add("tm-ornamented-panel");
  }

  ensureHotbarCrest();

  const sidebar = document.querySelector("#sidebar, .sidebar");
  const width = sidebar?.getBoundingClientRect?.().width;

  if (width && Number.isFinite(width)) {
    document.documentElement.style.setProperty(
      "--tm-sidebar-width",
      `${Math.round(width)}px`
    );
  }
}

function refreshResizeObserverTargets() {
  if (!resizeObserver) return;

  resizeObserver.disconnect();

  const targets = [
    document.querySelector("#sidebar, .sidebar"),
    document.querySelector("#hotbar"),
    document.querySelector("#navigation")
  ].filter(Boolean);

  for (const target of targets) {
    resizeObserver.observe(target);
  }
}

function decorateInterface() {
  decorateQueued = false;
  if (!document.body) return;

  ensureOrnamentLayer();
  decorateStableTargets();
  refreshResizeObserverTargets();
}

function scheduleDecorateInterface() {
  if (decorateQueued) return;

  decorateQueued = true;
  requestAnimationFrame(decorateInterface);
}

function installInterfaceObservers() {
  uiObserver?.disconnect();
  resizeObserver?.disconnect();

  uiObserver = new MutationObserver(scheduleDecorateInterface);
  uiObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  resizeObserver = new ResizeObserver(scheduleDecorateInterface);
  refreshResizeObserverTargets();

  window.addEventListener("resize", scheduleDecorateInterface, {
    passive: true
  });
}

function applyPauseMarkup(element) {
  if (!element || !pauseEnabled()) return;

  element.classList.add("tm-pause");

  const image = element.querySelector("img");
  if (image) {
    image.src = PAUSE_ICON;
    image.alt = "Emblema oficial de Tierra Mágica";
    image.decoding = "async";
    image.classList.add("tm-pause-emblem");
    image.style.animation = "none";
  }

  const caption = element.querySelector("figcaption, h2, .pause-text");
  if (caption && !caption.querySelector(".tm-pause-title")) {
    caption.textContent = "";

    const title = createElement("span", "tm-pause-title", {
      text: "TIERRA MÁGICA"
    });

    const subtitle = createElement("span", "tm-pause-subtitle", {
      text: "EN PAUSA"
    });

    caption.append(title, subtitle);
  }

  if (!element.querySelector(":scope > .tm-pause-shell")) {
    const shell = createElement("div", "tm-pause-shell");

    while (element.firstChild) {
      shell.appendChild(element.firstChild);
    }

    element.appendChild(shell);
  }
}

Hooks.once("init", () => {
  console.log(
    `${MODULE_ID} | Inicializando Tierra Mágica UI v${VERSION}`
  );

  game.settings.register(MODULE_ID, "themeMode", {
    name: "TMUI.Settings.ThemeMode.Name",
    hint: "TMUI.Settings.ThemeMode.Hint",
    scope: "client",
    config: true,
    type: String,
    choices: {
      full: "TMUI.Settings.ThemeMode.Choices.Full",
      reduced: "TMUI.Settings.ThemeMode.Choices.Reduced",
      compat: "TMUI.Settings.ThemeMode.Choices.Compat"
    },
    default: "full",
    onChange: applyThemeMode
  });

  game.settings.register(MODULE_ID, "ornamentsEnabled", {
    name: "TMUI.Settings.OrnamentsEnabled.Name",
    hint: "TMUI.Settings.OrnamentsEnabled.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: scheduleDecorateInterface
  });

  game.settings.register(MODULE_ID, "pauseEnabled", {
    name: "TMUI.Settings.PauseEnabled.Name",
    hint: "TMUI.Settings.PauseEnabled.Hint",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register(MODULE_ID, "pausePulse", {
    name: "TMUI.Settings.PausePulse.Name",
    hint: "TMUI.Settings.PausePulse.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: applyPausePulse
  });
});

Hooks.on("preRenderGamePause", (_app, context) => {
  if (!pauseEnabled()) return;

  context.icon = PAUSE_ICON;
  context.spin = false;
  context.text = "TIERRA MÁGICA — EN PAUSA";
  context.cssClass = `${context.cssClass ?? ""} tm-pause`.trim();
});

Hooks.on("renderGamePause", (_app, element) => {
  applyPauseMarkup(element);
});

Hooks.once("ready", () => {
  applyThemeMode();
  applyPausePulse();
  decorateInterface();
  installInterfaceObservers();

  const existing = document.querySelector("#pause, .game-pause");
  if (existing) applyPauseMarkup(existing);
});

Hooks.on("updateSetting", (setting) => {
  const key = setting?.key ?? "";

  if (key === `${MODULE_ID}.pauseEnabled`) {
    ui.pause?.render?.(true);
  }

  if (
    key === `${MODULE_ID}.themeMode` ||
    key === `${MODULE_ID}.ornamentsEnabled`
  ) {
    scheduleDecorateInterface();
  }
});
