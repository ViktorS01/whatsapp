import React from 'react'
import { View, Text, Image } from 'react-native'
import { colors } from '../../../constants'
import { useAuth } from '../../useAuth'

const Message = ({ message }) => {
	const { user } = useAuth()

	const isMsgByAuthUser = user.uid === message.userId

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				borderRadius: 20,
				backgroundColor: isMsgByAuthUser ? colors.ACCENT : 'purple',
				paddingVertical: 6,
				paddingHorizontal: 10,
				alignSelf: isMsgByAuthUser ? 'flex-end' : 'flex-start',
				marginBottom: 20,
			}}
		>
			<Image
				source={{ uri: user.avatar }}
				style={{ width: 50, height: 50, borderRadius: 50, marginRight: 6 }}
			/>
			<Text style={{ color: '#fff', fontSize: 16 }}>{message.text}</Text>
		</View>
	)
}

export default Message
