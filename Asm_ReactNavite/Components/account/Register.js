import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Register = (props) => {

  const [name, setname] = useState('');
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');
  const [phone, setphone] = useState('');
  const [listAcc, setlistAcc] = useState([]);
  const [img_source, setimg_source] = useState(null)
  const [img_base64, setiimg_base64] = useState(null)



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


  const addAccount = () => {
    let url_api_account = "http://192.168.1.18:3000/account";

    if (name.length <= 0 || username.length <= 0 || password.length <= 0 || password2.length <= 0 || phone.length <= 0 || img_base64 == null) {
      Alert.alert("Thông báo", "Không được để chống")
      return;
    }

    if (password2 != password) {
      Alert.alert("Thông báo", "Mật khẩu không khớp")
      return;
    }

    let check = false;
    let user = null;

    for (let i = 0; i < listAcc.length; i++) {
      if (listAcc[i].username == username) {
        user = listAcc[i];
        check = true;
      }
    }

    if (check) {
      Alert.alert("Thông báo", "Tài khoản đã tồn tại");
      return;
    }

    let account = { "username": username, "password": password, "phonenumber": phone, "post": [], "img": img_base64, "name": name }
    fetch(url_api_account, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(account)
    })
    .then((res) => {
      if(res.status == 201){
        Alert.alert("Thông báo", "Đăng ký thành công");
      }
    })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.texthello}>Đăng ký thành viên 👋</Text>
      <Text>Ảnh</Text>
      <TouchableOpacity 
        onPress={pickImage}
      >
        <Image
          style={{
            width: 80, height: 80, borderWidth: 1, backgroundColor: "white",
            borderColor: "black"
          }}
          source={{uri:img_base64}}
        />
      </TouchableOpacity>
      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Họ và tên</Text>
        <TextInput
          value={name}
          style={styles.textInput} placeholder="Nhập tên"
          onChangeText={(value) => {setname(value)}}
           />
      </View>

      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Tài khoản</Text>
        <TextInput
         value={username}
          style={styles.textInput} placeholder="Nhập tài khoản"
          onChangeText={(value) => {setusername(value)}}
           />
      </View>
      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Mật khẩu</Text>
        <TextInput
         value={password}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu"
          onChangeText={(value) => {setpassword(value)}}
        />
        <TouchableOpacity
          style={{ position: "absolute", left: "90%", top: "70%" }}
        >
          <Image />
        </TouchableOpacity>
      </View>
      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Nhập lại mật khẩu</Text>
        <TextInput
          value={password2}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập lại mật khẩu"
          onChangeText={(value) => {setpassword2(value)}}
        />
        <TouchableOpacity
          style={{ position: "absolute", left: "90%", top: "70%" }}
        >
          <Image />
        </TouchableOpacity>
      </View>

      <View style={styles.inputcontainer}>
        <Text style={{ marginLeft: 5 }}>Số điện thoại</Text>
        <TextInput
          value={phone}
          onChangeText={(value) => {setphone(value)}}
          style={styles.textInput}
          secureTextEntry={true}
          placeholder="Nhập số điện thoại"
        />
      </View>

      <TouchableOpacity
        style={{
          width: "80%",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          marginVertical: 10,
        }}
        onPress={addAccount}

      >
        <Text style={styles.button}>Đăng ký</Text>
      </TouchableOpacity>
      <Text onPress={() => { props.navigation.navigate("Login") }}>Đã có tài khoản ? Đăng nhập</Text>
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
    paddingVertical: 20,
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

export default Register