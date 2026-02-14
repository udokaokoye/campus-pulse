import { ACCENT_COLOR, GRAY_BG } from '@/utils/constants'
import { Icon } from '@/components/Icon'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState, useRef } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const TOTAL_STEPS = 4
const GRAD_LEVELS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate']

export default function Signup() {
  const [step, setStep] = useState(1)

  // Stage 1
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  // Stage 2
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const otpRefs = useRef<(TextInput | null)[]>([])

  // Stage 3
  const [major, setMajor] = useState('')
  const [gradYear, setGradYear] = useState('')
  const [gradLevel, setGradLevel] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  // Stage 4
  const [avatarUri, setAvatarUri] = useState<string | null>(null)
  const [url, setUrl] = useState('')
  const [bio, setBio] = useState('')
  const [agreedTerms, setAgreedTerms] = useState(false)

  const handleBack = () => {
    if (step === 1) {
      router.back()
    } else {
      setStep(step - 1)
    }
  }

  const validateStep1 = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all fields.')
      return false
    }
    if (!email.trim().toLowerCase().endsWith('@mail.uc.edu')) {
      Alert.alert('Invalid Email', 'Please use your @mail.uc.edu email address.')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (otp.some((d) => d === '')) {
      Alert.alert('Incomplete Code', 'Please enter the full 5-digit code.')
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (!major.trim() || !gradYear.trim() || !gradLevel) {
      Alert.alert('Missing Fields', 'Please fill in all fields.')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    if (step === 3 && !validateStep3()) return
    setStep(step + 1)
  }

  const handleCreate = () => {
    if (!agreedTerms) {
      Alert.alert('Terms Required', 'Please agree to the Terms & Privacy Policy.')
      return
    }
    Alert.alert('Account Created!', 'Welcome to Campus Pulse 🎉')
  }

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) text = text[text.length - 1]
    const next = [...otp]
    next[index] = text
    setOtp(next)
    if (text && index < 4) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKey = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const pickAvatar = () => {
    Alert.alert('Pick Avatar', 'expo-image-picker is not installed. This is a placeholder.')
  }

  // ─── Shared input style ───
  const inputStyle = {
    backgroundColor: GRAY_BG,
    borderRadius: 16,
    paddingHorizontal: 20,
    height: 56,
    fontSize: 16,
  }

  // ─── Progress Bar ───
  const ProgressBar = () => (
    <View className="flex-row items-center mt-2 mb-6" style={{ gap: 8 }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <View
          key={i}
          className="flex-1"
          style={{
            height: 5,
            borderRadius: 3,
            backgroundColor: i < step ? ACCENT_COLOR : '#E5E7EB',
          }}
        />
      ))}
    </View>
  )

  // ─── Stage 1 ───
  const Stage1 = () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700' }}>Personal Info</Text>
      <Text className="text-gray-500 mb-2">Let's get to know you</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={inputStyle}
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={inputStyle}
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        placeholder="Email (@mail.uc.edu)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={inputStyle}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  )

  // ─── Stage 2 ───
  const Stage2 = () => (
    <View style={{ gap: 16 }} className="items-center">
      <Icon type="material-community" name="email-check-outline" size={64} color={ACCENT_COLOR} />
      <Text style={{ fontSize: 28, fontWeight: '700', textAlign: 'center' }}>Verify Email</Text>
      <Text className="text-gray-500 text-center" style={{ fontSize: 15 }}>
        We sent a 5-digit code to{'\n'}
        <Text style={{ fontWeight: '600', color: '#111' }}>{email}</Text>
      </Text>
      <View className="flex-row justify-center mt-4" style={{ gap: 12 }}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={(r) => { otpRefs.current[i] = r }}
            value={digit}
            onChangeText={(t) => handleOtpChange(t, i)}
            onKeyPress={({ nativeEvent }) => handleOtpKey(nativeEvent.key, i)}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              width: 52,
              height: 60,
              backgroundColor: GRAY_BG,
              borderRadius: 14,
              fontSize: 24,
              fontWeight: '700',
              textAlign: 'center',
            }}
          />
        ))}
      </View>
    </View>
  )

  // ─── Stage 3 ───
  const Stage3 = () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700' }}>Academic Info</Text>
      <Text className="text-gray-500 mb-2">Tell us about your studies</Text>
      <TextInput
        placeholder="College Major"
        value={major}
        onChangeText={setMajor}
        style={inputStyle}
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        placeholder="Graduation Year (e.g. 2027)"
        value={gradYear}
        onChangeText={setGradYear}
        keyboardType="number-pad"
        style={inputStyle}
        placeholderTextColor="#9CA3AF"
      />
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{
          ...inputStyle,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 16, color: gradLevel ? '#111' : '#9CA3AF' }}>
          {gradLevel || 'Grad Level'}
        </Text>
        <Icon type="ionicon" name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>

      {/* Picker Modal */}
      <Modal visible={showPicker} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowPicker(false)}
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
        >
          <View
            style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingBottom: 40 }}
          >
            <View className="items-center py-4">
              <View style={{ width: 40, height: 5, borderRadius: 3, backgroundColor: '#D1D5DB' }} />
            </View>
            {GRAD_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => {
                  setGradLevel(level)
                  setShowPicker(false)
                }}
                className="px-8 py-4"
                style={{
                  backgroundColor: gradLevel === level ? GRAY_BG : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: gradLevel === level ? '600' : '400',
                    color: gradLevel === level ? ACCENT_COLOR : '#111',
                  }}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )

  // ─── Stage 4 ───
  const Stage4 = () => (
    <View style={{ gap: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: '700' }}>Profile Setup</Text>
      <Text className="text-gray-500 mb-1">Almost there! Personalize your profile</Text>

      {/* Avatar */}
      <TouchableOpacity onPress={pickAvatar} className="self-center items-center" style={{ gap: 8 }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: GRAY_BG,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {avatarUri ? (
            <Icon type="ionicon" name="checkmark-circle" size={48} color={ACCENT_COLOR} />
          ) : (
            <Icon type="ionicon" name="person" size={48} color="#9CA3AF" />
          )}
        </View>
        <Text style={{ color: ACCENT_COLOR, fontWeight: '600', fontSize: 14 }}>Choose Photo</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Website URL (optional)"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
        style={inputStyle}
        placeholderTextColor="#9CA3AF"
      />
      <TextInput
        placeholder="Bio (optional)"
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
        style={{
          ...inputStyle,
          height: 110,
          paddingTop: 16,
          textAlignVertical: 'top',
        }}
        placeholderTextColor="#9CA3AF"
      />

      {/* Terms checkbox */}
      <TouchableOpacity
        onPress={() => setAgreedTerms(!agreedTerms)}
        className="flex-row items-center"
        style={{ gap: 12 }}
      >
        <View
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: agreedTerms ? ACCENT_COLOR : '#D1D5DB',
            backgroundColor: agreedTerms ? ACCENT_COLOR : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {agreedTerms && <Icon type="ionicon" name="checkmark" size={16} color="#fff" />}
        </View>
        <Text style={{ flex: 1, fontSize: 14, color: '#6B7280' }}>
          I agree to the <Text style={{ color: ACCENT_COLOR, fontWeight: '600' }}>Terms of Service</Text> and{' '}
          <Text style={{ color: ACCENT_COLOR, fontWeight: '600' }}>Privacy Policy</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )

  const buttonLabel = step === 2 ? 'Verify' : step === 4 ? 'Create Account' : 'Next'

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar style="dark" backgroundColor="#fff" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-8"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <TouchableOpacity onPress={handleBack} className="flex-row items-center mt-1" style={{ gap: 4 }}>
            <Icon type="ionicon" name="chevron-back" size={24} color="#111" />
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Back</Text>
          </TouchableOpacity>

          <ProgressBar />

          {/* Stage content */}
          {step === 1 && <Stage1 />}
          {step === 2 && <Stage2 />}
          {step === 3 && <Stage3 />}
          {step === 4 && <Stage4 />}

          {/* Button */}
          <View style={{ marginTop: 'auto', paddingTop: 24 }}>
            <TouchableOpacity
              onPress={step === 4 ? handleCreate : handleNext}
              className="items-center justify-center"
              style={{
                height: 80,
                borderRadius: 50,
                backgroundColor: ACCENT_COLOR,
              }}
            >
              <Text className="text-white font-bold text-xl">{buttonLabel}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
