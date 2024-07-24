import React, { useState } from 'react';
import axios from 'axios';
import {
     Container,
     Typography,
     Button,
     Box,
     Grid,
     Snackbar,
     Alert,
     TextField,
} from '@mui/material';

const App: React.FC = () => {
     const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
     const [loading, setLoading] = useState<boolean>(false);
     const [error, setError] = useState<string | null>(null);
     const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
     const [width, setWidth] = useState<number>(0);
     const [height, setHeight] = useState<number>(0);

     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSelectedFiles(event.target.files);
     };

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (!selectedFiles) return;

          const formData = new FormData();
          Array.from(selectedFiles).forEach((file) => {
               formData.append('images', file);
          });
          formData.append('width', width.toString());
          formData.append('height', height.toString());

          setLoading(true);

          try {
               const response = await axios.post('http://localhost:3001/generate-doc', formData, {
                    responseType: 'blob',
               });
               const url = window.URL.createObjectURL(new Blob([response.data]));
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'output.docx');
               document.body.appendChild(link);
               link.click();
          } catch (error) {
               console.error('Error generating document', error);
               setError('Erro ao gerar o documento');
               setOpenSnackbar(true);
          } finally {
               setLoading(false);
          }
     };

     const handleCloseSnackbar = () => {
          setOpenSnackbar(false);
     };

     return (
          <Grid bgcolor={'#FFF'} container spacing={2} width={'100%'} height={'100%'}>
               <Container>
                    <Box sx={{ my: 4 }}>
                         <Typography variant='h4' component='h1' gutterBottom>
                              Upload Images and Generate DOCX
                         </Typography>
                         <form onSubmit={handleSubmit}>
                              <input
                                   accept='image/*'
                                   style={{ display: 'none' }}
                                   id='raised-button-file'
                                   multiple
                                   type='file'
                                   onChange={handleFileChange}
                              />

                              <TextField
                                   label='Largura'
                                   type='number'
                                   value={width}
                                   onChange={(e) => setWidth(parseInt(e.target.value, 10))}
                                   sx={{ ml: 2 }}
                              />
                              <TextField
                                   label='Altura'
                                   type='number'
                                   value={height}
                                   onChange={(e) => setHeight(parseInt(e.target.value, 10))}
                                   sx={{ ml: 2 }}
                              />
                              <label htmlFor='raised-button-file'>
                                   <Button variant='contained' component='span'>
                                        Selecionar Imagens
                                   </Button>
                              </label>
                              <Button
                                   type='submit'
                                   variant='contained'
                                   color='primary'
                                   disabled={loading}
                                   sx={{ ml: 2 }}
                              >
                                   {loading ? 'Generating...' : 'Generate DOCX'}
                              </Button>
                         </form>
                    </Box>
               </Container>
               <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
                         {error}
                    </Alert>
               </Snackbar>
          </Grid>
     );
};

export default App;
