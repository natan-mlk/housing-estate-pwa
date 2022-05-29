interface CommentInterface {
    content: string;
  date: string;
  groupId: number;
  newsRequest: any;
  username: string;
  }

  interface PostInterface {
    comments: CommentInterface[];
    recentComment: CommentInterface;
    content: string;
    contentText: string;
    date: string;
    id: number;
    title: string;
    titleText: string;
  }

  export {CommentInterface, PostInterface};