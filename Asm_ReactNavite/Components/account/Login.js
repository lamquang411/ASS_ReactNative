import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Login = (props) => {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [listAcc, setlistAcc] = useState([]);
  const [checked, setchecked] = useState(false);

  const getListAccount = async () => {
    let url_api_account = "http://192.168.1.18:3000/account";
    try {
      const listAccount = await fetch(url_api_account);

      const accountJson = await listAccount.json();

      setlistAcc([...accountJson]);

    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getListAccount();
  }
    , []);


  const loginForm = () => {

    let check = false;
    let user = null;
    
    for (let i = 0; i < listAcc.length; i++) {
      if (listAcc[i].username == username && listAcc[i].password == password) {
        user = listAcc[i];
        check = true;
      }
    }
   

    if (check) {
      alert("Thành công!");
      props.navigation.navigate("Main", { user })
    } else {
      alert("Thất bại");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texthello}>Tin Tức 24/7 👋</Text>

      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Tài khoản</Text>
        <TextInput
          value={username}
          style={styles.textInput}
          placeholder="Nhập tài khoản"
          onChangeText={(value) => { setusername(value) }} />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Mật khẩu</Text>
        <TextInput
          value={password}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu"
          onChangeText={(value) => { setpassword(value) }}
        />
        <TouchableOpacity
          style={{ position: "absolute", left: "90%", top: "70%" }}
        >
          <Image />
        </TouchableOpacity>
      </View>

      <View style={styles.bottominput}>
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            style={{ marginHorizontal: 5 }}
            value={checked}
            onValueChange={() => {
              setchecked(!checked);
            }}
          />
          <Text>Nhớ mật khẩu</Text>
        </View>
        <Text style={{ color: "red", fontWeight: "600" }}>
          Quên mật khẩu?
        </Text>
      </View>

      <TouchableOpacity
        style={{
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          marginVertical: 20,
        }}
        onPress={() => { loginForm() }}
      >
        <Text style={styles.button}>Đăng nhập</Text>
      </TouchableOpacity>
      <Text onPress={() => { props.navigation.navigate("Register") }}>Chưa có tài khoản ? Đăng ký ngay</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    marginTop: 20,
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
});

export default Login