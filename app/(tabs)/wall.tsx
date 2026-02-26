import React, { useState, useCallback, useContext } from 'react';
import { ThemeContext } from '@/Store/ThemeContext';
import {
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '@/components/AppText';
import { Icon } from '@/components/Icon';
import { ACCENT_COLOR, GRAY_BG } from '@/utils/constants';

// ── Types ──────────────────────────────────────────────────────────────

type WallComment = {
  id: string;
  alias: string;
  avatarColor: string;
  text: string;
  timestamp: string;
  replies: WallReply[];
};

type WallReply = {
  id: string;
  alias: string;
  avatarColor: string;
  text: string;
  timestamp: string;
};

type WallPost = {
  id: string;
  alias: string;
  avatarColor: string;
  content: string;
  hasImage: boolean;
  timeRemaining: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  timestamp: string;
  comments: WallComment[];
};

// ── Constants ──────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  '#9B59B6', '#1976D2', '#2E7D32', '#E65100', '#C2185B', '#00695C', '#F57C00', '#5C6BC0',
];

const USER_ALIAS = 'CosmicFox88';

const CARD_SHADOW = {
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.15,
  shadowRadius: 3,
  elevation: 4,
};

// ── Mock Data ──────────────────────────────────────────────────────────

const MOCK_POSTS: WallPost[] = [
  {
    id: '1',
    alias: 'MysticOwl42',
    avatarColor: AVATAR_COLORS[0],
    content: 'Anyone else think the new dining hall menu is absolutely fire this semester? The ramen station alone is worth the meal plan. 🍜',
    hasImage: false,
    timeRemaining: '23h 14m left',
    upvotes: 47,
    downvotes: 3,
    commentCount: 12,
    timestamp: '34m ago',
    comments: [
      {
        id: 'c1',
        alias: 'NeonTiger99',
        avatarColor: AVATAR_COLORS[1],
        text: 'The ramen is goated fr. I go every single day now.',
        timestamp: '28m ago',
        replies: [
          { id: 'r1', alias: 'GhostPanda07', avatarColor: AVATAR_COLORS[2], text: 'Same lol my wallet is crying tho', timestamp: '20m ago' },
        ],
      },
      {
        id: 'c2',
        alias: 'PixelWolf55',
        avatarColor: AVATAR_COLORS[3],
        text: 'Bro the spicy miso is unreal',
        timestamp: '15m ago',
        replies: [],
      },
    ],
  },
  {
    id: '2',
    alias: 'SilentFox77',
    avatarColor: AVATAR_COLORS[1],
    content: 'Lost my AirPods somewhere between the library and the engineering building. If anyone finds white AirPod Pros in a blue case PLEASE dm the lost and found page 😭',
    hasImage: false,
    timeRemaining: '18h 42m left',
    upvotes: 23,
    downvotes: 1,
    commentCount: 5,
    timestamp: '1h ago',
    comments: [
      {
        id: 'c3',
        alias: 'CosmicBear31',
        avatarColor: AVATAR_COLORS[4],
        text: 'Check the front desk at the library, they had a pair turned in earlier',
        timestamp: '45m ago',
        replies: [],
      },
    ],
  },
  {
    id: '3',
    alias: 'NeonTiger99',
    avatarColor: AVATAR_COLORS[2],
    content: 'The sunset from the top of the parking garage tonight was unreal 🌅',
    hasImage: true,
    timeRemaining: '15h 30m left',
    upvotes: 89,
    downvotes: 2,
    commentCount: 18,
    timestamp: '2h ago',
    comments: [
      {
        id: 'c4',
        alias: 'MysticOwl42',
        avatarColor: AVATAR_COLORS[0],
        text: 'Gorgeous! Which garage?',
        timestamp: '1h ago',
        replies: [
          { id: 'r2', alias: 'NeonTiger99', avatarColor: AVATAR_COLORS[2], text: 'CCM garage, top floor. Trust me on this one.', timestamp: '55m ago' },
        ],
      },
    ],
  },
  {
    id: '4',
    alias: 'GhostPanda07',
    avatarColor: AVATAR_COLORS[3],
    content: 'Hot take: 8am classes should be illegal. I literally fell asleep standing up in the elevator today.',
    hasImage: false,
    timeRemaining: '12h 05m left',
    upvotes: 156,
    downvotes: 8,
    commentCount: 31,
    timestamp: '3h ago',
    comments: [
      {
        id: 'c5',
        alias: 'PixelWolf55',
        avatarColor: AVATAR_COLORS[5],
        text: 'This is not a hot take this is just facts',
        timestamp: '2h ago',
        replies: [],
      },
    ],
  },
  {
    id: '5',
    alias: 'PixelWolf55',
    avatarColor: AVATAR_COLORS[4],
    content: 'Just aced my organic chemistry midterm after studying for 3 days straight. If I can do it, you can too. Don\'t give up! 💪',
    hasImage: false,
    timeRemaining: '8h 20m left',
    upvotes: 212,
    downvotes: 4,
    commentCount: 24,
    timestamp: '5h ago',
    comments: [],
  },
  {
    id: '6',
    alias: 'CosmicBear31',
    avatarColor: AVATAR_COLORS[5],
    content: 'Free pizza at the student union right now. First come first served, they have like 20 boxes. RUN. 🍕🏃',
    hasImage: true,
    timeRemaining: '2h 30m left',
    upvotes: 302,
    downvotes: 5,
    commentCount: 45,
    timestamp: '8h ago',
    comments: [
      {
        id: 'c6',
        alias: 'SilentFox77',
        avatarColor: AVATAR_COLORS[1],
        text: 'All gone already 😔',
        timestamp: '7h ago',
        replies: [
          { id: 'r3', alias: 'CosmicBear31', avatarColor: AVATAR_COLORS[5], text: 'Lasted like 15 minutes lol', timestamp: '6h ago' },
        ],
      },
    ],
  },
  {
    id: '7',
    alias: 'LunarRaven14',
    avatarColor: AVATAR_COLORS[6],
    content: 'Whoever keeps microwaving fish in the dorm kitchen on the 4th floor of Turner... we need to talk. 🐟🚫',
    hasImage: false,
    timeRemaining: '5h 45m left',
    upvotes: 178,
    downvotes: 12,
    commentCount: 38,
    timestamp: '6h ago',
    comments: [],
  },
  {
    id: '8',
    alias: 'VelvetFalcon22',
    avatarColor: AVATAR_COLORS[7],
    content: 'Study group for MATH 251 meeting at Langsam Library room 425 tomorrow at 2pm. Bring snacks and suffering.',
    hasImage: false,
    timeRemaining: '20h 10m left',
    upvotes: 34,
    downvotes: 0,
    commentCount: 7,
    timestamp: '45m ago',
    comments: [],
  },
];

