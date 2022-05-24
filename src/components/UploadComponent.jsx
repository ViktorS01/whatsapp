import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import {useAuth} from "../useAuth";
import {collection, onSnapshot, query} from "@firebase/firestore";
import {db} from "../utils/firebase";
//import * as ImagePicker from 'expo-image-picker';


const UploadComponent = () => {
    const {user} = useAuth();
    const [image, setImage] = useState(null);

    const chooseImage = () => {

    }

    useEffect(() => {
        onSnapshot(
            query(collection(db, 'users')),
            snapshot => {
                const users =
                    snapshot.docs.map(user => ({
                        ...user.data(),
                    }));
                setImage(users.find(item => item.userID === user.uid).photoURL);
            }
        )
    }, [])

    const handleLoadPhotoBtn = async () => {
        await chooseImage();
    }

    return (
        <View style={stylesCreated.container}>
            <Text style={stylesCreated.text}>Ваше фото: </Text>
            {image && <Image
                source={{uri: image}}
                style={{width: 200, height: 200, marginVertical: 25}}
            /> }
            <Button title={'Сменить фото '} onPress={() => handleLoadPhotoBtn()}/>
        </View>
    )
}

const stylesCreated = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 30,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: 80,
    },
})

export default UploadComponent
