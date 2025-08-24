'use client';

import css from "./Modal.module.css"

type Props = {
  children: React.ReactNode;
  close:()=>void;
};

const Modal = ({ children, close }: Props) => {


  return (
    <div className={css.backdrop} >
      <div className={css.modal}>
        {children}
        <button className={css.backBtn} onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
