"use client";

import css from "./Modal.module.css";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: Props) => {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
