import { StyleSheet, View, Text, Image, ScrollView, TextInput, Button, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import HeaderTab from './HeaderTab'
import { useEffect, useState } from "react";

const Home = (props) => {
    const [listPost, setlistPost] = useState([]);
    const [loading, setloading] = useState(true);

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

    const rederItemList = ({ item }) => {
        return (
            <TouchableOpacity style={styles.viewBanTin}
                onPress={() => {
                    console.log(props.route);
                    props.navigation.navigate('Post',{item});
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
        <><HeaderTab name="TIN HOT TRONG NGÀY" />
            <View style={styles.contener}>
                {
                    (loading) ? 
                    (<ActivityIndicator/>) 
                    : 
                    <FlatList
                        style={{ marginTop: 20 }}
                        data={listPost}
                        renderItem={rederItemList}
                        keyExtractor={item => item.id}
                    />
                }
            </View></>
    )
}

export default Home

const styles = StyleSheet.create({
    contener: {
        flex: 0,
    },


    viewBanTin: {
        flexDirection: "row",
        justifyContent: "flex-start",
        borderBottomWidth:0.3,
    },


    textInput: {
        width: "70%",
        height: 60,
        borderWidth: 0.3,
        borderRadius: 10,
        marginLeft: 10,
        padding: 10,
    }

});