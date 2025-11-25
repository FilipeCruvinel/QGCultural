import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../components/Loading.jsx";
import parse from "html-react-parser";

function Text() {
  const [params] = useSearchParams();
  const id = params.get("id");

  const [post, setPost] = useState({
    id: "",
    type: "",
    author: "",
    title: "",
    body: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  function getPost() {
    fetch(`/texts/${id}.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jasonData) => {
        //console.log(jasonData);
        setPost(jasonData);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useQuery("post", () => {
    getPost();
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mx-5 md:mx-20 lg:mx-40 xl:mx-60 bg-white border-x-2 border-gray-800">
        <div className="border-b border-gray-400 p-5">
          <img src={post.image} className="w-5xl rounded-lg" />
          <div className="my-5 text-3xl font-semibold text-gray-800">
            {post.title}
          </div>
          <div className="flex flex-row">
            <div className="me-5 bg-gray-800 rounded-full px-2 py-1 text-sm text-gray-100">
              {post.type}
            </div>
            <p className="mt-1 text-sm text-gray-400">Autor: {post.author}</p>
          </div>
        </div>
        <div className="px-5 pt-10 pb-15">{parse(post.body)}</div>
      </div>
      <>{isLoading && <Loading />}</>
    </div>
  );
}

export default Text;
