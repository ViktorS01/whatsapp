import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { ScrollView } from 'react-native'
import { colors } from '../../constants'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }) => {
	return (
		<LinearGradient
			colors={['#14493E', '#212121']}
			start={{ x: 1.1, y: 0.9 }}
			style={{
				backgroundColor: colors.BG,
				height: '100%',
				width: '100%',
				paddingTop: 45,
			}}
		>
			<Header />
			{children}
			<Footer />
		</LinearGradient>
	)
}

export default Layout
