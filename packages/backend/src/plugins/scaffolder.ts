import { createRouter, createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { copyFilesAction } from './actions/copyFiles';

export default async function createPlugin(env: PluginEnvironment): Promise<Router> {
  const router = await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    discovery: env.discovery,
    reader: env.reader,
    actions: [
      copyFilesAction,
    ],
  });
  return router;
}
