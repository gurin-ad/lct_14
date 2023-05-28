export const booleanProperty = (value: any): boolean =>
  value != null && `${value}` !== 'false';
