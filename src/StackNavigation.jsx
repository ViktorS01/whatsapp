import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Stories from './components/Stories'
//import Conversations from './components/Conversations/Conversations'
import Conversation from './components/screens/Conversation'
import Home from './components/screens/Home'
import { colors } from '../constants'
import AuthForm from './components/AuthForm'
import { useAuth } from './useAuth'
import ImageUpload from "./components/screens/ImageUpload";

const Stack = createStackNavigator()

const StackNavigation = () => {
	const { user } = useAuth()

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{user ? (
				<>
					<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name='Conversation' component={Conversation} />
					<Stack.Screen name='ImageUpload' component={ImageUpload} />
				</>
			) : (
				<Stack.Screen name='Auth' component={AuthForm} />
			)}
		</Stack.Navigator>
	)
}

export default StackNavigation
