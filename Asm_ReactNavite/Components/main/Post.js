import { StyleSheet, View, Text, Image, ScrollView, TextInput, Slider, Button, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HeaderTab from './HeaderTab'

const Post = (props) => {
    const post = props.route.params.item;
    const user = props.route.params.user;
    const [arrCMT, setarrCMT] = useState([]);
    const [arrFollow, setarrFollow] = useState(user.post);
    const [cmt, setcmt] = useState("");
    const [checkFL, setcheckFL] = useState(true);

    const getCMT = async () => {
        let uri = "http://192.168.1.18:3000/news";

        try {
            const jsonData = await fetch(uri);

            const jsonCMT = await jsonData.json();
            let arrTemp = [...jsonCMT];
            let postTemp = null;

            for (let i = 0; i < arrTemp.length; i++) {
                if (arrTemp[i].id == post.id) {
                    postTemp = arrTemp[i];
                }
            }
            setarrCMT([...postTemp.Comments])
        } catch (error) {
            console.log(error);
        }

    }

    const checkfollow = () => {
        let arrTemp = arrFollow;
        let check = true;
        for (let i = 0; i < arrTemp.length; i++) {
            if (arrTemp[i] == post.id) {
                check = false;
                break;
            }
        }
        setcheckFL(check);
    }

    const Follow = () => {
        let uri = "http://192.168.1.10:3000/account/" + user.id;

        let arrTemp = arrFollow;

        let id = post.id;

        arrTemp.push(id);

        setarrFollow(arrTemp);
        console.log(arrFollow);
        let userTemp = { username: user.username, password: user.password, phonenumber: user.phonenumber, post: arrFollow, img: user.img, name: user.name };


        fetch(uri, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userTemp)
        })
            .then((res) => {
                console.log("OK")
                setcheckFL(false)
            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    const unFollow = () => {
        let uri = "http://192.168.1.10:3000/account/" + user.id;

        let arrTemp = arrFollow;

        let id = post.id;
        let index = 0;
        for (let i = 0; i < arrTemp.length; i++) {
            if (arrTemp[i] == id) {
                index = i;
                break;
            }
        }

        arrTemp.splice(index, 1);

        setarrFollow(arrTemp);

        let userTemp = { username: user.username, password: user.password, phonenumber: user.phonenumber, post: arrFollow, img: user.img, name: user.name };


        fetch(uri, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userTemp)
        })
            .then((res) => {
                console.log("OK")
                setcheckFL(true)
            })
            .catch((ex) => {
                console.log(ex);
            });



    }

    const clickFollow = () => {
        console.log(checkFL)
        if (checkFL) {
            Follow();
            return;
        }
        unFollow();
    }

    React.useLayoutEffect(() => {
        getCMT();
        checkfollow();
    }, [])


    const addConmment = () => {
        let uri = "http://192.168.1.18:3000/news/" + post.id;

        if (cmt.length <= 0) {
            Alert.alert("Thông báo", "Không được để chống");
            return;
        }

        let CMT = { "user": user, "cmt": cmt }
        let arrCMTTemp = arrCMT;
        arrCMTTemp.push(CMT);
        setarrCMT(arrCMTTemp);

        let userCMT = { "Titel": post.Titel, "Content": post.Content, "Img": post.Img, "Comments": [...arrCMT] }
        fetch(uri, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userCMT)
        })
            .then((res) => {
                getCMT();
                console.log("OK")
            })
            .catch((ex) => {
                console.log(ex);
            });
    }


    const rederItemCMT = ({ item }) => {
        return (
            <View style={styles.viewCMT}>
                <Image
                    style={{ width: 45, height: 45, marginRight: 15 }}
                    source={{ uri: item.user.img }}
                />
                <View>
                    <Text style={{ fontSize: 11, fontWeight: "bold" }}>{item.user.name}</Text>
                    <Text>{item.cmt}</Text>
                </View>
            </View>
        )
    }
    return (
        <><HeaderTab name="CHI TIẾT" />
            <ScrollView style={styles.contener}>

                <View style={styles.viewBanTin}>

                    <Text
                        style={{ fontSize: 15, fontWeight: "bold" }}
                    >{post.Titel}</Text>
                    <Text>
                        {post.Content}
                    </Text>

                    <Image
                        style={{ width: "100%", height: 260 }}
                        source={{ uri: post.Img }} />
                    <TouchableOpacity
                        style={{
                            width: 100,
                            height: 40,
                            backgroundColor: checkFL ? "aqua" : "red",
                            borderRadius: 20,
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                        onPress={clickFollow}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontWeight: "bold"
                            }}
                        >{checkFL ? "Theo dõi" : "Hủy theo dõi"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View
                style={{ padding:15, }}
            >
                <Text
                    style={{ fontSize: 15, fontWeight: "bold" }}
                >Bình luận</Text>

                <FlatList
                    style={{ width: "100%", height: 120 }}
                    data={arrCMT}
                    renderItem={rederItemCMT}
                    keyExtractor={(item, index) => index + '1'}
                />
                <View style={styles.viewCMT}>
                    <Image
                        style={{ width: 60, height: 60 }}
                        source={{ uri: user.img }} />
                    <TextInput
                        value={cmt}
                        style={styles.textInput}
                        placeholder='Bình luận'
                        maxLength={500}
                        onChangeText={(value) => { setcmt(value) }}
                    />
                    <Button
                        title='Đăng'
                        onPress={addConmment}
                    />
                </View>
            </View>

        </>
    )
}

export default Post

const styles = StyleSheet.create({
    contener: {
        flex: 0,
        padding: 10,
    },

    viewTitle: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 5,
    },

    viewBanTin: {
        width: "100%",
        marginBottom: 20,
    },

    viewCMT: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginTop: 20,
    },

    textInput: {
        width: "65%",
        height: 60,
        borderWidth: 0.3,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
    }
})