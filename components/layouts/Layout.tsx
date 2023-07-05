import * as React from 'react';
import Head from 'next/head';

import { Navbar } from '../ui';

type Props = {
	children?: React.ReactNode;
	title?: string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
	const origin = typeof window === 'undefined' ? '' : window.location.origin;

	return (
		<>
			<Head>
				<title>{title || 'un titlepor defecto'}</title>
				<meta name='author' content='Gaston Trott' />
				<meta name='dscription' content={`info sobre el pokemon ${title}`} />
				<meta name='keywords' content={`pokemon, cosas, ${title}`} />
				<meta property='og:title' content={`información sobre ${title}`} />
				<meta property='og:description' content={`Esta es la página de ${title}`} />
				<meta property='og:image' content={`${origin}/img/banner.png`} />
			</Head>
			<Navbar></Navbar>
			<main style={{ padding: '0px 20px' }}>{children}</main>
		</>
	);
};
