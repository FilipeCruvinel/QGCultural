import { AiOutlineLoading } from "react-icons/ai";

function Loading() {
  return (
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center">
      <AiOutlineLoading className="bg-gray-100 text-5xl text-gray-900 animate-spin" />
    </div>
  );
}

export default Loading;
