import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react-lite";
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
          className="z-30 bg-zinc-950/70 border-l fixed top-0 right-0 w-1/3 h-full backdrop-blur-lg p-8 flex gap-2 flex-col"
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
