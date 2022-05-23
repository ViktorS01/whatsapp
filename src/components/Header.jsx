import React from 'react'
import { Image, Linking, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const Header = () => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingHorizontal: 20,
			}}
		>
			<View>
				<TouchableOpacity onPress={() => Linking.openURL('https://google.com')}>
					<Image
						source={require('../images/white-whatsapp.png')}
						style={{
							width: 160,
							height: 53,
						}}
					/>
				</TouchableOpacity>
			</View>
			<View>
				<AntDesign name='search1' size={30} color='#fff' />
			</View>
		</View>
	)
}

export default Header
