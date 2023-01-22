import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import About from './About';

function AboutModal() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    () => setShowModal(true)
    alert("index / modal should be open now")
  }

  return (
    <>
      <button onClick={handleClick}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <About />
        </Modal>
      )}
    </>
  );
}

export default AboutModal;