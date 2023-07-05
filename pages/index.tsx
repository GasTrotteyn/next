import { NextPage } from 'next';
import { GetStaticProps } from 'next';

import { Card, Grid, Row, Text } from '@nextui-org/react';
import { pokeApi } from '../api';

import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Layout } from '../components/layouts';
import { PokemonCard } from '../components/pokemon';

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = (props) => {
	return (
		<Layout title='ponido por yo el title'>
			<Grid.Container gap={2} justify='flex-start'>
				{props.pokemons.map((poke) => (
					<PokemonCard pokemon={poke} key={poke.id}></PokemonCard>
				))}
			</Grid.Container>
		</Layout>
	);
};
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
	const pokemons: SmallPokemon[] = data.results.map((poke, index) => ({
		...poke,
		id: index + 1,
		img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
			index + 1
		}.svg`,
	}));

	return {
		props: {
			pokemons,
		},
	};
};

export default HomePage;
