import emptyCardImage from "/images/0.webp";

function EmptyCard() {
  return (
    <div className="bg-gray-100 border border-gray-100 rounded-lg p-4 flex flex-col justify-between">
      <img src={emptyCardImage} />
      <div className="my-2 text-sm font-semibold text-gray-100">Title</div>
      <div className="flex flex-row justify-between">
        <div className="bg-gray-100 border px-2 py-1 text-xs text-gray-100">
          Type
        </div>
        <p className="mt-1 text-sm text-gray-100">Autor: Author</p>
      </div>
    </div>
  );
}

export default EmptyCard;
