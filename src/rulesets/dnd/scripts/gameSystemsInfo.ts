const xpForLevels = new Map<number, number>([
  [2, 300],
  [3, 900],
  [4, 2700],
  [5, 6500],
  [6, 14000],
  [7, 23000],
  [8, 34000],
  [9, 48000],
  [10, 64000],
  [11, 85000],
  [12, 100000],
  [13, 120000],
  [14, 140000],
  [15, 165000],
  [16, 195000],
  [17, 225000],
  [18, 265000],
  [19, 305000],
  [20, 355000]
]);

const profByLvl = new Map<number, number>([
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 3],
  [6, 3],
  [7, 3],
  [8, 3],
  [9, 4],
  [10, 4],
  [11, 4],
  [12, 4],
  [13, 5],
  [14, 5],
  [15, 5],
  [16, 5],
  [17, 6],
  [18, 6],
  [19, 6],
  [20, 6]
]);

export const xpForNextLevel = (lvl: number): number => {
  return xpForLevels.get(lvl + 1) ?? 0;
};

export const profFromLvl = (lvl: number): number => {
  return profByLvl.get(lvl) ?? 2;
};
