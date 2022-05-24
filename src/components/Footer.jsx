import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { AntDesign, Feather, Entypo } from '@expo/vector-icons'
import { colors, styles } from '../../constants'
import { useRoute } from '@react-navigation/core'
import {Link, useNavigation} from '@react-navigation/native'
import { useAuth } from '../useAuth'

const Footer = () => {
	const route = useRoute()

	const checkActive = routeName =>
		route.name === routeName ? colors.ACCENT : colors.GRAY

	const { logout } = useAuth()
	const navigation = useNavigation()

	return (
		<View
			style={{
				...styles.flexDefault,
				justifyContent: 'space-around',
				backgroundColor: colors.DARK,
				padding: 20,
				paddingBottom: 40,
				borderTopLeftRadius: 30,
				borderTopRightRadius: 30,
				borderStyle: 'solid',
				borderColor: '#383838',
				borderTopWidth: 1,
				borderRightWidth: 1,
				borderLeftWidth: 1,
				width: '102%',
				marginLeft: '-1%',
			}}
		>
			<Link to={{ screen: 'Home' }}>
				<AntDesign name='home' size={28} color={checkActive('Home')} />
			</Link>
			<Feather name='phone' size={28} color={checkActive('Phone')} />
			<View
				style={{
					width: 50,
					height: 50,
					backgroundColor: '#29AA88',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
					borderRadius: 50,
				}}
			>
				<Entypo name='plus' size={22} color='#fff' />
			</View>
			<TouchableOpacity onPress={() => navigation.navigate('ImageUpload')}>
				<AntDesign name='camerao' size={28} color={checkActive('ImageUpload')} />
			</TouchableOpacity>


			<TouchableOpacity onPress={logout}>
				<AntDesign name='back' size={28} color={checkActive('Profile')} />
			</TouchableOpacity>
		</View>
	)
}

export default Footer
