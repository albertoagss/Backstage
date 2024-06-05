import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import axios from 'axios';

const AWXJobLauncher = () => {
  const [jobTemplates, setJobTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {

    const fetchJobTemplates = async () => {
      try {
        const response = await axios.get('http://192.168.10.100:7007/api/proxy/awxproxy/job_templates/', {  
	  headers: {
              'Authorization': 'Bearer YCV3DAUyzNjzwSb7y1OHPpvPAtO2oI',
              'Content-Type': 'application/json',
           },
        });
        setJobTemplates(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job templates:', error);
        setLoading(false);
      }
    };

    fetchJobTemplates();
  }, [authToken]);

  const launchJob = async (id: number) => {
    try {
      const response = await axios.post(`http://192.168.10.100:7007/api/proxy/awxproxy/job_templates/${id}/launch/`,
        {},
        {
          headers: {
            'Authorization': 'Bearer YCV3DAUyzNjzwSb7y1OHPpvPAtO2oI',
            'Content-Type': 'application/json',
          },	  
        }
      );
      console.log('Job launched successfully:', response.data);
      alert('Job launched successfully!');
    } catch (error) {
      console.error('Error launching job:', error);
      alert('Error launching job');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h3">AWX Job Templates</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobTemplates.map((template: any) => (
            <TableRow key={template.id}>
              <TableCell>{template.id}</TableCell>
              <TableCell>{template.name}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => launchJob(template.id)}
                >
                  Launch
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AWXJobLauncher;
