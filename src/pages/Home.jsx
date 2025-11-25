import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import Card from "../components/Card.jsx";
import EmptyCard from "../components/EmptyCard.jsx";
import Loading from "../components/Loading.jsx";
import { FiMenu } from "react-icons/fi";

const typeFilterList = [
  {
    name: "Todos",
    value: "all",
  },
  {
    name: "Prosa",
    value: "prose",
  },
  {
    name: "Contos",
    value: "tale",
  },
  {
    name: "Crônicas",
    value: "chronicle",
  },
  {
    name: "Poesia",
    value: "poetry",
  },
];

const totalPosts = 18;

function Home() {
  const [posts, setPosts] = useState([]);
  const [firstPostPage, setFirstPostPage] = useState(true);
  const [lastPostPage, setLastPostPage] = useState(false);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("all");
  const [filterDropIsOpen, setFilterDropIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentPost = useRef(totalPosts);
  const countPostPerBlock = useRef(0);
  const postsTested = useRef([]);
  const pageControl = useRef(0);
  const filterControl = useRef("all");

  function getPosts() {
    fetch(`/texts/${currentPost.current}.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jasonData) => {
        let postFinal;
        switch (filterControl.current) {
          case "all":
            postFinal = [jasonData];
            setPosts((prev) => [...prev, ...postFinal]);
            countPostPerBlock.current++;
            break;

          case "prose":
            if (jasonData.type == "Conto" || jasonData.type == "Crônica") {
              postFinal = [jasonData];
              setPosts((prev) => [...prev, ...postFinal]);
              countPostPerBlock.current++;
            }
            break;

          case "tale":
            if (jasonData.type == "Conto") {
              postFinal = [jasonData];
              setPosts((prev) => [...prev, ...postFinal]);
              countPostPerBlock.current++;
            }
            break;

          case "chronicle":
            if (jasonData.type == "Crônica") {
              postFinal = [jasonData];
              setPosts((prev) => [...prev, ...postFinal]);
              countPostPerBlock.current++;
            }
            break;

          case "poetry":
            if (jasonData.type == "Poesia") {
              postFinal = [jasonData];
              setPosts((prev) => [...prev, ...postFinal]);
              countPostPerBlock.current++;
            }
            break;
        }

        currentPost.current--;
        postsTested.current[pageControl.current]++;

        if (countPostPerBlock.current < 6) getPosts();
        else {
          setIsLoading(false);
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

        setIsLoading(false);
        setLastPostPage(true);
      });
  }

  function handleTypeFilter(type) {
    setIsLoading(true);
    setTypeFilter(type);
    filterControl.current = type;
    if (lastPostPage) setLastPostPage(false);
    setFirstPostPage(true);
    currentPost.current = totalPosts;
    setCurrentPostPage(1);
    pageControl.current = 0;
    countPostPerBlock.current = 0;
    postsTested.current = [0];
    setPosts([]);
    getPosts();
  }

  function handlePages(move) {
    setIsLoading(true);
    if (move == "next") {
      if (currentPostPage == 1) setFirstPostPage(false);
      setCurrentPostPage((prev) => prev + 1);
      pageControl.current++;
      postsTested.current.push(0);
    } else {
      if (lastPostPage) setLastPostPage(false);
      if (currentPostPage == 2) setFirstPostPage(true);
      currentPost.current +=
        postsTested.current[pageControl.current] +
        postsTested.current[pageControl.current - 1];
      postsTested.current[pageControl.current - 1] = 0;
      setCurrentPostPage((prev) => prev - 1);
      pageControl.current--;
      postsTested.current.pop();
    }
    countPostPerBlock.current = 0;
    setPosts([]);
    getPosts();
  }

  useQuery("posts", () => {
    postsTested.current.push(0);
    getPosts();
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="mx-10 sm:mx-5 md:mx-20 lg:mx-40 my-5">
      <div className="hidden sm:block">
        <div className="mb-5 flex flex-row gap-1 justify-center">
          {typeFilterList.map((item) => (
            <>
              {typeFilter == item.value ? (
                <button className="bg-gray-400 border border-gray-400 rounded-md px-5 py-2 text-sm text-gray-100">
                  {item.name}
                </button>
              ) : (
                <button
                  className="bg-gray-900 hover:bg-gray-100 border border-gray-900 hover:border-gray-400 rounded-md px-5 py-2 text-sm text-white hover:text-gray-900 transition-all"
                  onClick={() => {
                    handleTypeFilter(item.value);
                  }}
                >
                  {item.name}
                </button>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="mb-5 flex justify-center">
          <button
            className="bg-gray-900 hover:bg-gray-100 border border-gray-900 hover:border-gray-400 rounded-md transition-all"
            onClick={() => setFilterDropIsOpen(!filterDropIsOpen)}
          >
            <FiMenu className="h-full w-full px-5 py-2 text-lg text-gray-100 hover:text-gray-900 transition-all" />
          </button>
        </div>
        <div
          className={`${
            filterDropIsOpen ? "" : "hidden"
          } mb-5 flex flex-col gap-1 justify-center`}
        >
          {typeFilterList.map((item) => (
            <>
              {typeFilter == item.value ? (
                <button className="bg-gray-400 border border-gray-400 rounded-md px-5 py-2 text-sm text-gray-100">
                  {item.name}
                </button>
              ) : (
                <button
                  className="bg-gray-900 hover:bg-gray-100 border border-gray-900 hover:border-gray-400 rounded-md px-5 py-2 text-sm text-white hover:text-gray-900 transition-all"
                  onClick={() => {
                    handleTypeFilter(item.value);
                    setFilterDropIsOpen(!filterDropIsOpen);
                  }}
                >
                  {item.name}
                </button>
              )}
            </>
          ))}
        </div>
      </div>
      <div className="m-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-1">
        {posts?.map((item) => {
          return <>{item.id >= 1 ? <Card post={item} /> : <EmptyCard />}</>;
        })}
        <>{isLoading && <Loading />}</>
      </div>
      <div className="mt-5 flex flex-row gap-2 justify-center">
        {firstPostPage ? (
          <button className="bg-gray-400 border border-gray-400 rounded-md px-5 py-2 text-sm text-gray-100">
            anterior
          </button>
        ) : (
          <button
            className="bg-gray-900 hover:bg-gray-100 border border-gray-900 hover:border-gray-400 rounded-md px-5 py-2 text-sm text-white hover:text-gray-900 transition-all"
            onClick={() => {
              handlePages("previous");
            }}
          >
            anterior
          </button>
        )}
        <div className="bg-gray-100 rounded-sm px-3 py-2 text-gray-900">
          {currentPostPage}
        </div>
        {lastPostPage ? (
          <button className="bg-gray-400 border border-gray-400 rounded-md px-5 py-2 text-sm text-white">
            próximo
          </button>
        ) : (
          <button
            className="bg-gray-900 hover:bg-gray-100 border border-gray-900 hover:border-gray-400 rounded-md px-5 py-2 text-sm text-white hover:text-gray-900 transition-all"
            onClick={() => {
              handlePages("next");
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
