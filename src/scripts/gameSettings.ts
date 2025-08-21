const defaultSettingsDnd: GameSettings = {
  dnd: {
    ignoreCoinWeight: true,
    usingXp: false
  }
};

const defaultSettings5e: GameSettings = {
  ...defaultSettingsDnd
};

const defaultSettings2024: GameSettings = {
  ...defaultSettingsDnd
};

export const getDefaultGameSettings = (ruleset: string): GameSettings => {
  switch (ruleset) {
    case '5e':
      return defaultSettings5e;
    case '2024':
      return defaultSettings2024;
    default:
      return defaultSettingsDnd;
  }
};
