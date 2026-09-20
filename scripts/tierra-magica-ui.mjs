const MODULE_ID = "tierra-magica-ui";
const VERSION = "0.2.0";
const ASSET_ROOT = `modules/${MODULE_ID}/assets/ui`;
const PAUSE_ICON = `${ASSET_ROOT}/pause/tm-pause-emblem-v011.svg`;

const THEME_CLASSES = [
  "tm-theme-full",
  "tm-theme-reduced",
  "tm-theme-compat"
];

function pauseEnabled() {
  return game.settings.get(MODULE_ID, "pauseEnabled");
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
}

function applyPausePulse(enabled = game.settings.get(MODULE_ID, "pausePulse")) {
  document.body?.classList.toggle("tm-pause-pulse", Boolean(enabled));
}

function applyPauseMarkup(element) {
  if (!element || !pauseEnabled()) return;

  element.classList.add("tm-pause");

  const image = element.querySelector("img");
  if (image) {
    image.src = PAUSE_ICON;
    image.alt = "Emblema de Tierra Mágica";
    image.classList.add("tm-pause-emblem");
    image.style.animation = "none";
  }

  const caption = element.querySelector("figcaption, h2, .pause-text");
  if (caption && !caption.querySelector(".tm-pause-title")) {
    caption.textContent = "";

    const title = document.createElement("span");
    title.className = "tm-pause-title";
    title.textContent = "TIERRA MÁGICA";

    const subtitle = document.createElement("span");
    subtitle.className = "tm-pause-subtitle";
    subtitle.textContent = "EN PAUSA";

    caption.append(title, subtitle);
  }

  if (!element.querySelector(":scope > .tm-pause-shell")) {
    const shell = document.createElement("div");
    shell.className = "tm-pause-shell";
    while (element.firstChild) shell.appendChild(element.firstChild);
    element.appendChild(shell);
  }
}

Hooks.once("init", () => {
  console.log(`${MODULE_ID} | Inicializando Tierra Mágica UI v${VERSION}`);

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

  const existing = document.querySelector("#pause, .game-pause");
  if (existing) applyPauseMarkup(existing);
});

Hooks.on("updateSetting", (setting) => {
  const key = setting?.key ?? "";

  if (key === `${MODULE_ID}.pauseEnabled`) {
    ui.pause?.render?.(true);
  }
});
