import React, { useState } from 'react'
import {CloseSmall, GameTwo, PersonalCollection, Plus, Search} from '@icon-park/react';
import './style.scss'
import classNames from 'classnames';

const Main = () => {
  const [labelSelectedIndex, setlabelSelectedIndex] = useState(1)

  const [chatList, setchatList] = useState<string[]>(['dasdas', 'czxczxdas'])

  const [userList, setuserList] = useState<string[]>(['dasdas', 'czxczxdas'])

  const listItemClass = (index: number) => {
    return classNames("main-list-item", {
      "selected": labelSelectedIndex === index
    })
  }

  const handleChangeIndex = (index: number) => {
    setlabelSelectedIndex(index)
  }

  return (
    <div className='w-full h-full main-bg flex'>
      <aside className='w-60 h-full bg-gray-900'>
        <header className='main-search'>
          <Search theme="outline" size="24" fill="#b9bbbe"/>
          <input type={"text"} placeholder="搜索" />
        </header>
        <ul className='w-full main-list mt-4'>
          <li className={listItemClass(0)} onClick={() => handleChangeIndex(0)}>
            <PersonalCollection theme="outline" size="24" fill="#b9bbbe"/><span className='label'>好友</span>
          </li>
          <li className={listItemClass(1)} onClick={() => handleChangeIndex(1)}>
            <GameTwo theme="outline" size="24" fill="#b9bbbe"/><span className='label'>群组</span>
          </li>
          <div className='mt-4 mb-4 flex justify-between'>
            <span>聊天列表</span><Plus className='cursor-pointer' theme="outline" size="24" fill="#b9bbbe"/>
          </div>
          {
            chatList.map((item, index) => (
              <li key={item} className={listItemClass(index + 2)} onClick={() => handleChangeIndex(index + 2)}>
                <span className='label'>{item}</span><CloseSmall className='chat-close' theme="outline" size="24" fill="#333"/>
              </li>
            ))
          }
        </ul>
      </aside>
      <main className='h-full flex'>
        <div className='blank-bg'></div>
        <aside className='w-60 bg-gray-900'>
          <ul>
            {
              userList.map(item => (
                <li key={item}>{item}</li>
              ))
            }
          </ul>
        </aside>
      </main>
    </div>
  )
}

export default Main