// ── Avatar Component ───────────────────────────────────────────────────

function AvatarCircle({ alias, color, size = 36 }: { alias: string; color: string; size?: number }) {
  const initials = alias.replace(/[0-9]/g, '').slice(0, 2).toUpperCase();
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppText weight="bold" style={{ color: '#fff', fontSize: size * 0.38 }}>
        {initials}
      </AppText>
    </View>
  );
}

// ── Reply Item ─────────────────────────────────────────────────────────

function ReplyItem({ reply }: { reply: WallReply }) {
  const { isDark } = useContext(ThemeContext);
  return (
    <View style={{ flexDirection: 'row', marginLeft: 40, marginTop: 12, gap: 10 }}>
      <AvatarCircle alias={reply.alias} color={reply.avatarColor} size={28} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <AppText weight="semibold" style={{ fontSize: 13, color: isDark ? '#E5E7EB' : '#333' }}>{reply.alias}</AppText>
          <AppText style={{ fontSize: 11, color: isDark ? '#6B7280' : '#999' }}>{reply.timestamp}</AppText>
        </View>
        <AppText style={{ fontSize: 13, color: isDark ? '#9CA3AF' : '#555', marginTop: 2 }}>{reply.text}</AppText>
      </View>
    </View>
  );
}

// ── Comment Item ───────────────────────────────────────────────────────

function CommentItem({ comment, onReply }: { comment: WallComment; onReply: (commentId: string, alias: string) => void }) {
  const { isDark } = useContext(ThemeContext);
  return (
    <View style={{ marginTop: 16 }}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <AvatarCircle alias={comment.alias} color={comment.avatarColor} size={32} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AppText weight="semibold" style={{ fontSize: 14, color: isDark ? '#E5E7EB' : '#333' }}>{comment.alias}</AppText>
            <AppText style={{ fontSize: 12, color: isDark ? '#6B7280' : '#999' }}>{comment.timestamp}</AppText>
          </View>
          <AppText style={{ fontSize: 14, color: isDark ? '#D1D5DB' : '#444', marginTop: 3 }}>{comment.text}</AppText>
          <TouchableOpacity onPress={() => onReply(comment.id, comment.alias)} style={{ marginTop: 6 }}>
            <AppText weight="medium" style={{ fontSize: 12, color: ACCENT_COLOR }}>Reply</AppText>
          </TouchableOpacity>
        </View>
      </View>
      {comment.replies.map((r) => (
        <ReplyItem key={r.id} reply={r} />
      ))}
    </View>
  );
}

