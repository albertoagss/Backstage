import { createRouter, createBuiltinActions } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { copyFilesAction } from './actions/copyFiles';
import { awxRegisterAction } from './actions/awxRegister';
import { awxExecuteAction } from './actions/awxExecute';

export default async function createPlugin(env: PluginEnvironment): Promise<Router> {
  const builtInActions = createBuiltinActions({
    integrations: env.integration,
    catalogClient: env.catalogClient,
    reader: env.reader,
    config: env.config,
    logger: env.logger,
  });

  const customActions = [
    copyFilesAction,
    awxRegisterAction,
    awxExecuteAction,
  ];

  const actions = [...builtInActions, ...customActions];

  const router = await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    discovery: env.discovery,
    reader: env.reader,
    actions,
  });

  return router;
}
