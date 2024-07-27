interface ModalProps {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-almond/25 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-{600px}">
          <div className="bg-almond/25 p-2 rounded">Modal</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
