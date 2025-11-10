// import { parse, Parser } from 'csv-parse';
// import { z, ZodType } from 'zod';
// import { FileUpload } from 'graphql-upload';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class FileUtil {
  /**
   * Returns a function that returns the full file path (after _root_)
   * without the file extension.
   */
  public static getFullPathFrom(root: string): (path: string) => string {
    return function (filepath: string): string {
      const parsedFilePath = filepath.replace(/\\/g, '/');
      return parsedFilePath.substr(parsedFilePath.indexOf(root) + root.length + 1).slice(0, -3);
    };
  }

  // public static async parseCsv<TSchema extends ZodType>(fileUpload: FileUpload, schema: TSchema): Promise<Array<z.infer<TSchema>>> {
  //   const values: Array<z.infer<TSchema>> = [];
  //   const parser = this.getCsvParser(schema);

  //   await new Promise<void>((resolve, reject) => {
  //     fileUpload
  //       .createReadStream()
  //       .pipe(parser)
  //       .on('readable', () => {
  //         let record;
  //         // eslint-disable-next-line no-loops/no-loops
  //         while ((record = parser.read()) !== null) values.push(record);
  //       })
  //       .on('error', (error: unknown) => reject(error))
  //       .on('end', () => parser.end(() => resolve()));
  //   });

  //   return values;
  // }

  // public static getCsvParser(schema: ZodType): Parser {
  //   return parse({
  //     cast: true,
  //     columns: true,
  //     onRecord: (record) => schema.parse(record)
  //   });
  // }

  public static streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const _buf = new Array<Uint8Array>();

      stream
        .on('data', (chunk) => _buf.push(chunk))
        .on('end', () => resolve(Buffer.concat(_buf)))
        .on('error', (err) => reject(err));
    });
  }
}
