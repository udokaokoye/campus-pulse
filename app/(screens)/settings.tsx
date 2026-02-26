import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { ThemeContext } from '@/Store/ThemeContext'

const Settings = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <View className='flex-1 bg-white dark:bg-gray-900 items-center justify-center'>
      <Text className='dark:text-white'>Settings</Text>
    </View>
  )
}

export default Settings
