import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Wall = () => {
  return (
    <SafeAreaView>
      {/* <Icon name='thunderbolt' type='antdesign' /> */}
      <Text className='text-center font-bold mt-20 text-3xl'>Welcome Back</Text>
    <Text className='text-center mt-5'>Sign into your account</Text>
    </SafeAreaView>
  )
}

export default Wall