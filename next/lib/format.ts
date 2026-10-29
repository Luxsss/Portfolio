// Fills "{name}" slots in dictionary strings.
export function format(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (slot, key: string) => (key in values ? String(values[key]) : slot));
}
