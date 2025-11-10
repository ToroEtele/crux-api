import base64UrlSafe from 'base64-url';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Base64Util {
  public static encodeUrlSafe(input: string): string {
    return base64UrlSafe.encode(input);
  }

  public static decodeUrlSafe(input: string): string {
    return base64UrlSafe.decode(input);
  }
}
