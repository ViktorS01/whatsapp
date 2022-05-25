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
				<TouchableOpacity>
					<Image
						source={require('../images/white-whatsapp.png')}
						style={{
							width: 160,
							height: 53,
						}}
					/>
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Header
