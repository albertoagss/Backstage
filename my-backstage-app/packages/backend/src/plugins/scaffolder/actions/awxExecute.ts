import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import fetch from 'node-fetch';

export const awxExecuteAction = createTemplateAction<{ awxHost: string; awxToken: string; jobID: string }>({
  id: 'custom:awx-execute',
  description: 'Executes an Ansible job in AWX.',
  schema: {
    input: {
      required: ['awxHost', 'awxToken', 'jobId'],
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
	jobId: {
	  type: 'string',
	  description: 'ID of the job template to execute',
	},
      },
    },
  },
  async handler(ctx) {
    const { awxHost, awxToken, jobId } = ctx.input;

    const response = await fetch(`${awxHost}/api/v2/job_templates/${jobId}/launch/`, {
      method: 'POST',
      headers: {
	'Authorization': `Bearer ${awxToken}`,
	'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to execute job in AWX: ${response.statusText}`);
    }

    const data = await response.json();
    ctx.output('jobExecutionId', data.id);
  },
});
