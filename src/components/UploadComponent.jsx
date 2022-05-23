import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { colors } from '../../constants'
import {useAuth} from "../useAuth";
// import {getImageUri} from "../utils/getImageUri";
// import * as ImagePicker from "react-native-image-picker"


const UploadComponent = () => {
    const {user} = useAuth();
    const [image, setImage] = useState(null);

    // const chooseImage = () => {
    //     let options = {
    //         title: 'Select Avatar',
    //         cameraType: 'front',
    //         mediaType: 'photo' ,
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };
    //     ImagePicker.launchImageLibrary(
    //         {
    //             mediaType: 'photo',
    //             includeBase64: false,
    //             maxHeight: 200,
    //             maxWidth: 200,
    //         },
    //         (response) => {
    //             console.log(response);
    //             this.setState({resourcePath: response});
    //         },
    //     )
    // }

    const handleLoadPhotoBtn = async () => {
        // await chooseImage();
    }

    return (
        <View>
            <Text>Ваше фото: </Text>
            <Image
                source={{uri: user.photoURL}}
                style={{width: 200, height: 200}}
            />
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
})

export default UploadComponent
