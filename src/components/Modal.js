import React, { useRef } from 'react';
import { useSpring, animated} from 'react-spring';

function Modal({ children, showModal, setShowModal }) {
   const modalRef = useRef();

   const closeModel = e => {
      if(e.target === modalRef.current){
         setShowModal(false);
      }
   }

   const modalAnimation = useSpring({
      opacity : showModal ? 1 : 0,
      top: showModal ? '25%' : '0%',
      config : { friction : 12 }
   })

   return (
      showModal &&
      <div className="Modal" ref={modalRef} onClick={closeModel}>
         <animated.div style={modalAnimation} className="container">
            {children}
         </animated.div>
      </div>
   )
}

export default Modal;