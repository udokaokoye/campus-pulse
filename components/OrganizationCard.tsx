import { ACCENT_COLOR } from '@/utils/constants';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from './AppText';
interface OrgCardProps {
    orgId: number
    orgName: string;
    orgProfilePicture: string;
    orgFollowers: string;
    orgCategories: string[]

}
const OrganizationCard: React.FC<OrgCardProps> = ({ orgId, orgName, orgProfilePicture, orgFollowers, orgCategories }) => {
    return (
        <TouchableOpacity onPress={() => {
            router.push({
                pathname: '/organization',
                params: {
                    orgData: JSON.stringify({
                        orgId: orgId,
                        orgName: orgName,
                        orgProfile: orgProfilePicture,
                        orgCategories: orgCategories

                    })
                }
            })
        }} className='flex-row gap-x-5 items-center'>
            <View className="rounded-full overflow-hidden bg-gray-400 justify-center items-center" style={{ height: 60, width: 60 }}>
                <Image
                    source={{ uri: `https://getinvolved.uc.edu/image/${orgProfilePicture}` }}
                    className="w-full h-full"
                    style={{ width: '100%', height: '100%' }}
                    contentFit='contain'
                    transition={100}
                />
            </View>
            <View className='flex-row items-center justify-between' style={{ width: '76%' }}>
                <View style={{ width: '75%' }}>
                    <AppText weight='bold' className='text-xl'>{orgName}</AppText>
                    <AppText className=''>Campus Organization</AppText>
                    <AppText style={{ opacity: 0.5 }}>{orgFollowers}</AppText>
                </View>

                <TouchableOpacity style={{ backgroundColor: ACCENT_COLOR }} className='px-8 py-2 rounded-3xl'>
                    <AppText weight='bold' className='text-white text-md'>Follow</AppText>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default OrganizationCard