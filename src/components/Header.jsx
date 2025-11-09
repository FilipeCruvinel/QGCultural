import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal.jsx";
import AboutModal from "./AboutModal.jsx";
import LogoImage from "../assets/QGCulturalLogo.webp";

function Header() {
  const navigate = useNavigate();

  const [aboutModal, setAboutModal] = useState(false);

  return (
    <div className="sticky top-0 bg-gray-800 px-5 py-3 flex flex-row justify-between">
      <img
        src={LogoImage}
        className="h-10 w-20 hover:w-40 object-cover object-left transition-all"
        onClick={() => {
          navigate("/");
        }}
      />
      <button
        className="my-1 hover:bg-gray-100 rounded-sm px-2 py-1 text-gray-100 hover:text-gray-800 transition-colors"
        onClick={() => setAboutModal(true)}
      >
        Sobre
      </button>
      <Modal open={aboutModal} onClose={setAboutModal}>
        <AboutModal />
      </Modal>
    </div>
  );
}

export default Header;
