export type NestedPropertyOf<Obj extends object> = {
  [Key in keyof Obj & (string)]: Obj[Key] extends object ? `${Key}` | `${Key}.${NestedPropertyOf<Obj[Key]>}` : `${Key}`;
}[keyof Obj & (string)];
