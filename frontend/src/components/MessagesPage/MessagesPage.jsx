import React from 'react'
import NavBarSide from '../NavBarSide/NavBarSide'
import MessagesLeftSideBar from '../MessagesLeftSideBar/MessagesLeftSideBar'
import "./MessagesPage.css"

const MessagesPage = () => {
  return (
      <div className='container messages'> 
            {/* <div>MessagesPage</div> */}
            <NavBarSide />

            <div className="content">
                <MessagesLeftSideBar />
            </div>

      </div>
  )
}

export default MessagesPage