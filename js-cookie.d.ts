declare module 'js-cookie' {
  interface CookieAttributes {
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }

  interface CookieOptions extends CookieAttributes {
    value?: string | object;
  }

  function get(name: string): string | undefined;
  function set(name: string, value: string | object, options?: CookieOptions): void;
  function remove(name: string, options?: CookieOptions): void;

  export { get, set, remove };
}