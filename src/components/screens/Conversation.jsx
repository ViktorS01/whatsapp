import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { styles } from '../../../constants'
import Layout from '../Layout'
import Message from '../Conversations/Message'
import { useRoute } from '@react-navigation/core'
import {
	onSnapshot,
	collection,
	addDoc,
	serverTimestamp,
	query,
	orderBy,
} from 'firebase/firestore'
import {db, updatePhoto} from '../../utils/firebase'
import { useAuth } from '../../useAuth'

const Conversation = () => {
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const { user } = useAuth()

	const {
		params: { userId },
	} = useRoute()

	const sendMessage = async () => {
		try {
			await addDoc(collection(db, 'messages'), {
				timestamp: serverTimestamp(),
				userId: user.uid,
				text: message,
			})
		} catch (error) {
			alert(error)
		}

		setMessage('')
	}

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'messages'), orderBy('timestamp', 'asc')),
				snapshot => {
					setMessages(
						snapshot.docs.map(doc => ({
							id: doc.id,
							...doc.data(),
						}))
					)
				}
			),
		[]
	)

	useEffect(() => {
		console.log('Пытаюсь обновить фото!')
		updatePhoto().then(() => console.log('Ура, получилось!')).catch((err) => console.log(err));
		console.log('Обновил фото')
	}, [])

	return (
		<Layout>
			<View style={{ padding: 20 }}>
				<ScrollView style={{ height: '75%', flexDirection: 'column-reverse' }}>
					{messages.map(message => (
						<Message key={message.text} message={message} />
					))}
				</ScrollView>

				<View style={styles.flexDefault}>
					<TextInput
						placeholder='Enter your message'
						onChangeText={setMessage}
						value={message}
						style={{
							height: 40,
							padding: 10,
							backgroundColor: '#fff',
							borderRadius: 15,
							width: '86%',
						}}
					/>
					<TouchableOpacity onPress={sendMessage}>
						<MaterialCommunityIcons
							name='send-circle-outline'
							size={42}
							color='#fff'
						/>
					</TouchableOpacity>
				</View>
			</View>
		</Layout>
	)
}

export default Conversation
