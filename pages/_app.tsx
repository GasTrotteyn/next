import { AppProps } from 'next/app';

import { NextUIProvider } from '@nextui-org/react';

import { darktheme } from '../themes';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider theme={darktheme}>
			<Component {...pageProps} />
		</NextUIProvider>
	);
}

export default MyApp;
