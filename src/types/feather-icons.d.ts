declare module 'feather-icons' {
  interface FeatherIcons {
    replace(): void;
    [key: string]: any;
  }

  const feather: FeatherIcons;

  export default feather;
}
