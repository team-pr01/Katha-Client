/* eslint-disable @typescript-eslint/no-explicit-any */
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  width?: string;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
};

const Modal: React.FC<TModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  children,
  width = "w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%]",
  closeOnBackdropClick = true,
  closeOnEsc = true,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    // Prevent body scroll when modal is open
    if (isModalOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isModalOpen, closeOnEsc, setIsModalOpen]);

  // Animation variants for slide from bottom to center
  const backdropVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const modalVariants: any = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 250,
        duration: 0.4,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 250,
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-1000 bg-black/60 h-full backdrop-blur-sm flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => closeOnBackdropClick && setIsModalOpen(false)}
        >
          <motion.div
            className={`${width} h-fit max-h-[85vh] overflow-y-auto bg-white rounded-lg shadow-2xl relative`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <RxCross1 className="text-lg cursor-pointer text-gray-500 hover:text-gray-700" />
            </button>

            <div className="p-4 md:p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
