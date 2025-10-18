declare module "react" {
  export interface PropsWithChildren<P> extends P { children?: any }
  export type FC<P = any> = (props: PropsWithChildren<P>) => any;
  export const Fragment: any;
  export function createElement(...args: any[]): any;
  const _default: any;
  export default _default;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module "react-native" {
  export type StyleProp<T = any> = any;
  export type ViewProps = { style?: StyleProp; className?: string } & Record<string, any>;
  export type TextProps = { style?: StyleProp; className?: string } & Record<string, any>;
  export type PressableProps = { style?: StyleProp; className?: string; onPress?: () => void; disabled?: boolean } & Record<string, any>;
  export type TextInputProps = { style?: StyleProp; className?: string; value?: string; onChangeText?: (t: string) => void; placeholder?: string } & Record<string, any>;
  export const View: (props: ViewProps) => any;
  export const Text: (props: TextProps) => any;
  export const Pressable: (props: PressableProps) => any;
  export const TextInput: (props: TextInputProps) => any;
}

declare module "nativewind" {
  export function styled<T>(component: T): T;
}

declare namespace JSX {
  interface IntrinsicElements {
    div: any;
    span: any;
    button: any;
  }
}
