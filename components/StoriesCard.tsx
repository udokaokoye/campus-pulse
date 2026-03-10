import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { AppText } from './AppText';
const StoriesCard = () => {
    const dummyStories = [
        {
            "story_id": "17894567283940101",
            "user": {
                "user_id": "1001",
                "username": "Jane Doe",
                "profile_picture_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                "is_verified": false
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:00:00Z",
            "expires_at": "2026-03-05T08:00:00Z"
        },
        {
            "story_id": "17894567283940102",
            "user": {
                "user_id": "1002",
                "username": "Jack Dorsey",
                "profile_picture_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                "is_verified": true
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:05:00Z",
            "expires_at": "2026-03-05T08:05:00Z"
        },
        {
            "story_id": "17894567283940103",
            "user": {
                "user_id": "1003",
                "username": "Emily Johnson",
                "profile_picture_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                "is_verified": false
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1519681393784-d120267933ba",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:10:00Z",
            "expires_at": "2026-03-05T08:10:00Z"
        },
        {
            "story_id": "17894567283940104",
            "user": {
                "user_id": "1004",
                "username": "Michael Brown",
                "profile_picture_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                "is_verified": false
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:15:00Z",
            "expires_at": "2026-03-05T08:15:00Z"
        },
        {
            "story_id": "17894567283940105",
            "user": {
                "user_id": "1005",
                "username": "Sophia Martinez",
                "profile_picture_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
                "is_verified": true
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:20:00Z",
            "expires_at": "2026-03-05T08:20:00Z"
        },
        {
            "story_id": "17894567283940106",
            "user": {
                "user_id": "1006",
                "username": "Daniel Wilson",
                "profile_picture_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
                "is_verified": false
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:25:00Z",
            "expires_at": "2026-03-05T08:25:00Z"
        },
        {
            "story_id": "17894567283940107",
            "user": {
                "user_id": "1007",
                "username": "Olivia Anderson",
                "profile_picture_url": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
                "is_verified": false
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:30:00Z",
            "expires_at": "2026-03-05T08:30:00Z"
        },
        {
            "story_id": "17894567283940108",
            "user": {
                "user_id": "1008",
                "username": "William Taylor",
                "profile_picture_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                "is_verified": false
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:35:00Z",
            "expires_at": "2026-03-05T08:35:00Z"
        },
        {
            "story_id": "17894567283940109",
            "user": {
                "user_id": "1009",
                "username": "Ava Thomas",
                "profile_picture_url": "https://images.unsplash.com/photo-1494790108755-2616b612b786",
                "is_verified": false
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:40:00Z",
            "expires_at": "2026-03-05T08:40:00Z"
        },
        {
            "story_id": "17894567283940110",
            "user": {
                "user_id": "1010",
                "username": "James Harris",
                "profile_picture_url": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
                "is_verified": true
            },
            "media": {
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                "width": 1080,
                "height": 1920,
                "duration_seconds": 5
            },
            "created_at": "2026-03-04T08:45:00Z",
            "expires_at": "2026-03-05T08:45:00Z"
        }
    ]
    const IMAGE_SIZE = 80
    const borderWidth = 3;


    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={dummyStories}
                renderItem={({ item }) => (
                    <TouchableOpacity className='ml-4'>
                        <LinearGradient
                            colors={[
                                "#feda75",
                                "#fa7e1e",
                                "#d62976",
                                "#962fbf",
                                "#4f5bd5"
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[
                                styles.gradient,
                                {
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: IMAGE_SIZE / 2,
                                }
                            ]}
                        >
                            <View className='rounded-full overflow-hidden' style={{
                                width: IMAGE_SIZE - borderWidth * 2,
                                height: IMAGE_SIZE - borderWidth * 2,
                            }}>
                                <Image source={{ uri: item.user.profile_picture_url }} style={{ width: '100%', height: '100%' }} contentPosition={'top center'} contentFit='cover' />
                            </View>
                        </LinearGradient>



                        <AppText className='mt-2 text-center'>{item.user.username}</AppText>
                    </TouchableOpacity>
                )
                }
                keyExtractor={item => item.story_id}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    gradient: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export default StoriesCard