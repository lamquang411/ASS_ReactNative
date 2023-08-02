import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator, Button, Modal, TextInput, Alert } from 'react-native'
import React from 'react'
import HeaderTab from '../HeaderTab'
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import EditPost from './EditPost';


const Admin = (props) => {
    const [listPost, setlistPost] = useState([]);
    const [loading, setloading] = useState(true);
    const [showDiaLog, setshowDialog] = useState(false);
    const [img, setimg] = useState("");
    const [titel, settitel] = useState("")
    const [content, setcontent] = useState("")
    const [img_source, setimg_source] = useState(null)
    const [img_base64, setiimg_base64] = useState(null)


    const getListPost = async () => {
        let url_api_post = "http://192.168.1.18:3000/news";
        try {
            const listPost = await fetch(url_api_post);

            const postJson = await listPost.json();

            setlistPost([...postJson]);

        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getListPost();
        });

        return unsubscribe;
    }, [props.navigation]);

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



    const addPost = () => {
        
        let url_api_post = "http://192.168.1.18:3000/news";
        
        let post = { "Titel": titel, "Content": content, "Img": img_base64 == null ? "https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/272570208_1632162217117483_8988864629872482823_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LhISl75CvpsAX-SdIe9&_nc_ht=scontent.fhan15-2.fna&oh=00_AfB2qubKQA1sQyoKMAadbhQE6EWTPETHhaGeif39ME_jfg&oe=63F70388" : img_base64, "Comments": [] }
        console.log(url_api_post);
        fetch(url_api_post, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json',
            },
            body: JSON.stringify(post)
        })
            .then((res) => {
                console.log(res.status);
                if (res.status == 201) {
                    Alert.alert("Thông báo", "Thêm thành công");
                    getListPost();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }



    const rederItemList = ({ item }) => {

        const deletePost = () => {
            Alert.alert("Thông báo", "Bạn có muốn xóa không ?", [
                {
                    text: "OK",
                    onPress: () => {
                        let url_api_post = "http://192.168.1.18:3000/news/" + item.id;

                        fetch(url_api_post, {
                            method: "DELETE",
                            headers: {
                                Accept: 'application/json',
                                "Content-type": 'application/json',
                            },
                        })
                            .then((res) => {
                                if (res.status == 200) {
                                    Alert.alert("Thông báo", "Xóa thành công");
                                    getListPost();
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                },
                {
                    text: "KO",
                    onPress: () => {

                    },
                    style: "cancel",

                }
            ], {
                cancelable: true
            })


        }
        return (
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.3,
                    marginBottom: 20,
                }}
            >
                <View style={styles.viewBanTin}
                    onPress={() => {
                        console.log(props.route);
                    }}
                >
                    <Image
                        source={{ uri: item.Img }}
                        style={{ width: 50, height: 50 }}
                    />
                    <View>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginLeft: 10,
                            }}
                        >{item.Titel}</Text>
                        <View
                            style={{ flexDirection: "row", marginLeft: 10, marginTop: 20 }}
                        >
                            <Text
                                style={{ marginRight: 10, fontSize: 15, fontWeight: "bold", color: "red" }}
                                onPress={deletePost}
                            >Xóa</Text>

                            <Text
                                style={{ fontSize: 15, fontWeight: "bold", color: "green" }}
                                onPress={() => { props.navigation.navigate("EditPost", { post: item }) }}
                            >Sửa</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>

        )
    }

    return (
        <View style={styles.contener}>
            <HeaderTab name="QUẢN LÝ BÀI VIẾT" />
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                }}
            >DANH SÁCH BÀI VIẾT</Text>
            <Button
                title='Thêm bài viết'
                onPress={() => { setshowDialog(true) }}
            />
            <Modal
                visible={showDiaLog}
                transparent={false}
                animationType="slide"
                onRequestClose={() => {
                    setshowDialog(false)
                }}
            >
                <View style={styles.viewDialog}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "white",
                            marginBottom: 20,
                        }}
                    >Thêm bài viết</Text>
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "white",
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
                                width: "100%", height: 150, borderWidth: 1, backgroundColor: "white",
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
                        style={{ color: "red", marginBottom: 20, }}
                    ></Text>
                    <View style={{
                        width: "100%",
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
                        style={{ color: "red", marginBottom: 20, }}
                    ></Text>
                    <View
                        style={{ marginBottom: 20 }}
                    >
                        <Button
                            title='Thêm bài viết'
                            onPress={addPost}
                        // disabled={vali}
                        />
                    </View>

                    <Button
                        title='Thoát'
                        onPress={() => { setshowDialog(false) }}
                    />
                </View>
            </Modal>
            {
                (loading) ?
                    (<ActivityIndicator />)
                    :
                    <FlatList
                        style={{ width: "100%", marginTop: 20 }}
                        data={listPost}
                        renderItem={rederItemList}
                        keyExtractor={(item, index) => index + "1"}
                    />
            }
        </View>
    )
}

export default Admin

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
        marginTop: "20%"
    },

    viewInput: {
        width: "100%",
        borderWidth: 1,
        backgroundColor: "white",
        padding: 10,
    }


})