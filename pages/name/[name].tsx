import { useEffect, useState } from 'react';

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { Pokedex, Pokemon, Species } from '../../interfaces';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { localFavorites, pokeData } from '../../utils';
import { Sprites } from '../../interfaces/pokemonFull';

interface Props {
	pokemon: Pokemon;
}

const PokePageByName: NextPage<Props> = ({ pokemon }) => {
	const [isFavorite, setIsFavorite] = useState(localFavorites.existInFavorites(pokemon.id));

	const onToggleFavorites = () => {
		localFavorites.toggleFavorites(pokemon.id);
		setIsFavorite(!isFavorite);
		if (!isFavorite) {
			confetti({
				zIndex: 2,
				particleCount: 200,
				spread: 160,
				angle: -100,
				origin: {
					x: 1,
					y: 0,
				},
				shapes: ['circle'],
				colors: ['#ffffff', '#FF00FF'],
				scalar: 2,
			});
		}
	};

	return (
		<Layout title={`el que se llama ${pokemon.name}`}>
			<Grid.Container css={{ marginTop: '5px' }} gap={2}>
				<Grid xs={12} sm={4}>
					<Card hoverable css={{ padding: '30px' }}>
						<Card.Body>
							<Card.Image
								alt={pokemon.name}
								src={pokemon.sprites.other?.dream_world.front_default || ''}
								width='100%'
								height={200}
							/>
						</Card.Body>
					</Card>
				</Grid>
				<Grid xs={12} sm={8}>
					<Card>
						<Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text h1 transform='capitalize'>
								{pokemon.name}
							</Text>
							<Button color='gradient' ghost={!isFavorite} onClick={onToggleFavorites}>
								{isFavorite ? 'ya es un favorito' : 'Guardar en favoritos'}
							</Button>
						</Card.Header>
						<Card.Body>
							<Text size={30}>Sprites</Text>
							<Container css={{ display: 'flex', zIndex: 5 }}>
								<Image
									src={pokemon.sprites.front_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_default}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.front_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
								<Image
									src={pokemon.sprites.back_shiny}
									alt={pokemon.name}
									width={100}
									height={100}
								/>
							</Container>
						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</Layout>
	);
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await pokeApi.get<Pokedex>(`/pokemon?limit=151`);
	const paths: { params: { name: string } }[] = [];
	for (let poke of data.results) {
		paths.push({ params: { name: poke.name } });
	}

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { params } = ctx;
	const { name } = params as { name: string };

	return { props: { pokemon: await pokeData.extractData(name) } };
};

export default PokePageByName;
