import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { copyFilesAction } from './actions/copyFiles';

const scaffolderModuleCustomExtensions = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'custom-extensions',
  register(env) {
    env.registerInit({
      deps: {
	scaffolder: scaffolderActionsExtensionPoint,
      },
      async init({ scaffolder }) {
	scaffolder.addActions(copyFilesAction);
      },
    });
  },
});

export default scaffolderModuleCustomExtensions;
