import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import About from '../About/About';

function AboutButton() {
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true)
        if (showModal) alert("about modal / modal should be open now");
        console.log("value of showModal:",showModal)
    }
    return (
        <>
            <button id="about-button" onClick={()=>setShowModal(true)}>About this project</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <About />
                </Modal>
            )}
        </>
    );
}

export default AboutButton;