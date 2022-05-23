import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {colors, styles} from '../../../constants'
import { useAuth } from '../../useAuth'

const ConversationItem = ({ conversation }) => {
	const navigation = useNavigation()

	const { user } = useAuth()

	if (user?.uid === conversation.userId) return null

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate('Conversation', {
					userId: conversation.userId,
				})
			}
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				marginBottom: 15,
				backgroundColor: colors.DARK,
				borderRadius: 25,
				padding: 20,
				marginHorizontal: 20,
			}}
		>
			<Image
				source={{ uri: conversation.image }}
				style={{ width: 50, height: 50, borderRadius: 50 }}
			/>
			<View style={{ marginLeft: 15, width: '75%' }}>
				<View style={{ ...styles.flexDefault, marginBottom: 8 }}>
					<Text style={{ color: '#fff', fontWeight: 'bold' }}>
						{conversation.name}
					</Text>
					<Text style={{ color: '#5F5F5F' }}>{conversation.time}</Text>
				</View>
				<View>
					<Text style={{ color: '#686868' }}>{conversation.text ? conversation.text : 'Вы не общались с этим пользователем!'}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default ConversationItem
