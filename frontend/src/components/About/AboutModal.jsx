import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import About from './About';

function AboutModal() {
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true)
        if (showModal) alert("about modal / modal should be open now");
        // console.log("value of showModal:",showModal)
    }
    return (
        <>
            <a id="log-in-button" onClick={()=>setShowModal(true)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C11.4002 0 10.8003 0.227971 10.3084 0.707911L0.710822 10.3067C-0.236941 11.2426 -0.236941 12.7544 0.710822 13.6903L10.3084 23.2891C11.2442 24.237 12.7558 24.237 13.6916 23.2891L23.2892 13.6903C24.2369 12.7544 24.2369 11.2426 23.2892 10.3067L13.6916 0.707911C13.1997 0.227971 12.5999 0 12 0ZM12 5.93926C15.2392 6.07124 16.6428 9.33483 14.7353 11.7705C14.2314 12.3705 13.4276 12.7664 13.0197 13.2823C12.5999 13.7983 12.5999 14.3982 12.5999 14.9981H10.8003C10.8003 13.9783 10.8003 13.1264 11.2202 12.5264C11.6161 11.9265 12.4199 11.5666 12.9238 11.1706C14.3994 9.81477 14.0155 7.90701 12 7.75103C11.0162 7.75103 10.2005 8.55493 10.2005 9.5628H8.4009C8.4009 7.55906 10.0205 5.93926 12 5.93926ZM10.8003 16.198H12.5999V17.9977H10.8003V16.198Z" fill="currentColor"/>
                </svg>
                <span>About</span>
            </a>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <About />
                </Modal>
            )}
        </>
    );
}

export default AboutModal;