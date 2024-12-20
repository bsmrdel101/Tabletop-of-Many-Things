export const getCharacterSubtitle = (character: Character): string => {
  const arr = [];
  if (character.race) arr.push(character.race.name);
  character.classes.forEach((c) => {
    if (c) arr.push(`${c.name}${character.classes.length > 1 ? ` lvl ${c.lvl}` : ''}`);
  });
  if (character.background) arr.push(character.background.name);
  return arr.join(', ');
};

export const getXpFromLvl = (lvl: number): number => {
  switch (lvl) {
  case 1:
    return 300;
  case 2:
    return 900;
  case 3:
    return 2700;
  case 4:
    return 6500;
  case 5:
    return 14000;
  case 6:
    return 23000;
  case 7:
    return 34000;
  case 8:
    return 48000;
  case 9:
    return 64000;
  case 10:
    return 85000;
  case 11:
    return 100000;
  case 12:
    return 120000;
  case 13:
    return 140000;
  case 14:
    return 165000;
  case 16:
    return 195000;
  case 17:
    return 225000;
  case 18:
    return 265000;
  case 19:
    return 305000;
  default:
    return 355000;
  }
};
