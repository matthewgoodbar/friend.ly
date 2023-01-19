import React from 'react'
import NavBarSide from '../NavBarSide/NavBarSide'
import MessagesLeftSideBar from '../MessagesLeftSideBar/MessagesLeftSideBar'
import ChatBox from '../ChatBox/ChatBox'
import MessagesRightSideBar from '../MessagesRightSideBar/MessagesRightSideBar'
import YelpDataItems from '../YelpFetchData/YelpDataItems'
import "./MessagesPage.css"

const MessagesPage = () => {
  return (
      <div className='container messages'> 
            {/* <div>MessagesPage</div> */}
            <NavBarSide />

            <div className="content">
                <MessagesLeftSideBar />
                <ChatBox />
                {/* <MessagesRightSideBar /> */}
                <YelpDataItems/>
            </div>

      </div>
  )
}

export default MessagesPage