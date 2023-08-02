import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator,RefreshControl } from 'react-native'
import React, { useState } from 'react'
import HeaderTab from '../HeaderTab'

const PostFl = (props) => {
    const arr = props.route.params.user.post;
    const [arrPost, setPost] = useState([]);
    const [loading, setloading] = useState(true);


    const getListPost = async () => {
        let url_api_post = "http://192.168.1.18:3000/news";
        try {
            const listPost = await fetch(url_api_post);

            const postJson = await listPost.json();
            //setarrPostFL([...postJson]);

            let arrTemp = arrPost;

            for (let i = 0; i < postJson.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (postJson[i].id == arr[j]) {
                        arrTemp.push(postJson[i]);
                    }
                }
            }
            console.log(arrTemp);
            setPost([...arrTemp]);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }
    }

    React.useLayoutEffect(() => {
        getListPost();
    }, []);




    const rederItemList = ({ item }) => {
        return (
            <TouchableOpacity style={styles.viewBanTin}
                onPress={() => {
                    console.log(props.route);
                    props.navigation.navigate('Post', { item });
                }}
            >
                <Image
                    source={{ uri: item.Img }}
                    style={{ width: 60, height: 60 }}
                />
                <Text
                    style={{
                        fontSize: 15,
                        fontWeight: "bold",
                        marginLeft: 10,
                    }}
                >{item.Titel}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.contener}>
            <HeaderTab name="TIN TỨC ĐÃ LƯU" />
            {
                (loading) ?
                    <ActivityIndicator />
                    :
                    <FlatList
                        style={{ marginTop: 20 }}
                        data={arrPost}
                        renderItem={rederItemList}
                        keyExtractor={(item,index) => index + "1"}
                    />
            }

        </View>
    )
}

export default PostFl

const styles = StyleSheet.create({
    contener: {
        flex: 0,
    },
    viewItem: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        marginTop: 5,
    },
    viewBanTin: {
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomWidth: 0.3,
    },
})