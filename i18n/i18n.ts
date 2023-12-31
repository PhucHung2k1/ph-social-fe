import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      discover: 'Discover',
      suggest: 'Suggestion for you',
      newsfeed: 'Newsfeed',
      savedposts: 'Saved posts',
      messages: 'messages',
      'what is your mind': "What's is your mind,",
      status: 'Status',
      photoVideo: 'Photo/Video',
      feelingActivity: 'Feeling/Activity',
      viewMoreComments: 'View more comments',
      likes: 'Likes',
      comments: 'comments',
      replies: 'replies',
      reply: 'reply',
      cancel: 'cancel',
      writeAComment: 'Write a comment...',
      post: 'Post',
      editPost: 'Edit Post',
      deletePost: 'Delete Post',
      copyPost: 'Copy Post',
      noPost: 'No Post',
      welcomeTo: 'Welcome To',
      active: 'Active',
      search: 'Search...',
      notifications: 'Notifications',
      deleteAll: 'Delete All',
      profile: 'Profile',
      logOut: 'Logout',
      enterYourMessage: 'Enter Your Message...',
      send: 'SEND',
      follow: 'Follow',
      unFollow: 'UnFollow',
      posts: 'Posts',
      follower: 'Follower',
      following: 'Following',
      editProfile: 'Edit Profile',
      role: 'Role',
      intro: 'Intro',
      editStory: 'Edit Story',
      photos: 'Photos',
      noPhoto: 'No Photo',
      joined: 'Joined',
      aPosts: 'Post',
      edit: 'Edit',
      delete: 'Delete',
      areYouSureDeletePost: 'Are you sure you want to delete this post?',
      updateVipUser: 'Update Vip User',
      areYouUpdateVipUser: 'Are you sure you want to update vip user?',
    },
  },
  vi: {
    translation: {
      discover: 'Khám phá',
      suggest: 'Gợi ý cho bạn',
      newsfeed: 'Bảng tin',
      savedposts: 'Bài đã lưu',
      messages: 'Tin nhắn',
      'what is your mind': 'Bạn đang nghĩ gì,',
      status: 'Trạng thái',
      photoVideo: 'Hình ảnh/Video',
      feelingActivity: 'Cảm xúc/Hoạt động',
      viewMoreComments: 'Xem thêm bình luận',
      likes: 'Lượt thích',
      comments: 'Lượt bình luận',
      replies: 'Lượt trả lời',
      reply: 'Trả lời',
      cancel: 'Hủy',
      writeAComment: 'Viết bình luận...',
      post: 'Đăng',
      editPost: 'Sửa bài viết',
      deletePost: 'Xóa bài viết',
      copyPost: 'Sao chép đường dẫn',
      noPost: 'Không có bài viết',
      welcomeTo: 'Chào mừng đến với',
      active: 'Đang hoạt động',
      search: 'Tìm kiếm...',
      notifications: 'Thông báo',
      deleteAll: 'Xóa tất cả',
      profile: 'Trang cá nhân',
      logOut: 'Đăng xuất',
      enterYourMessage: 'Nhập tin nhắn...',
      send: 'GỬI',
      follow: 'Theo dõi',
      unFollow: 'Hủy theo dõi',
      follower: 'Người theo dõi',
      following: 'Đang theo dõi',
      editProfile: 'Sửa trang cá nhân',
      role: 'Chức vụ',
      intro: 'Giới thiệu',
      editStory: 'Chỉnh sửa phần giới thiệu',
      photos: 'Hình ảnh',
      noPhoto: 'Không có hình ảnh',
      posts: 'Bài viết',
      joined: 'Đã tham gia vào',
      aPosts: 'Bài viết',
      edit: 'Sửa',
      delete: 'Xóa',
      areYouSureDeletePost: 'Bạn có chắc chắn muốn xóa bài viết này?',
      updateVipUser: 'Nâng cấp thành viên VIP',
      areYouUpdateVipUser: 'Bạn có chắc chắn muốn nâng cấp thành viên VIP?',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'vi',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
