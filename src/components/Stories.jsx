import React, {useEffect, useState} from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import {collection, doc, onSnapshot, query, updateDoc} from "@firebase/firestore";
import {db} from "../utils/firebase";
import { StoryContainer } from 'react-native-stories-view';
import * as ImagePicker from "expo-image-picker";
import {useAuth} from "../useAuth";

const styleStory = {
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 50,
	padding: 4,
}

const stylewh = {
	height: 50,
	width: 50,
}

const styleText = { color: '#fff', textAlign: 'center', marginTop: 6 }

const Stories = () => {
	const [stories, setStories] = useState([]);
	const [visibleStory, setVisibleStory] = useState(false);
	const [oldStories, setOldStories] = useState(null);
	const {user} = useAuth()
	const [currentStories, setCurrentStories] = useState(
		null
	)

	const viewStory = async (id) => {
		await setCurrentStories(JSON.parse(stories.find(item => item.id === id).stories));
	}

	useEffect(() => {
		if (currentStories && currentStories.length > 0){
			setVisibleStory(true);
		}
	}, [currentStories])

	const chooseImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			await updateStories([...oldStories, result.uri]);
			setCurrentStories([...oldStories, result.uri]);
		}
	}

	const updateStories = (array) => {
		const newArray = JSON.stringify(array);
		const userRef = doc(db, "users", user.uid);
		updateDoc(userRef, {
			stories: newArray
		});
	}

	useEffect(() => {
		onSnapshot(
			query(collection(db, 'users')),
			snapshot => {
				const users =
					snapshot.docs.map(user => ({
						...user.data(),
					}));
				setOldStories(JSON.parse(users.find(item => item.userID === user.uid).stories));
			}
		)
	}, [])

	useEffect(() =>
		onSnapshot(
			query(collection(db, 'users')),
			snapshot => {
				const users =
					snapshot.docs.map(user => ({
						...user.data(),
					}));
				setStories(users.map((item) =>  {
					return {
						image: item.photoURL,
						name: item.displayName,
						id: item.userID,
						stories: item.stories,
					}
				}))
			}
		), [])

	return (
		visibleStory ? <StoryContainer
				visible={visibleStory}
				enableProgress={true}
				images={currentStories}
				duration={20}
				onComplete={() => {
					setVisibleStory(false);
					setCurrentStories(null);
				}}
				containerStyle={{
					width: '100%',
					height: '80%',
					zIndex: 1000,
					top: 0,
				}}
			/> : <ScrollView horizontal={true} style={{ marginVertical: 20 }}>
				<TouchableOpacity style={{ marginRight: 25, marginLeft: 25 }} onPress={() => chooseImage()}>
					<View
						style={{
							...styleStory,
							width: 56,
							height: 56,
							borderWidth: 2,
							borderColor: '#536E68',
							borderStyle: 'dashed',
						}}
					>
						<Entypo name='plus' size={22} color='#fff' />
					</View>
					<Text style={{ ...styleText, marginTop: 8 }}>Add</Text>
				</TouchableOpacity>

				{stories.map(story => (
					<TouchableOpacity key={story.name} style={{ marginRight: 25 }} onPress={() => viewStory(story.id)}>
						<View
							style={{
								...styleStory,
								borderWidth: 2,
								borderColor: '#29AB51',
								borderStyle: 'solid',
							}}
						>
							<Image
								source={{ uri: story.image }}
								style={{ ...stylewh, borderRadius: 50 }}
							/>
						</View>
						<Text style={styleText}>{story.name}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
	)
}

export default Stories
