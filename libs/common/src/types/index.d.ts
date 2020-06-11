export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export type VoidFunction = () => void;

export type Value<T, K = keyof T> = K;

export type ReturnValue<T> = T extends (...args: any[]) => infer U ? U : T;
