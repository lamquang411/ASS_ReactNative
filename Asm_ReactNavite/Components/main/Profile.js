import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, BackHandler } from 'react-native'
import React from 'react'
import HeaderTab from './HeaderTab'
const Profile = (props) => {

  const userLogin = props.route.params.user;
  const btnAdmin = ()=>{
    if(!(userLogin.username == "admin")){
      Alert.alert("Chức năng này chỉ danh cho admin")
    }else{
      props.navigation.navigate("Admin");
    }
  }

  return (
    <View style={styles.contener}>
      <HeaderTab name="THÔNG TIN TÀI KHOẢN" />
      <View>
        <Image
          style={{ width: 120, height: 120, borderRadius: 70, marginTop: 10 }}
          source={{ uri: userLogin.img }} />
        <Text
          style={{
            fontSize:20,
            fontWeight:"bold",
            marginBottom:20,
          }}
        >{userLogin.name}</Text>
        <TouchableOpacity style={styles.viewMenu}
        onPress={() => {
          props.navigation.navigate("PostFL")
        }}
        >
          <Text>Tin tức đã lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMenu}>
          <Text>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMenu}
          onPress={btnAdmin}
        >
          <Text>Đặc quyền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMenu}>
          <Text>Chính sách và bảo mật</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMenu}
         onPress={() => {
          props.navigation.navigate("ChangePassword")
        }}
        >
          <Text>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewMenu}
        onPress={() => {
          BackHandler.exitApp();
        }}
        >
          <Text>Thoát</Text>
        </TouchableOpacity>
       
       
      </View>


    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  contener: {
    flex: 0,
  },

  viewMenu:{
    width:"100%",
    justifyContent:"flex-start",
    borderWidth:0.4,
    borderRadius:10,
    padding:10,
  }

});