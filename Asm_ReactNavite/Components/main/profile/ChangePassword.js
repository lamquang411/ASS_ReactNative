import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import HeaderTab from '../HeaderTab'

const ChangePassword = (props) => {
    const userLogin = props.route.params.user;
    const [oldPass, setoldPass] = useState("");
    const [newPass, setnewPass] = useState("");
    const [newPass2, setnewPass2] = useState("");
   
    const ChangePassword = () => {
        let url_api_account = "http://192.168.1.18:3000/account/" + userLogin.id;

        if(oldPass === "" || newPass === "" || newPass2 === "") {
            Alert.alert("Thông báo",'Không được để chống');
            return;
        }

        if(oldPass != userLogin.password) {
            Alert.alert("Thông báo",'Mật khẩu cũ không đúng');
            return;
        }

        if(newPass2 != newPass) {
            Alert.alert("Thông báo",'Mật khẩu mới không khớp');
            return;
        }

        let user = {"username" : userLogin.username,"password": newPass,"phonenumber":userLogin.phonenumber,"post":[...userLogin.post],"name":userLogin.name}
        fetch(url_api_account,{
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-type":"application/json",
            },
            body: JSON.stringify(user)
        })
        .then((res) => {
            if(res.status == 200){
                Alert.alert("Thông báo","Đổi mật khẩu thành công !");
            }
        })
        .catch((err => {
            console.log(err)
        }))

    }

  return (
    <View style={styles.container}>
      <HeaderTab name='ĐỔI MẬT KHẨU'/>
      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Nhập mật khẩu cũ</Text>
        <TextInput
          value={oldPass}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu"
          onChangeText={(value) => {setoldPass(value)}}
        />
        <TouchableOpacity
          style={{ position: "absolute", left: "90%", top: "70%" }}
        >
          <Image/>
        </TouchableOpacity>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Nhập mật khẩu mới</Text>
        <TextInput
         value={newPass}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu"
          onChangeText={(value) => {setnewPass(value)}}
        />
        <TouchableOpacity
          style={{ position: "absolute", left: "90%", top: "70%" }}
        >
          <Image/>
        </TouchableOpacity>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Nhập lại mật khẩu mới</Text>
        <TextInput
        value={newPass2}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu"
          onChangeText={(value) => {setnewPass2(value)}}
        />
        <TouchableOpacity
          style={{ position: "absolute", left: "90%", top: "70%" }}
        >
          <Image/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          marginVertical: 20,
        }}
        onPress={ChangePassword}
       
      >
        <Text style={styles.button}>Thay đổi</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: "center",
        alignItems: "center",
      },
      texthello: {
        fontSize: 24,
        fontWeight: "700",
        paddingVertical: 40,
      },
      inputcontainer: {
        position: "relative",
        marginHorizontal: 30,
        width: "85%",
        padding: 10,
      },
      textInput: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderWidth: 1,
        marginVertical: 5,
        borderRadius: 8,
        borderColor: "gray",
      },
      bottominput: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%",
      },
      button: {
        width: "100%",
        paddingVertical: 10,
        borderRadius: 8,
        color: "white",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "#0E64D2",
      },
})