import React, {useEffect, useState} from 'react'
import ConversationItem from './ConversationItem'

import { colors } from '../../../constants'
import { View } from 'react-native'
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db, getListUsers} from "../../utils/firebase";
import {useAuth} from "../../useAuth";
import firebase from "firebase/compat";
// import firebase from "firebase/compat";


export const conversations = [
	{
		image:
			'https://www.exibartstreet.com/wp-content/uploads/avatars/2465/5e0de52aeee8b-bpfull.jpg',
		name: 'Arman',
		text: 'The unseen of spending three',
		time: '09:11',
		userId: 'C6uVHtPIODfHnPu7LI2CEuhTFnc2',
	},
	// {
	// 	image: 'https://legamart.com/avatars/Bruce.jpg',
	// 	name: 'Afasin',
	// 	text: 'Hi! How are you?',
	// 	time: '09:11',
	// 	userId: '1OGEhuFfoqRNWf3zYHAaajESht52',
	// },
	// {
	// 	image:
	// 		'https://sammyplaysdirty.com/wp-content/uploads/2017/06/user-avatar-pic3.jpg',
	// 	name: 'Adele',
	// 	text: 'Hello bro',
	// 	time: '09:11',
	// 	userId: 'w2efqwef2w3rt',
	// },
	// {
	// 	image:
	// 		'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
	// 	name: 'Amar',
	// 	text: 'The unseen of spending three',
	// 	time: '09:11',
	// 	userId: 'w2efqwef2w3rt',
	// },
]

const Conversations = () => {
	const [lastMessage, setLastMessage] = useState('');
	const [lastMessageTime, setLastMessageTime] = useState('');

	const newConverse = [
		{
			image:
				'https://www.exibartstreet.com/wp-content/uploads/avatars/2465/5e0de52aeee8b-bpfull.jpg',
			name: 'Arman',
			text: `${lastMessage}`,
			time: `${lastMessageTime}`,
			userId: 'C6uVHtPIODfHnPu7LI2CEuhTFnc2',
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
					const currentDate = new Date(messages[messages.length - 1].timestamp.seconds * 1000 + 3600000);
					const firstSubstr = currentDate.toLocaleDateString().split('/')
					const secondSubstr = currentDate.toLocaleTimeString().split(':')
					setLastMessageTime(`${firstSubstr[1]}.${firstSubstr[0]} - ${secondSubstr[0]}:${secondSubstr[1]}`)
					setLastMessage(messages[messages.length - 1].text);
				}
			),
		[]
	)
	const {user} = useAuth()

	useEffect(() =>
		onSnapshot(
			query(collection(db, 'users')),
			snapshot => {
				const users =
					snapshot.docs.map(user => ({
						...user.data(),
					}));
				console.log(users);
				console.log(user);
			}
		), [])

	useEffect(() => {
		console.log(getListUsers())
	}, [])

	return (
		<View
			style={{
				backgroundColor: colors.DARK,
				borderRadius: 25,
				padding: 20,
				marginHorizontal: 20,
			}}
		>
			{newConverse.map(conversation => (
				<ConversationItem key={conversation.name} conversation={conversation} />
			))}
		</View>
	)
}

export default Conversations
