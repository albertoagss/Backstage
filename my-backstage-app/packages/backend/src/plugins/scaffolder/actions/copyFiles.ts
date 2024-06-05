import { createTemplateAction } from '@backstage/plugin-scaffolder-backend';
import fs from 'fs-extra';
import path from 'path';

export const copyFilesAction = createTemplateAction<{
  sourcePath: string;
  destinarionPath: string;
}>({
  id: 'custom:copy-files',
  schema: {
    input: {
      type: 'object',
      required: ['sourcePath', 'destinationPath'],
      properties: {
        sourcePath: {
          type: 'string',
          description: 'The path to the source directory of files to copy',
        },
        destinationPath: {
          type: 'string',
          description: 'The path to the destination directory',
        },
      },
    },
  },
  async handler(ctx) {
    const { sourcePath, destinationPath } = ctx.input;

    const absSourcePath = path.resolve(sourcePath);
    const absDestinationPath = path.resolve(destinationPath);

    await fs.copy(absSourcePath, absDestinationPath);
    ctx.logger.info(`Copied files from ${absSourcePath} to ${absDestinationPath}`);
  },
});
