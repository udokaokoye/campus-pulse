import { AppText } from '@/components/AppText'
import { Icon } from '@/components/Icon'
import { ACCENT_COLOR } from '@/utils/constants'
import { Event } from '@/utils/types'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'

const SpecificEvent = () => {
    const [parsedEventData, setparsedEventData] = useState(null)
    const { eventData } = useLocalSearchParams();

    // Parse with error handling
    const event: Event | null = useMemo(() => {
        try {
            return eventData ? JSON.parse(eventData as string) : null;
        } catch (error) {
            console.error('Failed to parse event data:', error);
            return null;
        }
    }, [eventData]);

    const prettyDate = (iso: string) =>
        moment.parseZone(iso).local().calendar(null, {
            sameDay: "[today] h:mma",
            nextDay: "[tomorrow] h:mma",
            lastDay: "[yesterday] h:mma",
            nextWeek: "dddd h:mma",
            lastWeek: "dddd h:mma",
            sameElse: "Do MMMM h:mma" // e.g., 30th August 3:00pm
        });

    if (!event) {
        return (
            <View>
                <AppText>Event not found</AppText>
            </View>
        );
    }
    return (
        <SafeAreaView className='bg-white'>
            <StatusBar style="dark" backgroundColor="#fff" />

                <View className=' bg-white flex-row items-center px-4 py-3'>
                    <TouchableOpacity
                        onPress={() => router.back?.()}
                        className="w-10 h-10 items-center justify-center"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Icon name="chevron-back" type="ionicon" />
                    </TouchableOpacity>

                    <AppText weight='bold' className="flex-1 text-center font-bold text-2xl">Event Details</AppText>

                    <TouchableOpacity
                        // onPress={() => router.back?.()}
                        className="w-10 h-10 items-center justify-center"
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                        <Icon name="dots-three-vertical" type="entypo" />
                    </TouchableOpacity>
                </View>
            <ScrollView>
                

                <View className='bg-white pb-5'>

                    <View className='flex-row gap-x-3 px-5 mt-5'>
                        {/* @ts-ignore */}
                        <View className=' rounded-3xl items-center justify-center' style={{ width: 70, height: 70, backgroundColor: event.theme?.light }}>
                            {/* @ts-ignore */}
                            <Icon name={event.iconName || ""} type={event.iconType} color={event.theme?.dark} />
                        </View>

                        <View className='flex-1'>
                            <AppText weight='bold' className=' flex-shrink flex-wrap text-2xl font-bold capitalize mb-3' numberOfLines={2} ellipsizeMode='tail'>{event.name}</AppText>

                            <View className='flex-col gap-x-3 flex-wrap gap-y-3'>
                                <View className='flex-row items-center gap-x-2'><Icon size={15} name='clock' type='entypo' /><AppText className='text-sm'>{prettyDate(event.startsOn)}</AppText></View>
                                <View className='flex-row items-center gap-x-2'><Icon size={15} name='location' type='entypo' /><AppText className='text-sm capitalize'>{event.location}</AppText></View>
                            </View>

                            <View className='flex-row gap-x-2 gap-y-3 flex-wrap mt-3'>
                                {/* {category.length > 0 && category.map((cat) => (
                                                <Text style={{ backgroundColor: theme.light, color: theme.dark }} className=' self-start rounded-2xl px-4 py-2 font-bold capitalize'>{cat}</Text>
                                            ))} */}
                            </View>
                        </View>
                    </View>

                    {event.imagePath &&
                        <View style={{ width: '95%' }} className=' self-center rounded-xl overflow-hidden mt-5'>
                            <Image
                                source={{ uri: `https://getinvolved.uc.edu/image/${event.imagePath}` }}
                                style={{ width: "100%", height: 200, borderRadius: 12, backgroundColor: "#f3f4f6" }}
                                contentFit="cover"
                                contentPosition="center"
                                transition={200}
                                placeholder={null}
                                cachePolicy="disk"

                            />
                        </View>}
                </View>

                <View className='px-5 mt-3 bg-white py-5'>
                    <AppText weight='bold' className='font-bold text-2xl  mb-3'>About This Event</AppText>
                    <RenderHTML source={{ html: event.description }} />
                </View>

                <View className='px-5 pb-5 mt-3 bg-white'>
                    <AppText weight='bold' className='font-bold text-2xl mt-12 mb-3'>Event Details</AppText>
                    <View className='flex-row justify-between mb-5'>
                        <View className='flex-row items-center gap-x-2'>
                            <Icon color={ACCENT_COLOR} size={18} name='calendar' type='entypo' />
                            <AppText>Date</AppText>
                        </View>
                        <AppText className='capitalize'>{prettyDate(event.startsOn)}</AppText>
                    </View>

                    <View className='flex-row justify-between mb-5'>
                        <View className='flex-row items-center gap-x-2'>
                            <Icon color={ACCENT_COLOR} size={18} name='clock' type='entypo' />
                            <AppText>Time</AppText>
                        </View>
                        <AppText className='capitalize'>{prettyDate(event.startsOn)}</AppText>
                    </View>

                    <View className='flex-row justify-between mb-5'>
                        <View className='flex-row items-center gap-x-2'>
                            <Icon color={ACCENT_COLOR} size={18} name='group' type='font-awesome' />
                            <AppText>Capacity</AppText>
                        </View>
                        <AppText className='capitalize'>300 people</AppText>
                    </View>

                    <View className='flex-row justify-between mb-5'>
                        <View className='flex-row items-center gap-x-2'>
                            <Icon color={ACCENT_COLOR} size={18} name='ticket' type='entypo' />
                            <AppText>Price</AppText>
                        </View>
                        <AppText className='capitalize'>Free</AppText>
                    </View>

                </View>

                <View className='mt-3 px-5 py-5 pb-10 bg-white'>
                    <AppText weight='bold' className='font-bold text-2xl'>Organized By</AppText>

                    <TouchableOpacity 
                    onPress={() => {
                        router.push({
                            pathname: '/organization',
                            params: {
                                orgData: JSON.stringify({
                                    orgName: event.organizationName,
                                    orgProfile: event.organizationProfilePicture
                                })
                            }
                        })
                    }} 
                    className='flex-row items-center gap-x-3 mt-3'>
                        <View className='rounded-full overflow-hidden'>
                            <Image transition={200} source={{ uri: `https://getinvolved.uc.edu/image/${event.organizationProfilePicture}` }} style={{ width: 50, height: 50 }} />

                        </View>
                        <View style={{ width: '60%' }}>
                            <AppText className='font-bold text-xl flex-shrink flex-wrap' numberOfLines={2} ellipsizeMode='tail'>{event.organizationName}</AppText>
                            <AppText>Campus Organization</AppText>
                        </View>

                        <TouchableOpacity style={{ backgroundColor: "#F3F4F6" }} className='px-6 py-2 rounded-3xl'>
                            <AppText className='font-bold'>Follow</AppText>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                {/* <View className='mt-3 px-5 py-10 bg-white'>
                    <Text className='font-bold text-2xl'>RSVPs</Text>

                    <View className='flex-row items-center gap-x-3 mt-3'>
                        <Icon color={ACCENT_COLOR} name='location-pin' type='entypo' />
                        <Text>{event.location}</Text>
                    </View>

                    <TouchableOpacity style={{backgroundColor: '#F3F4F6'}} className='flex-row items-center mt-8 px-5 py-5 rounded-3xl justify-center'>
                        <Icon color={'#384151'} name='directions-fork' type='material-community' />
                        <Text className='font-bold text-xl' style={{color: '#384151'}}>Get Directions</Text>
                    </TouchableOpacity>
                </View> */}

                <View className='mt-3 px-5 py-10 bg-white'>
                    <AppText weight='bold' className='font-bold text-2xl'>Location</AppText>

                    <View className='flex-row items-center gap-x-3 mt-3'>
                        <Icon color={ACCENT_COLOR} name='location-pin' type='entypo' />
                        <AppText>{event.location}</AppText>
                    </View>

                    <TouchableOpacity style={{ backgroundColor: '#F3F4F6' }} className='flex-row items-center mt-8 px-5 py-5 rounded-3xl justify-center'>
                        <Icon color={'#384151'} name='directions-fork' type='material-community' />
                        <AppText weight='bold' className='font-bold text-xl' style={{ color: '#384151' }}>Get Directions</AppText>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={{ width: '90%', backgroundColor: ACCENT_COLOR }} className=' self-center rounded-3xl py-5'>
                    <AppText weight='bold' className='text-white text-center text-2xl font-bold'>RSVP Event</AppText>
                </TouchableOpacity>

                <View className='flex-row justify-between mx-5 mt-5'>
                    <TouchableOpacity style={{ width: '40%', backgroundColor: '#F3F4F6' }} className='rounded-3xl py-4 flex-row justify-center items-center gap-x-2'>
                        <Icon color={'#384151'} name='heart' type='foundation' />
                        <AppText weight='bold' style={{ color: "#384151" }} className=' text-center text-2xl font-bold'>Save</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: '40%', backgroundColor: '#F3F4F6' }} className='rounded-3xl py-4 flex-row justify-center items-center gap-x-2'>
                        <Icon color={'#384151'} name='share' type='material-community' />
                        <AppText weight='bold' style={{ color: "#384151" }} className=' text-center text-2xl font-bold'>Share</AppText>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SpecificEvent