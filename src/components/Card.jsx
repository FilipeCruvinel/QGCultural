import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Card(props) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-100 border border-gray-100 hover:border-gray-800 rounded-lg p-4 flex flex-col justify-between"
      onClick={() => {
        navigate(`/text?id=${props.post.id}`);
      }}
    >
      <img src={props.post.image} className="rounded-md" />
      <div className="my-2 text-md font-semibold text-gray-800">
        {props.post.title}
      </div>
      <div className="flex flex-row justify-between">
        <div className="bg-gray-800 rounded-full px-2 py-1 text-xs text-gray-100">
          {props.post.type}
        </div>
        <p className="mt-1 text-sm text-gray-400">Autor: {props.post.author}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    author: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
};

export default Card;
