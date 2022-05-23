import React from 'react'
import { ScrollView } from 'react-native'
import Conversations from '../Conversations/Conversations'
import Stories from '../Stories'
import Layout from '../Layout'
import UploadComponent from "../UploadComponent";

const ImageUpload = () => {
    return (
        <Layout>
            <ScrollView>
                <Stories />
                <UploadComponent />
            </ScrollView>
        </Layout>
    )
}

export default ImageUpload
