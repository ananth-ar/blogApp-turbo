"use client";

type NotificationProps = {
  notification: {
    id: string;
    newFollowusername: string | null;
    userPostCommentusername: string | null;
    userReplyusername: string | null;
    userPostLikeusername: string | null;
    comment: string | null;
    postTitle: string | null;
    postSlug: string | null;
    createdAt: Date;
  };
};

export const NotificationComponent: React.FC<NotificationProps> = ({
  notification,
}) => {
  return (
    <ul className="space-y-4">
      <li
        key={notification.id}
        className="bg-white shadow-md rounded-lg p-4 flex items-start"
      >
        <div className="flex-shrink-0 mr-3">
          {notification.userReplyusername && (
            <svg
              className="w-6 h-6 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
              ></path>
            </svg>
          )}
          {notification.userPostCommentusername && (
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
          )}
          {notification.userPostLikeusername && (
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          )}
          {notification.newFollowusername && (
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">
            {notification.userReplyusername &&
              `${notification.userReplyusername} replied to your comment`}
            {notification.userPostCommentusername &&
              `${notification.userPostCommentusername} commented on your post`}
            {notification.userPostLikeusername &&
              `${notification.userPostLikeusername} liked your post`}
            {notification.newFollowusername &&
              `${notification.newFollowusername} started following you`}
          </p>
          {notification.comment && (
            <p className="mt-1 text-sm text-gray-500">{notification.comment}</p>
          )}
          {notification.postTitle && (
            <p className="mt-1 text-sm text-gray-500">
              On post: {notification.postTitle}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
      </li>
    </ul>
  );
};
