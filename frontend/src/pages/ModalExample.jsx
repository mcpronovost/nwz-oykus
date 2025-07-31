import { useState } from "react";
import Modal from "@/components/common/Modal";

export default function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("medium");
  const [modalTitle, setModalTitle] = useState("Example Modal");

  const openModal = (size = "medium", title = "Example Modal") => {
    setModalSize(size);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Modal Examples</h2>
      
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={() => openModal("small", "Small Modal")}>
          Small Modal
        </button>
        <button onClick={() => openModal("medium", "Medium Modal")}>
          Medium Modal
        </button>
        <button onClick={() => openModal("large", "Large Modal")}>
          Large Modal
        </button>
        <button onClick={() => openModal("full", "Full Screen Modal")}>
          Full Screen Modal
        </button>
        <button onClick={() => openModal("medium", "")}>
          Modal Without Title
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        size={modalSize}
      >
        <div>
          <p>This is the modal content. You can put anything here!</p>
          <p>Features:</p>
          <ul>
            <li>Click outside to close</li>
            <li>Press Escape to close</li>
            <li>Responsive design</li>
            <li>Customizable size</li>
            <li>Optional title</li>
            <li>Smooth animations</li>
          </ul>
          
          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <button onClick={() => setIsModalOpen(false)}>
              Close Modal
            </button>
            <button onClick={() => alert("Action performed!")}>
              Perform Action
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 