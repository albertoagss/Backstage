import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { copyFilesAction } from './actions/copyFiles';
import { awxRegisterAction } from './actions/awxRegister';
import { awxExecuteAction } from './actions/awxExecute';

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
	scaffolder.addActions(awxRegisterAction);
	scaffolder.addActions(awxExecuteAction);
      },
    });
  },
});

export default scaffolderModuleCustomExtensions;
