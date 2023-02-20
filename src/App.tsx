import React, { useState } from "react";
import Navbar from "./Navbar";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { IPost, Page } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>(Page.New);

  const onNavigate = (page: Page) => {
    setPage(page);
  };

  return (
    <div className="container mx-auto my-8">
      <div className="mb-8">
        <Navbar page={page} navigate={onNavigate} />
      </div>
      {page === Page.Index && <PostList />}
      {page === Page.New && <PostForm navigate={onNavigate} />}
    </div>
  );
}
