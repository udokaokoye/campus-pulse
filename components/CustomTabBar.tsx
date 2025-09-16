import { Icon } from '@/components/Icon';
import { ACCENT_COLOR } from '@/utils/constants';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
const CustomTabBar = ({ state, descriptors, navigation }: BottomTabNavigationProp) => {
    const [activeTab, setactiveTab] = useState(1)
    return (
        <SafeAreaView
        // edges={["top"]}
        >

        <View style={{
            width: "100%",
            height: 80,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 5,
            // marginHorizontal: 16,
            // marginBottom: 8,
            borderRadius: 10,
            padding: 8,
            flexDirection: "row",
            backgroundColor: "#fafafa",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 6,

            // Android shadow
            elevation: 6,
        }} className=' justify-evenly'>


            <CustomBarItem name='home' iconName='home' iconType='entypo' active={activeTab ==1} onPress={() => {
                setactiveTab(1)
                navigation.navigate('index')
            }} navigation={navigation} />
            <CustomBarItem name='wall' iconName='clipboard-text-multiple-outline' iconType='material-community' active={activeTab==2} onPress={() => {
                setactiveTab(2)
                navigation.navigate('wall')
            }} navigation={navigation} />
            <CustomBarItem name='messages' iconName='hipchat' iconType='fontisto' active={activeTab==3} onPress={() => setactiveTab(3)} navigation={navigation} />
            <CustomBarItem name='profile' iconName='user' iconType='entypo' active={activeTab==4} onPress={() => {
                setactiveTab(4)
                navigation.navigate('profile')
            }} navigation={navigation} />
        </View>
         </SafeAreaView>
    )
}

export default CustomTabBar


type CustomBarItemProps = {
    name: string;
    iconName: string;
    iconType: string;
    active: boolean;
    onPress: any
    navigation: any
};

export const CustomBarItem: React.FC<CustomBarItemProps> = ({ name, iconName, iconType, active, onPress, navigation }) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex-col items-center justify-center gap-y-2'>
            <Icon
                name={iconName}
                type={iconType}
                size={25}
                color={active ? ACCENT_COLOR : "#9DA3AF"}
            />
            <Text style={{fontWeight: active ? "bold" : "regular", color: active ? ACCENT_COLOR : '#9DA3AF'}} className="capitalize text-s">{name}</Text>
        </TouchableOpacity>
    );
}