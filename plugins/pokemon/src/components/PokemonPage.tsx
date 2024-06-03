// Importamos React y el hook useState para manejar el estado dentro del componente
import React, { useState } from 'react';
// Importamos varios componentes de Material-UI para construit la interfaz de usuario
import { TextField, Button, CircularProgress, Typography, Card, CardContent } from '@material-ui/core';
// Importamos axios para realizar solicitudes HTTP a la PokeAPI
import axios from 'axios';

// Componente PokemonPage
const PokemonPage = () => {
  // pokemonName : almacena el nombre del Pokemon ingresado por el usuario
  const [pokemonName, setPokemonName] = useState('');
  // pokemonData : almacena los datos del Pokemon obtenidos de la PokeAPI
  const [pokemonData, setPokemonData] = useState<any>(null);
  // loading : indica si la solicitud está en curso
  const [loading, setLoading] = useState(false);
  // error : almacena un mensaje de error si la solicitud falla
  const [error, setError] = useState('');

  // Manejador de eventos
  // handleInputChange : actualiza el estado 'pokemonName' cada vez que el usuario escribe en el campo de texto
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };

  // Función fetchPokemonData
  const fetchPokemonData = async () => {
    // Se establece loading en true
    setLoading(true);
    // Se establece error en una cadena vacía al inicio
    setError('');
    // Se intenta hacer una solicitud GET a la PokeAPI usando el nombre del Pokemon en minúsculas
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      // Si la solicitud es exitosa, almacena los datos del Pokemon en pokemonData
      setPokemonData(response.data);
    } catch (err) {
      // Si ocurre un error, almacena un mensaje de error en 'error'
      setError('Error fetching Pokémon data');
    // Establece 'loading' en 'false' para indicar que la solicitud ha terminado
    } finally {
      setLoading(false);
    }
  };

  // Renderizado del componente
  return (
    <div>
      <Typography variant="h4">Pokémon Info</Typography>
      <TextField label="Enter Pokémon Name" value={pokemonName} onChange={handleInputChange} />
      <Button variant="contained" color="primary" onClick={fetchPokemonData}>
        Search
      </Button>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {pokemonData && (
        <Card>
          <CardContent>
            <Typography variant="h5">{pokemonData.name}</Typography>
            <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} />
            <Typography>Height: {pokemonData.height}</Typography>
            <Typography>Weight: {pokemonData.weight}</Typography>
            <Typography>Type: {pokemonData.types.map((type: any) => type.type.name).join(', ')}</Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PokemonPage;

