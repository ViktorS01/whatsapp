import React from 'react'
import { ScrollView } from 'react-native'
import Conversations from '../Conversations/Conversations'
import Stories from '../Stories'

import Layout from '../Layout'

const Home = () => {
	return (
		<Layout>
			<ScrollView>
				<Stories />
				<Conversations />
			</ScrollView>
		</Layout>
	)
}

export default Home
