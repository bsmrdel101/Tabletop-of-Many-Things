export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const generateClasses = (className: string, variantsList: string[], elmt: string): string => {
  const variants = variantsList ? variantsList.map((i) => `${elmt}--${i}`).join(' ') : '';
  return [className, variants && variants, elmt].filter(Boolean).join(' ');
};

export const parseClasses = (classes: string): object => {
  return classes ? { className: classes } : {};
};

export const removeNullObjProps = (obj: any): object => Object.entries(obj).reduce((a: any, [k, v]) => (v == null ? a : (a[k] = v, a)), {});

export const formatCharacterCardClasses = (classes: { name: string, lvl: number, subclass: string | null }[]): string => {
  return classes.map((c) => {
    return `${c.subclass ?? ''} ${c.name} ${c.lvl}`.trim();
  }).join(' / ');
};

export const formatCharacterClasses = (classes: PlayerClass_5e[]): string => {
  return classes.map((c) => {
    return `${c.subclass?.name ?? ''} ${c.name} ${c.lvl}`.trim();
  }).join(' / ');
};
