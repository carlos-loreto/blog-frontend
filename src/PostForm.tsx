import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { createPost } from "./apis";
import { Page } from "./types";

type FormData = {
  authorName: string;
  title: string;
  content: string;
};

export default function PostForm({ navigate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data) {
    mutate(
      "post",
      createPost(data).then((data) => {
        navigate(Page.Index);
      }),
      {
        revalidate: true,
      }
    );
  }

  function onCancel() {
    navigate(Page.Index);
  }

  return (
    <>
      <h1 className="mb-8 text-4xl leading-none tracking-tight text-gray-900 dark:text-white">
        New post
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="authorName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Author Name
          </label>
          <input
            type="text"
            {...register("authorName", {
              required: "Author name is required!",
            })}
            id="authorName"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Write name of author"
          />
          {errors.authorName && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.authorName.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required!",
              minLength: {
                value: 5,
                message: "Title should be at least 5-characters long.",
              },
            })}
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Write title"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Content
          </label>
          <textarea
            {...register("content", {
              required: "Content is required!",
              minLength: {
                value: 20,
                message: "Content should be at least 20-characters long.",
              },
            })}
            id="content"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write content"
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create new post
        </button>

        <button
          type="button"
          className="ml-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
