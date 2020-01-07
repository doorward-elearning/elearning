export type ReturnValue<T> = T extends (...args: any[]) => infer U ? U : T;
