import { Container, Image, Text } from '@nextui-org/react';
import React from 'react';

const NoFavorites = () => {
	return (
		<Container
			css={{
				display: 'flex',
				flexDirection: 'column',
				height: 'calc(100vh - 100px)',
				alignItems: 'center',
				justifyContent: 'center',
				alignSelf: 'center',
			}}>
			<Text h1>No hay favoritos</Text>
			<Image
				src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'}
				alt='coso'
				width={250}
				height={250}
				css={{ opacity: 0.3 }}></Image>
		</Container>
	);
};

export default NoFavorites;