// ── Post Card ──────────────────────────────────────────────────────────

function PostCard({ post, onOpenComments }: { post: WallPost; onOpenComments: (post: WallPost) => void }) {
  const { isDark } = useContext(ThemeContext);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvotes((v) => v - 1);
      setUpvoted(false);
    } else {
      setUpvotes((v) => v + 1);
      setUpvoted(true);
      if (downvoted) {
        setDownvotes((v) => v - 1);
        setDownvoted(false);
      }
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      setDownvotes((v) => v - 1);
      setDownvoted(false);
    } else {
      setDownvotes((v) => v + 1);
      setDownvoted(true);
      if (upvoted) {
        setUpvotes((v) => v - 1);
        setUpvoted(false);
      }
    }
  };

  return (
    <Pressable
      onPress={() => onOpenComments(post)}
      style={{
        ...CARD_SHADOW,
        backgroundColor: isDark ? '#1F2937' : '#fff',
        shadowColor: isDark ? '#000' : '#000',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <AvatarCircle alias={post.alias} color={post.avatarColor} />
          <View>
            <AppText weight="semibold" style={{ fontSize: 15, color: isDark ? '#F3F4F6' : '#222' }}>{post.alias}</AppText>
            <AppText style={{ fontSize: 12, color: isDark ? '#9CA3AF' : '#999' }}>{post.timestamp}</AppText>
          </View>
        </View>
        <View style={{ backgroundColor: isDark ? '#374151' : GRAY_BG, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 }}>
          <AppText weight="medium" style={{ fontSize: 11, color: ACCENT_COLOR }}>
            🔥 {post.timeRemaining}
          </AppText>
        </View>
      </View>

      {/* Content */}
      <AppText style={{ fontSize: 15, color: isDark ? '#D1D5DB' : '#333', lineHeight: 22, marginTop: 12 }}>
        {post.content}
      </AppText>

      {/* Image placeholder */}
      {post.hasImage && (
        <View
          style={{
            height: 180,
            borderRadius: 12,
            backgroundColor: isDark ? '#374151' : GRAY_BG,
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="image-outline" type="ionicon" size={40} color="#CCC" />
          <AppText style={{ fontSize: 12, color: '#BBB', marginTop: 4 }}>Image</AppText>
        </View>
      )}

      {/* Actions */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 4 }}>
        {/* Upvote */}
        <TouchableOpacity
          onPress={handleUpvote}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: upvoted ? (isDark ? '#4B2520' : '#FFF0EE') : (isDark ? '#374151' : GRAY_BG),
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            gap: 4,
          }}
        >
          <Icon name="flame" type="ionicon" size={18} color={upvoted ? ACCENT_COLOR : (isDark ? '#9CA3AF' : '#888')} />
          <AppText weight="medium" style={{ fontSize: 13, color: upvoted ? ACCENT_COLOR : (isDark ? '#9CA3AF' : '#666') }}>
            {upvotes}
          </AppText>
        </TouchableOpacity>

        {/* Downvote */}
        <TouchableOpacity
          onPress={handleDownvote}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: downvoted ? (isDark ? '#1E2340' : '#EEF0FF') : (isDark ? '#374151' : GRAY_BG),
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            gap: 4,
          }}
        >
          <Icon name="arrow-down" type="ionicon" size={18} color={downvoted ? '#5C6BC0' : (isDark ? '#9CA3AF' : '#888')} />
          <AppText weight="medium" style={{ fontSize: 13, color: downvoted ? '#5C6BC0' : (isDark ? '#9CA3AF' : '#666') }}>
            {downvotes}
          </AppText>
        </TouchableOpacity>

        {/* Comment */}
        <TouchableOpacity
          onPress={() => onOpenComments(post)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isDark ? '#374151' : GRAY_BG,
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            gap: 4,
            marginLeft: 'auto',
          }}
        >
          <Icon name="chatbubble-outline" type="ionicon" size={16} color={isDark ? '#9CA3AF' : '#888'} />
          <AppText weight="medium" style={{ fontSize: 13, color: isDark ? '#9CA3AF' : '#666' }}>
            {post.commentCount}
          </AppText>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────

