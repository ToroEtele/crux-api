import { Express, RequestHandler, Response, Request } from 'express';
import Container from 'typedi';

import { GetAvatarImageService } from './services/get-avatar-image.service';
import { RequestContext } from '@interfaces/extended-request.interface';

export class AvatarImageController {
  static use(app: Express): void {
    const controller = new AvatarImageController();

    app.get('/avatar/:id', controller.requestHandler());
  }

  public requestHandler(): RequestHandler {
    return async (req: Request & RequestContext, res: Response) => {
      try {
        const avatarImageService = Container.get(GetAvatarImageService);

        const { id } = req.params;

        if (!id) {
          return res.status(400).json({ status: 'error', message: 'Missing id' });
        }

        // const result = await avatarImageService.getAvatarImage({ id: new ObjectIdUnmarshaller(id).toObjectId().id as string });
        const result = await avatarImageService.getAvatarImage({ id });

        if (!result?.content) {
          return res.status(404).json({ status: 'error', message: 'Not found' });
        }

        res.setHeader('Content-Type', result.contentType || 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Access-Control-Allow-Origin', '*');

        res.end(result.content, 'binary');
      } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while getting the file requested.');
      }
    };
  }
}
