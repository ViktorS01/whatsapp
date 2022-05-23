import React from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { styles } from '../../constants'

const stories = [
	{
		image:
			'https://www.exibartstreet.com/wp-content/uploads/avatars/2465/5e0de52aeee8b-bpfull.jpg',
		name: 'Arman',
	},
	{
		image: 'https://legamart.com/avatars/Bruce.jpg',
		name: 'Afasin',
	},
	{
		image:
			'https://sammyplaysdirty.com/wp-content/uploads/2017/06/user-avatar-pic3.jpg',
		name: 'Adele',
	},
	{
		image:
			'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
		name: 'Amar',
	},
]

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
	return (
		<ScrollView horizontal={true} style={{ marginVertical: 20 }}>
			<TouchableOpacity style={{ marginRight: 25, marginLeft: 25 }}>
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
				<TouchableOpacity key={story.name} style={{ marginRight: 25 }}>
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