export default function WallScreen() {
  const { isDark } = useContext(ThemeContext);
  const [posts, setPosts] = useState<WallPost[]>(MOCK_POSTS);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<WallPost | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeText, setComposeText] = useState('');
  const [commentText, setCommentText] = useState('');
  const [replyTarget, setReplyTarget] = useState<{ commentId: string; alias: string } | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleOpenComments = useCallback((post: WallPost) => {
    setSelectedPost(post);
    setCommentText('');
    setReplyTarget(null);
  }, []);

  const handlePostToWall = () => {
    if (!composeText.trim()) return;
    const newPost: WallPost = {
      id: Date.now().toString(),
      alias: USER_ALIAS,
      avatarColor: ACCENT_COLOR,
      content: composeText.trim(),
      hasImage: false,
      timeRemaining: '24h 00m left',
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      timestamp: 'just now',
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setComposeText('');
    setShowCompose(false);
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !selectedPost) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== selectedPost.id) return p;

        let updatedComments: WallComment[];
        if (replyTarget) {
          updatedComments = p.comments.map((c) => {
            if (c.id !== replyTarget.commentId) return c;
            return {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: Date.now().toString(),
                  alias: USER_ALIAS,
                  avatarColor: ACCENT_COLOR,
                  text: commentText.trim(),
                  timestamp: 'just now',
                },
              ],
            };
          });
        } else {
          updatedComments = [
            ...p.comments,
            {
              id: Date.now().toString(),
              alias: USER_ALIAS,
              avatarColor: ACCENT_COLOR,
              text: commentText.trim(),
              timestamp: 'just now',
              replies: [],
            },
          ];
        }

        const updated = { ...p, comments: updatedComments, commentCount: p.commentCount + 1 };
        setSelectedPost(updated);
        return updated;
      })
    );

    setCommentText('');
    setReplyTarget(null);
  };

  const handleReply = (commentId: string, alias: string) => {
    setReplyTarget({ commentId, alias });
  };

  const renderPost = useCallback(
    ({ item }: { item: WallPost }) => <PostCard post={item} onOpenComments={handleOpenComments} />,
    [handleOpenComments]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDark ? '#111827' : '#fff' }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 }}>
        <AppText weight="bold" style={{ fontSize: 28, color: isDark ? '#F9FAFB' : '#222' }}>The Wall</AppText>
        <AppText style={{ fontSize: 14, color: isDark ? '#6B7280' : '#999', marginTop: 2 }}>Anonymous • Ephemeral • 24h</AppText>
      </View>

      {/* Feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={ACCENT_COLOR} />
        }
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => setShowCompose(true)}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: ACCENT_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: ACCENT_COLOR,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Icon name="add" type="ionicon" size={28} color="#fff" />
      </TouchableOpacity>

      {/* ── Compose Modal ─────────────────────────────────────────── */}
      <Modal visible={showCompose} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: isDark ? '#1F2937' : '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, minHeight: 320 }}>
              {/* Handle bar */}
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: isDark ? '#4B5563' : '#DDD', alignSelf: 'center', marginBottom: 16 }} />

              {/* User alias */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <AvatarCircle alias={USER_ALIAS} color={ACCENT_COLOR} />
                <View>
                  <AppText weight="semibold" style={{ fontSize: 15, color: isDark ? '#E5E7EB' : '#222' }}>Posting as</AppText>
                  <AppText weight="bold" style={{ fontSize: 16, color: ACCENT_COLOR }}>{USER_ALIAS}</AppText>
                </View>
              </View>

              {/* Text input */}
              <TextInput
                value={composeText}
                onChangeText={setComposeText}
                placeholder="What's on your mind? 💭"
                placeholderTextColor="#BBB"
                multiline
                style={{
                  flex: 1,
                  minHeight: 100,
                  fontSize: 16,
                  color: isDark ? '#E5E7EB' : '#333',
                  textAlignVertical: 'top',
                  padding: 12,
                  backgroundColor: isDark ? '#374151' : GRAY_BG,
                  borderRadius: 12,
                  fontFamily: 'Roboto_400Regular',
                }}
              />

              {/* Bottom actions */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    backgroundColor: isDark ? '#374151' : GRAY_BG,
                    borderRadius: 20,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                  }}
                >
                  <Icon name="image-outline" type="ionicon" size={20} color={isDark ? '#9CA3AF' : '#888'} />
                  <AppText weight="medium" style={{ fontSize: 13, color: isDark ? '#9CA3AF' : '#888' }}>Add Image</AppText>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => { setShowCompose(false); setComposeText(''); }}
                    style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 }}
                  >
                    <AppText weight="medium" style={{ fontSize: 14, color: '#999' }}>Cancel</AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handlePostToWall}
                    style={{
                      backgroundColor: composeText.trim() ? ACCENT_COLOR : '#FFB4AD',
                      borderRadius: 20,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    }}
                  >
                    <AppText weight="bold" style={{ fontSize: 14, color: '#fff' }}>Post to Wall</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── Comments Modal ────────────────────────────────────────── */}
      <Modal visible={!!selectedPost} animationType="slide" transparent>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <View style={{ backgroundColor: isDark ? '#1F2937' : '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%', minHeight: '60%' }}>
              {/* Handle bar */}
              <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: isDark ? '#4B5563' : '#DDD', alignSelf: 'center', marginTop: 10 }} />

              {/* Close */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
                <AppText weight="bold" style={{ fontSize: 18, color: isDark ? '#F3F4F6' : '#222' }}>Comments</AppText>
                <TouchableOpacity onPress={() => setSelectedPost(null)}>
                  <Icon name="close" type="ionicon" size={24} color={isDark ? '#9CA3AF' : '#999'} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ flex: 1, paddingHorizontal: 20 }} showsVerticalScrollIndicator={false}>
                {/* Original post */}
                {selectedPost && (
                  <View style={{ backgroundColor: isDark ? '#374151' : GRAY_BG, borderRadius: 14, padding: 14, marginBottom: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <AvatarCircle alias={selectedPost.alias} color={selectedPost.avatarColor} size={30} />
                      <AppText weight="semibold" style={{ fontSize: 14, color: isDark ? '#E5E7EB' : '#333' }}>{selectedPost.alias}</AppText>
                      <AppText style={{ fontSize: 12, color: isDark ? '#9CA3AF' : '#999' }}>{selectedPost.timestamp}</AppText>
                    </View>
                    <AppText style={{ fontSize: 14, color: isDark ? '#D1D5DB' : '#444', lineHeight: 20 }}>{selectedPost.content}</AppText>
                  </View>
                )}

                {/* Comments */}
                {selectedPost?.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
                ))}

                {selectedPost?.comments.length === 0 && (
                  <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                    <Icon name="chatbubbles-outline" type="ionicon" size={40} color="#DDD" />
                    <AppText style={{ fontSize: 14, color: '#BBB', marginTop: 8 }}>No comments yet. Be the first!</AppText>
                  </View>
                )}

                <View style={{ height: 20 }} />
              </ScrollView>

              {/* Comment input */}
              <View style={{ borderTopWidth: 1, borderTopColor: isDark ? '#374151' : '#F0F0F0', paddingHorizontal: 16, paddingVertical: 10 }}>
                {replyTarget && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 6 }}>
                    <AppText style={{ fontSize: 12, color: '#999' }}>
                      Replying to <AppText weight="semibold" style={{ fontSize: 12, color: ACCENT_COLOR }}>{replyTarget.alias}</AppText>
                    </AppText>
                    <TouchableOpacity onPress={() => setReplyTarget(null)}>
                      <Icon name="close-circle" type="ionicon" size={16} color="#CCC" />
                    </TouchableOpacity>
                  </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <AvatarCircle alias={USER_ALIAS} color={ACCENT_COLOR} size={30} />
                  <TextInput
                    value={commentText}
                    onChangeText={setCommentText}
                    placeholder={replyTarget ? `Reply to ${replyTarget.alias}...` : 'Add a comment...'}
                    placeholderTextColor="#BBB"
                    style={{
                      flex: 1,
                      backgroundColor: isDark ? '#374151' : GRAY_BG,
                      borderRadius: 20,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      fontSize: 14,
                      color: isDark ? '#E5E7EB' : '#333',
                      fontFamily: 'Roboto_400Regular',
                    }}
                  />
                  <TouchableOpacity onPress={handleAddComment}>
                    <Icon name="send" type="ionicon" size={22} color={commentText.trim() ? ACCENT_COLOR : '#CCC'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}
