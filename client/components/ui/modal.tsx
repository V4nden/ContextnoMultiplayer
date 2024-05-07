import { AnimatePresence, motion } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";
type Props = {
  children: React.ReactNode;
  opened: boolean;
  setOpened: Function;
};

const Modal = (props: Props) => {
  return (
    <AnimatePresence mode="wait">
      {props.opened && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ ease: [0, 1, 0, 1], duration: 0.5 }}
          key={"modal"}
          className="z-30 bg-zinc-950/70 border-l fixed top-0 right-0 xl:w-1/3 lg:w-1/2 sm:w-full h-full backdrop-blur-lg p-8 flex gap-2 flex-col"
        >
          <button
            className="absolute top-0 right-0 p-8"
            onClick={() => {
              props.setOpened();
            }}
          >
            <IoMdCloseCircle fill="#ddd" size={32} />
          </button>
          {props.children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
