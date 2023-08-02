import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, Button, Modal, TextInput, Alert } from 'react-native'
import React from 'react'
import HeaderTab from '../HeaderTab'
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const EditPost = (props) => {

    
    const [img, setimg] = useState(props.route.params.post.Img);
    const [titel, settitel] = useState(props.route.params.post.Titel)
    const [content, setcontent] = useState(props.route.params.post.Content)
    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(props.route.params.post.Img)

    const editPost = () => {
        let url_api_post = "http://192.168.1.18:3000/news/" + props.route.params.post.id;
        let post = { "Titel": titel, "Content": content, "Img":  img , "Comments": [...props.route.params.post.Comments] }
        fetch(url_api_post, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
            },
            body: JSON.stringify(post)
        })
            .then((res) => {
                if (res.status == 200) {
                    Alert.alert("Thông báo", "Sửa thành công");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const pickImage = async () => {

        // Đọc ảnh từ thư viện thì không cần khai báo quyền
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3], // khung view cắt ảnh 
            quality: 1,
        });
        //console.log(result);

        if (!result.canceled) {
            setimg_source(result.assets[0].uri);
            // chuyển ảnh thành base64 để upload lên json
            let _uri = result.assets[0].uri;  // địa chỉ file ảnh đã chọn
            let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1); // lấy đuôi file


            FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
                .then((res) => {
                    // phải nối chuỗi với tiền tố data image
                    setiimg_base64("data:image/" + file_ext + ";base64," + res);
                    //console.log(img_base64);
                    // upload ảnh lên api thì dùng PUT có thể viết ở đây
                });
        }
    }

    return (

        <View style={styles.contener}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "aqua",
                    marginBottom: 10,
                }}
            >Sửa bài viết</Text>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "black",
                    marginBottom: 10,
                }}
            >Ảnh</Text>
           <TouchableOpacity
                         style={{
                            marginBottom: 20,
                        }}
                        onPress={pickImage}
                    >
                        <Image
                            style={{
                                width: 250, height: 150, borderWidth: 1, backgroundColor: "white",
                                borderColor: "black",
                                
                            }}
                            source={{ uri: img_base64 == null ? "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/272570208_1632162217117483_8988864629872482823_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LhISl75CvpsAX-SdIe9&_nc_ht=scontent.fhan15-2.fna&oh=00_AfB2qubKQA1sQyoKMAadbhQE6EWTPETHhaGeif39ME_jfg&oe=63F70388" : img_base64 }}
                        />
                    </TouchableOpacity>

           

            <View style={styles.viewInput}>
                <TextInput
                    value={titel}
                    placeholder='Nhập tiêu đề'
                    // onChange={validate}
                    onChangeText={(value) => { settitel(value) }}
                />
            </View>
            <Text
                style={{ color: "red", marginBottom: 10, }}
            ></Text>
            <View style={{
                width: "90%",
                height: "40%",
                borderWidth: 1,
                backgroundColor: "white",
                padding: 10,

            }}>
                <TextInput
                    value={content}
                    placeholder='Nhập nội dung'
                    secureTextEntry={true}
                    multiline={true}
                    // onChange={validate}
                    onChangeText={(value) => { setcontent(value); }}
                />
            </View>
            <Text
                style={{ color: "red", marginBottom: 10, }}
            ></Text>
            <View
                style={{ marginBottom: 20 }}
            >
                <Button
                    title='Sửa bài viết'
                    onPress={editPost}
                // disabled={vali}
                />
            </View>

            <Button
                title='Thoát'
                onPress={() => { props.navigation.navigate("Admin") }}
            />
        </View>
    )
}

export default EditPost

const styles = StyleSheet.create({
    contener: {
        flex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    viewBanTin: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    viewDialog: {
        width: "80%",
        backgroundColor: "grey",
        marginLeft: "10%",
        padding: 20,
        marginTop: "2%"
    },

    viewInput: {
        width: "80%",
        borderWidth: 1,
        backgroundColor: "white",
        padding: 10,
    }

})