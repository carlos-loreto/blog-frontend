export enum Page {
  Index,
  New,
}

export interface IPost {
  id?: number;
  authorName: string;
  title: string;
  content: string;
}
