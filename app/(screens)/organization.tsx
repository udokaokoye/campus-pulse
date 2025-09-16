
//import { Text, View } from 'react-native'
import { AppText } from '@/components/AppText'
import { Icon } from '@/components/Icon'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Organization = () => {

    const { orgData } = useLocalSearchParams()


    const orgDataParsed: any = useMemo(() => {
        try {
            return orgData ? JSON.parse(orgData as string) : null;
        } catch (error) {
            console.error('Failed to parse event data:', error);
            return null;
        }
    }, [orgData]);
    return (
        <SafeAreaView className="bg-white flex-1">
            <ScrollView>
                <StatusBar style="dark" backgroundColor="#fff" />

                <View className=' bg-white flex-row items-center px-4 py-3'>
                    <TouchableOpacity
                        onPress={() => router.back?.()}
                        className="w-10 h-10 items-center justify-center"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Icon name="chevron-back" type="ionicon" />
                    </TouchableOpacity>

                    <AppText weight='bold' className="flex-1 text-center font-bold text-2xl">Organization</AppText>

                    <TouchableOpacity
                        // onPress={() => router.back?.()}
                        className="w-10 h-10 items-center justify-center"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Icon name="dots-three-vertical" type="entypo" />
                    </TouchableOpacity>
                </View>
                <View className='h-px bg-gray-200' />

                {/* Poster / Banner */}
                <View className="w-full bg-gray-200" style={{ height: 220 }}>
                    <Image
                        source={{ uri: "https://s3.amazonaws.com/files.galaxydigital.com/4722/images/banner-small.jpg?updated=1755277539" }}
                        className="w-full h-full"
                        style={{width: '100%', height: 220}}
                        
                    />
                </View>

                {/* Avatar overlapping */}
                <View style={{width: 80, height: 80}} className="-mt-12 mx-5  z-10 rounded-full overflow-hidden bg-gray-400">
                   
                    <Image transition={200} source={{ uri: `https://getinvolved.uc.edu/image/${orgDataParsed.orgProfile}` }} style={{ width: 80, height: 80 }} />

                </View>

                {/* Follow button on the right */}
                <View className="px-4 mt-1 flex-row justify-end">
                    <TouchableOpacity
                        className="ml-auto bg-red-500 px-6 py-2 rounded-full"
                    >
                        <AppText weight="bold" className="font-bold text-white">Follow</AppText>
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View className="px-4 mt-4">
                    <AppText weight="bold" className="text-xl">{orgDataParsed.orgName}</AppText>
                    <AppText className="text-gray-500">Industry • Location</AppText>
                </View>

                {/* ===== Stats row: Followers • Events • Members ===== */}
                <View className="px-4 mt-4">
                    <View className="flex-row justify-between">
                        <View className="items-center flex-1">
                            <AppText weight="bold" className="text-2xl">1.2k</AppText>
                            <AppText className="text-gray-500">Followers</AppText>
                        </View>
                        <View className="w-px bg-gray-200 mx-3" />
                        <View className="items-center flex-1">
                            <AppText weight="bold" className="text-2xl">42</AppText>
                            <AppText className="text-gray-500">Events</AppText>
                        </View>
                        <View className="w-px bg-gray-200 mx-3" />
                        <View className="items-center flex-1">
                            <AppText weight="bold" className="text-2xl">15</AppText>
                            <AppText className="text-gray-500">Members</AppText>
                        </View>
                    </View>
                </View>

                {/* ===== Followers Section ===== */}
                <View className="px-4 mt-6">
                    <View className="flex-row justify-between items-center mb-2">
                        <AppText weight="bold" className="text-lg">Followers</AppText>
                        <TouchableOpacity onPress={() => router.navigate('/organization/followers')}>
                            <AppText className="text-black-600">See all</AppText>
                        </TouchableOpacity>
                    </View>

                    {/* Avatars preview */}
                    <View className="flex-row">
                        {[1, 2, 3].map((i) => (
                            <View key={i} className="-ml-3 first:ml-0">
                                <Image
                                    source={{ uri: `https://randomuser.me/api/portraits/men/${30 + i}.jpg` }}
                                    className="w-10 h-10 rounded-full border-2 border-white"
                                />
                            </View>
                        ))}
                    </View>

                </View>

                {/* ===== Events Section ===== */}
                <View className="px-4 mt-6">
                    <View className="flex-row justify-between items-center mb-2">
                        <AppText weight="bold" className="text-lg">Upcoming Events</AppText>
                        <TouchableOpacity onPress={() => router.navigate('/organization/events')}>
                            <AppText className="text-black-600">See all</AppText>
                        </TouchableOpacity>
                    </View>

                    {/* Simple event cards */}
                    {[
                        { id: 'e1', title: 'Tech Talk: Building Fast Apps', date: 'Sep 28, 6:00 PM', location: 'Main Hall A' },
                        { id: 'e2', title: 'Networking Night', date: 'Oct 3, 7:30 PM', location: 'Student Center' },
                    ].map((ev) => (
                        <TouchableOpacity
                            key={ev.id}
                            className="bg-white border border-gray-200 rounded-2xl p-4 mb-3"
                            onPress={() => router.navigate(`/event/${ev.id}`)}
                            activeOpacity={0.8}
                        >
                            <AppText weight="bold" className="text-base">{ev.title}</AppText>
                            <AppText className="text-gray-500 mt-1">{ev.date} • {ev.location}</AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ===== About Section ===== */}
                <View className="px-4 mt-6 mb-10">
                    <AppText weight="bold" className="text-lg mb-2">About us</AppText>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Organization