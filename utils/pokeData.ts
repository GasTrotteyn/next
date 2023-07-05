import { pokeApi } from '../api';
import { Pokemon } from '../interfaces';

const extractData = async (idOrName: string) => {
	const { data } = await pokeApi.get<Pokemon>(`/pokemon/${idOrName}`);

	return { id: data.id, name: data.name, sprites: data.sprites };
};

export default { extractData };
