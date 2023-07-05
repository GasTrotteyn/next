import { Grid, Card } from '@nextui-org/react';
import React, { FC } from 'react';
import FavoriteCard from './favoriteCard';

interface Props {
	list: number[];
}

const FavoritesList: React.FC<Props> = ({ list }) => {
	return (
		<Grid.Container gap={2} direction='row' justify='flex-start'>
			{list.map((poke: number) => (
				<FavoriteCard id={poke} key={poke}></FavoriteCard>
			))}
		</Grid.Container>
	);
};

export default FavoritesList;
