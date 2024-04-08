type Mods = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods: Mods,
  additional?: string[]
): string {
  return [
    cls,
    ...additional,
    Object.entries(mods)
      .filter(([_cls, val]) => Boolean(val))
      .map(([cls, _val]) => cls),
  ].join(" ");
}
