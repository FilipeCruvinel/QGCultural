import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import Card from "../components/Card.jsx";
import EmptyCard from "../components/EmptyCard.jsx";

function Home() {
  const [posts, setPosts] = useState([]);
  const [firstPostPage, setFirstPostPage] = useState(true);
  const [lastPostPage, setLastPostPage] = useState(false);
  const [currentPostPage, setCurrentPostPage] = useState(1);

  const currentPost = useRef(13);
  const countPostPerBlock = useRef(0);

  function getPosts() {
    fetch(`/texts/${currentPost.current}.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jasonData) => {
        //console.log(jasonData);
        const postFinal = [jasonData];
        //console.log(postFinal);
        setPosts((prev) => [...prev, ...postFinal]);
        currentPost.current--;
        //console.log(currentPost.current);
        countPostPerBlock.current++;
        //console.log(countPostPerBlock.current);
        if (countPostPerBlock.current < 6) getPosts();
        else {
          if (currentPost.current == 0) setLastPostPage(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        let idCount = 0;
        let countPostFillEmpty = countPostPerBlock.current;
        while (countPostFillEmpty < 6) {
          setPosts((prev) => [...prev, ...[{ id: idCount }]]);
          idCount--;
          countPostFillEmpty++;
        }
        setLastPostPage(true);
      });
  }

  useQuery("posts", () => {
    getPosts();
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="mx-10 sm:mx-5 md:mx-20 lg:mx-40 my-10">
      <div className="m-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
        {posts?.map((item) => {
          return <>{item.id >= 1 ? <Card post={item} /> : <EmptyCard />}</>;
        })}
      </div>
      <div className="mt-5 flex flex-row gap-2 justify-center">
        {firstPostPage ? (
          <button className="bg-gray-400 border border-gray-400 rounded-md px-5 py-2 text-gray-100">
            anterior
          </button>
        ) : (
          <button
            className="bg-gray-900 hover:bg-gray-100 border border-gray-900 hover:border-gray-400 rounded-md px-5 py-2 text-white hover:text-gray-900 transition-all"
            onClick={() => {
              if (lastPostPage) setLastPostPage(false);
              //console.log(currentPost.current);
              currentPost.current += countPostPerBlock.current + 6;
              if (currentPostPage == 2) setFirstPostPage(true);
              setCurrentPostPage((prev) => prev - 1);
              countPostPerBlock.current = 0;
              setPosts([]);
              getPosts();
            }}
          >
            anterior
          </button>
        )}
        <div className="bg-gray-100 rounded-sm px-3 py-2 text-gray-900">
          {currentPostPage}
        </div>
        {lastPostPage ? (
          <button className="bg-gray-400 border border-gray-400 rounded-md px-5 py-2 text-white">
            próximo
          </button>
        ) : (
          <button
            className="bg-gray-900 hover:bg-gray-100 border border-gray-900 hover:border-gray-400 rounded-md px-5 py-2 text-white hover:text-gray-900 transition-all"
            onClick={() => {
              //console.log(currentPost.current);
              if (currentPostPage == 1) setFirstPostPage(false);
              setCurrentPostPage((prev) => prev + 1);
              countPostPerBlock.current = 0;
              setPosts([]);
              getPosts();
            }}
          >
            próximo
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
