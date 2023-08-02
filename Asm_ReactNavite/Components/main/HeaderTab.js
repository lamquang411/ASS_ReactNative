import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const HeaderTab = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.textHeader}>{props.name}</Text>
        </View>
    )
}

export default HeaderTab

const styles = StyleSheet.create({

    header: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        backgroundColor: "aqua",

    },

    textHeader: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    }
});