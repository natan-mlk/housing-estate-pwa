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

  interface PostInterfaceOrigin {
    content: string;
    contentText: string;
    date: string;
    id: number;
    title: string;
    titleText: string;
  }

  interface AllCommentsInterfaceOrigin {
    content: CommentInterface[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: any
    size: number
    sort: any
    totalElements: number
    totalPages: number
  }

  export {CommentInterface, PostInterface, PostInterfaceOrigin, AllCommentsInterfaceOrigin};