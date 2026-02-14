import { ACCENT_COLOR } from '@/utils/constants'
import { ThemeContext } from '@/Store/ThemeContext'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const index = () => {
    const { isDark } = useContext(ThemeContext);
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <SafeAreaView className='bg-white dark:bg-gray-900 flex-1 px-8'>
                <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={isDark ? '#111827' : '#fff'} />
                <TouchableOpacity className='self-end' onPress={() => { }}>
                    <Text style={{ color: ACCENT_COLOR, fontWeight: 800 }} className='text-lg font-bold'>Sign in</Text>
                </TouchableOpacity>

                <View className='' style={{marginTop: 150}}>
                    <Image
                        style={{ width: "100%", height: 380, opacity: 1 }}
                        source={'https://static.vecteezy.com/system/resources/thumbnails/025/221/331/small/cartoon-student-cute-school-ai-generate-png.png'}
                        placeholder={{ blurhash }}
                        contentFit="contain"
                        transition={1000}
                    />
                </View>

                <View style={{marginTop: 10}}>
                    <Text className='dark:text-white' style={{fontSize: 30}}>Sign up to see events and opininons from your college.</Text>
                    <Text className='font-bold mt-2' style={{color: ACCENT_COLOR}}>*available for select colleges</Text>
                </View>

                <View className='' style={{marginTop: 'auto'}}>

                    <TouchableOpacity onPress={() => router.navigate('/(screens)/(auth)/signup')} className=' items-center justify-center' style={{marginTop: 'auto', height: 80, borderRadius: 50, backgroundColor: ACCENT_COLOR}}>
                        <Text className='text-white font-bold text-xl'>Create an account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='mt-8 mb-3'>
                        <Text className='text-center text-sm dark:text-gray-400'>already have an account?</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>

    )
}

export default index