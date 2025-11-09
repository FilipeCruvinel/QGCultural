import PropTypes from "prop-types";

function Modal(props) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        props.open ? "visible bg-black/25" : "invisible"
      }`}
      onClick={() => props.onClose(false)}
    >
      <div
        className={`mx-5 bg-gray-100 rounded-lg transition-all ${
          props.open ? "scale-100 opacity-100" : "scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gray-800 rounded-t-md px-5 py-2 flex justify-end">
          <button
            className="bg-gray-800 hover:bg-gray-100 rounded-md px-2 text-gray-100 hover:text-gray-800 transition-colors"
            onClick={() => props.onClose(false)}
          >
            X
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Modal;
