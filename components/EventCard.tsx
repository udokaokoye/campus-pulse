
import { prettyDate } from '@/utils/helpers';

import { Icon } from '@/components/Icon';

import React, { useContext } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { ThemeContext } from '@/Store/ThemeContext';
import RenderHtml from 'react-native-render-html';
import { AppText } from './AppText';
type EventCardProps = {
    name: string;
    iconName: string;
    iconType: string;
    category: Array<string>;
    description: string;
    date: string;
    location: string;
    theme: any
};

const EventCard: React.FC<EventCardProps> = ({ name, iconName, iconType, category, description, date, location, theme }) => {
    const { width } = useWindowDimensions();
    const { isDark } = useContext(ThemeContext);

    
    return (
        <View style={{
            width: '100%',
            minHeight: 200,
            borderRadius: 20,
            backgroundColor: isDark ? '#1F2937' : '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: isDark ? 0.4 : 0.2,
            shadowRadius: 2,
            elevation: 5
        }} className='flex-row gap-x-3 p-5 mb-5'>
            <View className=' rounded-3xl items-center justify-center' style={{ width: 50, height: 50, backgroundColor: theme.light }}>
                <Icon name={iconName} type={iconType} color={theme.dark} />
            </View>

            <View className='flex-1'>
                {/* <View style={{marginRight: 55}} className='flex-row justify-between'> */}
                <AppText weight='medium' className=' flex-shrink flex-wrap text-xl font-bold capitalize mb-3 dark:text-white' numberOfLines={2} ellipsizeMode='tail'>{name}</AppText>
                {/* </View> */}
                <RenderHtml
                    contentWidth={width}
                    source={{ html: description }}
                    defaultTextProps={{ numberOfLines: 4, ellipsizeMode: "tail" }}
                    baseStyle={{ fontSize: 14, lineHeight: 20, color: isDark ? '#9CA3AF' : '#6B7280' }}
                    tagsStyles={{ p: { fontSize: 14, lineHeight: 20, color: isDark ? '#9CA3AF' : '#6B7280', marginTop: 0, marginBottom: 4 } }}
                />
                {/* <Text style={{ marginRight: 55 }} className='text-wrap mt-3'>{description}</Text> */}
                <View className='flex-row gap-x-3 mt-5 flex-wrap gap-y-3'>
                    <View className='flex-row items-center gap-x-2'><Icon size={15} name='clock' type='entypo' color={isDark ? '#9CA3AF' : undefined} /><AppText className='text-sm dark:text-gray-400'>{prettyDate(date)}</AppText></View>
                    <View className='flex-row items-center gap-x-2'><Icon size={15} name='location' type='entypo' color={isDark ? '#9CA3AF' : undefined} /><AppText className='text-sm capitalize dark:text-gray-400'>{location}</AppText></View>
                </View>

                <View className='flex-row gap-x-2 gap-y-3 flex-wrap mt-3'>
                {category.length > 0 && category.map((cat, index) => (
                        <AppText key={index} style={{ backgroundColor: theme.light, color: theme.dark }} className=' self-start rounded-2xl px-4 py-2 font-bold capitalize'>{cat}</AppText>
                    ))}
                    </View>
            </View>
        </View>
    )
}

export default EventCard