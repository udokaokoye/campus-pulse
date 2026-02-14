import { Icon } from '@/components/Icon'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
const Signup = () => {
  return (
    <SafeAreaView className='bg-white flex-1 px-8'>
      <StatusBar style="dark" backgroundColor="#fff" />
      <ScrollView>

        <TouchableOpacity className='self-start' onPress={() => { router.back()}}>
          <Icon type={'ionicon'} name='chevron-back' />
        </TouchableOpacity>

        <Text className='mt-5 text-3xl'>Create your account</Text>
        
      </ScrollView>

    </SafeAreaView>

  )
}

export default Signup