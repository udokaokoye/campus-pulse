import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { AppText } from '@/components/AppText';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STORY_DURATION = 5000;

const MOCK_USER = {
  username: 'alex.campus',
  profilePic: 'https://picsum.photos/seed/avatar1/200/200',
};

const MOCK_STORIES = [
  { id: '1', image: 'https://picsum.photos/seed/story1/1080/1920', timestamp: '2h ago', views: 142 },
  { id: '2', image: 'https://picsum.photos/seed/story2/1080/1920', timestamp: '4h ago', views: 98 },
  { id: '3', image: 'https://picsum.photos/seed/story3/1080/1920', timestamp: '6h ago', views: 215 },
  { id: '4', image: 'https://picsum.photos/seed/story4/1080/1920', timestamp: '8h ago', views: 67 },
];

function ProgressBar({ index, activeIndex, duration }: { index: number; activeIndex: number; duration: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (index === activeIndex) {
      progress.value = 0;
      progress.value = withTiming(1, { duration });
    } else if (index < activeIndex) {
      progress.value = 1;
    } else {
      progress.value = 0;
    }
  }, [activeIndex, index, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.progressBarBg}>
      <Animated.View style={[styles.progressBarFill, animatedStyle]} />
    </View>
  );
}

export default function StoryViewer() {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const heartScale = useSharedValue(1);

  const story = MOCK_STORIES[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < MOCK_STORIES.length - 1) {
      setCurrentIndex((i) => i + 1);
      setLiked(false);
    } else {
      router.back();
    }
  }, [currentIndex]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setLiked(false);
    }
  }, [currentIndex]);

  // Auto-advance timer
  useEffect(() => {
    const timer = setTimeout(() => {
      goNext();
    }, STORY_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, goNext]);

  const handleTap = (x: number) => {
    if (x < SCREEN_WIDTH / 3) {
      goPrev();
    } else {
      goNext();
    }
  };

  const toggleLike = () => {
    setLiked((prev) => !prev);
    heartScale.value = withSequence(
      withSpring(1.4, { damping: 4, stiffness: 300 }),
      withSpring(1, { damping: 6, stiffness: 200 })
    );
  };

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Story Image */}
      <Image
        source={{ uri: story.image }}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
        transition={200}
      />

      {/* Tap zones */}
      <TouchableWithoutFeedback onPress={(e) => handleTap(e.nativeEvent.locationX)}>
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableWithoutFeedback>

      {/* Top overlay */}
      <View style={[styles.topOverlay, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
        {/* Progress bars */}
        <View style={styles.progressContainer}>
          {MOCK_STORIES.map((_, i) => (
            <ProgressBar key={i} index={i} activeIndex={currentIndex} duration={STORY_DURATION} />
          ))}
        </View>

        {/* User info + close */}
        <View style={styles.headerRow}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: MOCK_USER.profilePic }}
              style={styles.avatar}
            />
            <AppText weight="semibold" style={styles.username}>{MOCK_USER.username}</AppText>
            <AppText weight="light" style={styles.timestamp}>{story.timestamp}</AppText>
          </View>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]} pointerEvents="box-none">
        <View style={styles.viewCount}>
          <Ionicons name="eye-outline" size={20} color="white" />
          <AppText weight="regular" style={styles.viewText}>{story.views}</AppText>
        </View>
        <TouchableOpacity onPress={toggleLike} activeOpacity={0.7}>
          <Animated.View style={heartAnimStyle}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={28}
              color={liked ? '#FF3B30' : 'white'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  progressBarBg: {
    flex: 1,
    height: 2.5,
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    fontSize: 14,
  },
  timestamp: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  viewCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  viewText: {
    color: 'white',
    fontSize: 14,
  },
});
