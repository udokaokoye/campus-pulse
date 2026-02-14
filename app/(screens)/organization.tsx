
//import { Text, View } from 'react-native'
import { AppText } from '@/components/AppText'
import { Icon } from '@/components/Icon'

import { prettyDate } from '@/utils/helpers'
import { Event } from '@/utils/types'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import moment from 'moment'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/Store/ThemeContext'


import { ScrollView, TouchableOpacity, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'

const Organization = () => {
    const { isDark } = useContext(ThemeContext);
    const [orgEvents, setorgEvents] = useState<null | Event[]>(null)
    const [orgCategories, setorgCategories] = useState([]);
    const [orgAbout, setorgAbout] = useState("")
    const { orgData } = useLocalSearchParams()
    const emptySVG = require('../../assets/images/empty.png')


    const orgDataParsed: any = useMemo(() => {
        try {
            return orgData ? JSON.parse(orgData as string) : null;
        } catch (error) {
            console.error('Failed to parse event data:', error);
            return null;
        }
    }, [orgData]);

    useEffect(() => {
        // fetchOrgEvents()
        // fetchOrgCategoriesAndAbout()
    }, [orgDataParsed])


    const fetchOrgEvents = async () => {
        const res = await fetch(`https://campuslink.uc.edu/api/discovery/event/search?take=4&endsAfter=${moment().format("YYYY-MM-DDTHH:mm:ssZ")}&orderByField=endsOn&orderByDirection=ascending&status=Approved&organizationIds%5B0%5D=${orgDataParsed.orgId}`)
        const data = await res.json();
        setorgEvents(data.value);

    }

    const fetchOrgCategoriesAndAbout = async () => {
        const res = await fetch(`https://campuslink.uc.edu/api/discovery/search/organizations?top=1&filter=&query=${orgDataParsed.orgName}&skip=0`)
        const data = await res.json();
        setorgCategories(data.value[0].CategoryNames)
        setorgAbout(data.value[0].Description)


    }

    const fetchOrgMettingInfo = async () => {
        const res = await fetch(`https://campuslink.uc.edu/api/discovery/organization/${orgDataParsed.orgId}/additionalFields?`)
        const data = await res.json()

        console.log(data);

    }
    return (
        <SafeAreaView className="bg-white dark:bg-gray-900 flex-1">
            <ScrollView>
                <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={isDark ? '#111827' : '#fff'} />

                <View className=' bg-white dark:bg-gray-900 flex-row items-center px-4 py-3'>
                    <TouchableOpacity
                        onPress={() => router.back?.()}
                        className="w-10 h-10 items-center justify-center"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Icon name="chevron-back" type="ionicon" color={isDark ? '#fff' : undefined} />
                    </TouchableOpacity>

                    <AppText weight='bold' className="flex-1 text-center font-bold text-2xl dark:text-white">Organization</AppText>

                    <TouchableOpacity
                        // onPress={() => router.back?.()}
                        className="w-10 h-10 items-center justify-center"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Icon name="dots-three-vertical" type="entypo" color={isDark ? '#fff' : undefined} />
                    </TouchableOpacity>
                </View>
                <View className='h-px bg-gray-200 dark:bg-gray-700' />

                {/* Poster / Banner */}
                <View className="w-full bg-gray-200" style={{ height: 220 }}>
                    <Image
                        source={{ uri: "https://s3.amazonaws.com/files.galaxydigital.com/4722/images/banner-small.jpg?updated=1755277539" }}
                        className="w-full h-full"
                        style={{ width: '100%', height: 220 }}

                    />
                </View>

                {/* Avatar overlapping */}
                <View style={{ width: 80, height: 80 }} className="-mt-12 mx-5  z-10 rounded-full overflow-hidden bg-gray-400">

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
                    <AppText weight="bold" className="text-xl dark:text-white">{orgDataParsed.orgName}</AppText>
                    <View className='flex-row gap-x-2 flex-wrap'>
                        {orgCategories && orgCategories.map((catName: any, index: number) => (
                            <React.Fragment key={index}>
                                <AppText className='text-sm text-gray-500' key={index}>{catName}</AppText>
                                {index !== orgCategories.length - 1 && (<AppText>•</AppText>)}
                            </React.Fragment>
                        ))}
                    </View>
                </View>

                {/* ===== Stats row: Followers • Events • Members ===== */}
                <View className="px-4 mt-4">
                    <View className="flex-row justify-between">
                        <View className="items-center flex-1">
                            <AppText weight="bold" className="text-2xl dark:text-white">1.2k</AppText>
                            <AppText className="text-gray-500 dark:text-gray-400">Followers</AppText>
                        </View>
                        <View className="w-px bg-gray-200 dark:bg-gray-700 mx-3" />
                        <View className="items-center flex-1">
                            <AppText weight="bold" className="text-2xl dark:text-white">42</AppText>
                            <AppText className="text-gray-500 dark:text-gray-400">Events</AppText>
                        </View>
                        <View className="w-px bg-gray-200 dark:bg-gray-700 mx-3" />
                        <View className="items-center flex-1">
                            <AppText weight="bold" className="text-2xl dark:text-white">15</AppText>
                            <AppText className="text-gray-500 dark:text-gray-400">Members</AppText>
                        </View>
                    </View>
                </View>

                {/* ===== Followers Section ===== */}
                <View className="px-4 mt-6">
                    <View className="flex-row justify-between items-center mb-2">
                        <AppText weight="bold" className="text-lg dark:text-white">Followers</AppText>
                        <TouchableOpacity>
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
                        <AppText weight="bold" className="text-lg dark:text-white">Upcoming Events</AppText>
                        <TouchableOpacity>
                            <AppText className="text-black-600">See all</AppText>
                        </TouchableOpacity>
                    </View>

                    {!orgEvents && (
                        <View className='items-center justify-center'>
                            <AppText>Loading Events...</AppText>
                        </View>
                    )}

                    {orgEvents && orgEvents?.length <= 0 && (
                        <View className=' justify-center items-center my-4'>
                            <Image source={emptySVG} style={{ width: 100, height: 100 }} />
                            <AppText weight='bold' className='text-center capitalize'>this org has no upcoming events</AppText>
                        </View>
                    )}
                    {/* Simple event cards */}
                    {orgEvents && orgEvents.length > 0 && orgEvents.map((ev: Event, index) => (
                        <TouchableOpacity
                            key={index}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 mb-3"

                            activeOpacity={0.8}
                        >
                            <AppText weight="bold" className="text-base dark:text-white">{ev.name}</AppText>
                            <AppText className="text-gray-500 dark:text-gray-400 mt-1">{prettyDate(ev.startsOn)} • {ev.location}</AppText>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ===== About Section ===== */}
                <View className="px-4 mt-6 mb-10">
                    <AppText weight="bold" className="text-lg mb-2 dark:text-white">About us</AppText>

                    <AppText><RenderHTML contentWidth={100} source={{ html: orgAbout }} /></AppText>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Organization