import React from "react";
import useSWR from "swr";
import { fetchPosts } from "./apis";
import { IPost } from "./types";

export default function PostList() {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<IPost[]>("posts", fetchPosts, {
    fallbackData: [],
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const itemElms = posts?.map((item) => (
    <div
      key={`${item.id}`}
      className="w-full p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {item.content}
      </p>
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={`https://ui-avatars.com/api/?name=${item.authorName}&background=ffd880&color=fc8059`}
          alt="Avatar of Jonathan Reinink"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{item.authorName}</p>
        </div>
      </div>
    </div>
  ));

  return <>{itemElms}</>;
}
