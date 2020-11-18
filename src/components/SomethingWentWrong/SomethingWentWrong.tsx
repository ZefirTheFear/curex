import React, { useEffect } from "react";
import { createPortal } from "react-dom";

import "./SomethingWentWrong.scss";

interface ISWWProps {
  Img: React.FC;
  msg: string;
  closeSWWModal: () => void;
}

const SomethingWentWrong: React.FC<ISWWProps> = ({ Img, msg, closeSWWModal }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="something-went-wrong">
      <div className="something-went-wrong__img">
        <Img />
      </div>
      <div className="something-went-wrong__msg">{msg}</div>
      <div className="something-went-wrong__btn-group">
        <button onClick={closeSWWModal}>Ok</button>
      </div>
    </div>,
    document.body
  );
};

export default SomethingWentWrong;
