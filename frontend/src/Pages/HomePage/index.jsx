import { useEffect, useState } from "react";
import BlogFeed from "../../components/Posts/BlogFeed";
import { PostCardSkeleton } from "../../components/Skeleon/PosstCardSkeleton";
// import PostCard from "../../components/Posts/PostCard";
import Header from "../../components/Layout/Header";
import axiosInstance from "../../helpers/axiosInstance";
import PostCard from "../../components/Posts/PostCard";
function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <Header />
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="cursor-text pb-4 text-xl font-semibold dark:text-dark-primary sm:pb-0">
          All Posts
        </h1>
        <div className="flex flex-wrap">
          {posts.length === 0
            ? Array(8)
                .fill(0)
                .map((_, index) => <PostCardSkeleton key={index} />)
            : posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
