import React, {useEffect, useState} from 'react'
import ConversationItem from './ConversationItem'
import { View } from 'react-native'
import {collection, onSnapshot, orderBy, query} from "@firebase/firestore";
import {db} from "../../utils/firebase";
import {useAuth} from "../../useAuth";

const Conversations = () => {
	const [usersList, setUsersList] = useState(null);
	const [allMessages, setAllMessages] = useState(null);
	const [conversationList, setConversationList] = useState(null);
	const { user } = useAuth()

	const showLastMessage = (array, id) => {
		const newArray = array.filter((item) => (item.to === user.uid && item.userId === usersList[id].userID) || (item.to === usersList[id].userID && item.userId === user.uid));
		return newArray.length > 0 ? newArray[newArray.length - 1].text : '';
	}

	const showLastTime = (array, id) => {
		const newArray = array.filter((item) => (item.to === user.uid && item.userId === usersList[id].userID) || (item.to === usersList[id].userID && item.userId === user.uid));
		if (newArray.length > 0){
			const currentDate = new Date(newArray[newArray.length - 1].timestamp.seconds * 1000 + 3600000);
			const firstSubstr = currentDate.toLocaleDateString().split('/');
			const secondSubstr = currentDate.toLocaleTimeString().split(':');
			return `${firstSubstr[1]}.${firstSubstr[0]} - ${secondSubstr[0]}:${secondSubstr[1]}`
		} else {
			return ''
		}
	}

	useEffect(() => {
		if (usersList && usersList.length > 0){
			const newCon = usersList.map((item, index) => {
				return {
					image: item.photoURL,
					name: item.displayName,
					text: allMessages && allMessages.length > 0 ? showLastMessage(allMessages, index) : '',
					time: allMessages && allMessages.length > 0 ? showLastTime(allMessages, index) : '',
					userId: item.userID,
				}
			})
			setConversationList(newCon);
		}
	}, [usersList, allMessages])

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
						setAllMessages(messages);
					}
				}
			), []
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
		usersList && conversationList ? <View
			style={{
				display: 'flex',
			}}
		>
			{conversationList.map(conversation => (
				<ConversationItem key={conversation.userId} conversation={conversation} />
			))}
		</View> : null
	)
}

export default Conversations
