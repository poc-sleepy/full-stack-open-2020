export type Repository = {
  id: string;
  name: string;
  ownerName: string;
  createdAt: string;
  fullName: string;
  reviewCount: number;
  ratingAverage: number;
  forksCount: number;
  stargazersCount: number;
  description: string;
  language: string;
  ownerAvatarUrl: string;
};

export type ServerResponse = {
  totalCount: number;
  edges: {
    node: any;
    cursor: string;
  }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
};
