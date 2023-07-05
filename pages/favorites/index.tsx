import { Layout } from '../../components/layouts';

import React, { useEffect, useState } from 'react';
import { localFavorites } from '../../utils';
import NoFavorites from '../../components/ui/noFavorites';
import { Card, Grid } from '@nextui-org/react';
import FavoritesList from '../../components/pokemon/favoritesList';
import { Pokemon } from '../../interfaces/pokemonFull';

const FavoritesPage = () => {
	const [pokemons, setPokemons] = useState<number[]>([]);

	useEffect(() => {
		setPokemons(localFavorites.getFavorites());
	}, []);

	return (
		<Layout title='favoritos'>
			{pokemons.length > 0 ? (
				<FavoritesList list={pokemons}></FavoritesList>
			) : (
				<NoFavorites></NoFavorites>
			)}
		</Layout>
	);
};

export default FavoritesPage;
