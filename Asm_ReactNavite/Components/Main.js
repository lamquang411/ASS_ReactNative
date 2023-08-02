import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './main/Home';
import Music from './main/Music';
import Post from './main/Post';
import Profile from './main/Profile';
import PostFl from './main/profile/PostFl';
import Admin from './main/profile/Admin';
import EditPost from './main/profile/EditPost';
import ChangePassword from './main/profile/ChangePassword';


const Tab = createBottomTabNavigator();
const HomeNavigation = createNativeStackNavigator();
const ProfileNavigation = createNativeStackNavigator();
const MusicNavigation = createNativeStackNavigator();
const  HomePost = (props) => {
    const user = props.route.params.user;
    return (
        <HomeNavigation.Navigator initialRouteName='Home'>
            <HomeNavigation.Screen
                name="Home" component={Home} options={{title:"Trang chủ"}}/>
            <HomeNavigation.Screen
                name="Post" component={Post} initialParams={{user:user}} options={{title:"Chi tiết bài viết"}}/>
        </HomeNavigation.Navigator>
    )
}

const  ProfileNAV = (props) => {
    const user = props.route.params.user;
    return (
        <ProfileNavigation.Navigator initialRouteName='Profile' screenOptions={{
            headerShown: true
          }}>
            <ProfileNavigation.Screen
                name="Profile" component={Profile} initialParams={{user:user}} options={{title:"Thông tin cá nhân"}}/>
            <ProfileNavigation.Screen
                name="PostFL" component={PostFl} initialParams={{user:user}} options={{title:"Tin tức đã lưu"}}/>
            <ProfileNavigation.Screen
               name="Post" component={Post} initialParams={{user:user}} options={{title:"Chi tiết bài viết"}}/>
            <ProfileNavigation.Screen
               name="Admin" component={Admin} initialParams={{user:user}} options={{title:"Quản lý"}}/>
            <ProfileNavigation.Screen
               name="EditPost" component={EditPost} options={{title:"Sửa bài viết"}}/>
            <ProfileNavigation.Screen
               name="ChangePassword" component={ChangePassword} initialParams={{user:user}} options={{title:"Đổi mật khẩu"}}/>
        </ProfileNavigation.Navigator>
    )
}

const  MusicVideo = (props) => {
    return (
        <MusicNavigation.Navigator initialRouteName='Music'>
            <MusicNavigation.Screen
                name="Music" component={Music} options={{title:"Bộ sưu tầm"}}/>
            {/* <MusicNavigation.Screen
                name="VideoMp4" component={VideoMp4} options={{title:"Video"}}/> */}
        </MusicNavigation.Navigator>
    )
}

const Main = (props) => {
    const user = props.route.params.user;
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator initialRouteName='HomePost' screenOptions={{
                headerShown: false,
            }}
            >
                <Tab.Screen name="HomePost" initialParams={{user:user}} component={HomePost} options={{ tabBarIcon: () => <Text>🏡</Text> }} />
                <Tab.Screen name="ProfileNAV" initialParams={{user:user}} component={ProfileNAV} options={{ tabBarIcon: () => <Text>🙋‍♂️</Text>,title:"Profile" }}  />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});