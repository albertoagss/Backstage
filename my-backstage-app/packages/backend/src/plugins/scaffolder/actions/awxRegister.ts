import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fetch from 'node-fetch';
import fs from 'fs-extra';

export const awxRegisterAction = createTemplateAction<{ awxHost: string; awxToken: string; playbookPath: string }>({
  id: 'custom:awx-register',
  description: 'Registers an Ansible job template in AWX.',
  schema: {
    input: {
      required: ['awxHost', 'awxToken', 'playbookPath'],
      type: 'object',
      properties: {
	awxHost: {
	  type: 'string',
	  description: 'URL of the AWX instance',
	},
	awxToken: {
	  type: 'string',
	  description: 'API token for AWX',
	},
	playbookPath: {
	  type: 'string',
	  description: 'Path to the Ansible playbook',
	},
      },
    },
  },
  async handler(ctx) {
    const { awxHost, awxToken, playbookPath } = ctx.input;
    //const playbook = await fs.promises.readFile(playbookPath, 'utf8');

    const response = await fetch(`${awxHost}/api/proxy/awxproxy/job_templates/`, {
      method: 'POST',
      headers: {
	'Content-Type': 'application/json',
	'Authorization': `Bearer ${awxToken}`,
      },
      body: JSON.stringify({
	name: 'Generated Job',
	description: 'Job created from Backstage template',
	inventory: '1',
	project: '19',
	playbook: `${playbookPath}`,
	credential: 'SSH',
      }), 
    });

    if (!response.ok) {
      throw new Error(`Failed to register job in AWX: ${response.statusText}`);
    }

    const data = await response.json();
    ctx.output('jobId', data.id);
  },
});
