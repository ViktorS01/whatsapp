import React, {useEffect, useState} from 'react'
import ConversationItem from './ConversationItem'
import { View } from 'react-native'
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../utils/firebase";

const Conversations = () => {
	const [lastMessage, setLastMessage] = useState('');
	const [lastMessageTime, setLastMessageTime] = useState('');
	const [usersList, setUsersList] = useState(null);


	const newConverse = [
		{
			image: usersList ? usersList[0].photoURL : 'asd',
			name: usersList ? usersList[0].displayName : 'asd',
			text: `${lastMessage}`,
			time: `${lastMessageTime}`,
			userId: usersList ? usersList[0].userID : 'asd',
		},
		{
			image: usersList ? usersList[1].photoURL : 'asd',
			name: usersList ? usersList[1].displayName : 'asd',
			text: `${lastMessage}`,
			time: `${lastMessageTime}`,
			userId: usersList ? usersList[1].userID : 'asd',
		},
		{
			image: usersList ? usersList[2].photoURL : 'asd',
			name: usersList ? usersList[2].displayName : 'asd',
			text: `${lastMessage}`,
			time: `${lastMessageTime}`,
			userId: usersList ? usersList[2].userID : 'asd',
		},
	]

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'messages'), orderBy('timestamp', 'asc')),
				snapshot => {
					const messages =
						snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data(),
						}));
					if (messages.length > 0 && messages[messages.length - 1].timestamp) {
						const currentDate = new Date(messages[messages.length - 1].timestamp.seconds * 1000 + 3600000);
						const firstSubstr = currentDate.toLocaleDateString().split('/')
						const secondSubstr = currentDate.toLocaleTimeString().split(':')
						setLastMessageTime(`${firstSubstr[1]}.${firstSubstr[0]} - ${secondSubstr[0]}:${secondSubstr[1]}`)
						setLastMessage(messages[messages.length - 1].text);
					}
				}
			),
	)

	useEffect(() =>
		onSnapshot(
			query(collection(db, 'users')),
			snapshot => {
				const users =
					snapshot.docs.map(user => ({
						...user.data(),
					}));
				setUsersList(users);
			}
		), [])

	return (
		usersList ? <View
			style={{
				display: 'flex',
			}}
		>
			{newConverse.map(conversation => (
				<ConversationItem key={conversation.name} conversation={conversation} />
			))}
		</View> : null
	)
}

export default Conversations
