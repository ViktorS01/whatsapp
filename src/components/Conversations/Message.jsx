import React, {useEffect, useState} from 'react'
import { View, Text, Image } from 'react-native'
import { colors } from '../../../constants'
import { useAuth } from '../../useAuth'
import {collection, onSnapshot, query} from "@firebase/firestore";
import {db} from "../../utils/firebase";

const Message = ({ message }) => {
	const { user } = useAuth()
	const [userAvatar, setUserAvatar] = useState(null)
	const isMsgByAuthUser = user.uid === message.userId

	useEffect(() =>
		onSnapshot(
			query(collection(db, 'users')),
			snapshot => {
				const users =
					snapshot.docs.map(user => ({
						...user.data(),
					}));
				setUserAvatar(users.find((item) => item.userID === message.userId).photoURL);

			}
		))

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
				source={{ uri: isMsgByAuthUser ? user.avatar : userAvatar }}
				style={{ width: 50, height: 50, borderRadius: 50, marginRight: 6 }}
			/>
			<Text style={{ color: '#fff', fontSize: 16 }}>{message.text}</Text>
		</View>
	)
}

export default Message
