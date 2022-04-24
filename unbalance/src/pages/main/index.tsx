import React, { useEffect, useState } from "react";
import {
  CloseSmall,
  GameTwo,
  PersonalCollection,
  Plus,
  Search,
} from "@icon-park/react";
import "./style.scss";
import classNames from "classnames";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig } from "@wangeditor/editor";
import { gql, useSubscription } from "@apollo/client";

const MESSAGE_SENT = gql`
  subscription {
    messageSent(username: "zz") {
      from
      to
      message
    }
  }
`


const Main = () => {
  const [labelSelectedIndex, setlabelSelectedIndex] = useState(1);

  const { error } =useSubscription(MESSAGE_SENT, {
    shouldResubscribe: true
  })

  useEffect(() => {
    console.log(error)
  })

  const [chatList] = useState<string[]>(["dasdas", "czxczxdas"]);

  const [userList] = useState<string[]>(["dasdas", "czxczxdas"]);

  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [html, setHtml] = useState(""); // 编辑器内容

  const listItemClass = (index: number) => {
    return classNames("main-list-item", {
      selected: labelSelectedIndex === index,
    });
  };

  const handleChangeIndex = (index: number) => {
    setlabelSelectedIndex(index);
  };

  const handleSubmit = () => {};


  const toolbarConfig = {};
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="w-full h-full main-bg flex">
      <aside className="w-60 h-full bg-gray-900">
        <header className="main-search">
          <Search theme="outline" size="24" fill="#b9bbbe" />
          <input type={"text"} placeholder="搜索" />
        </header>
        <ul className="w-full main-list mt-4">
          <li className={listItemClass(0)} onClick={() => handleChangeIndex(0)}>
            <PersonalCollection theme="outline" size="24" fill="#b9bbbe" />
            <span className="label">好友</span>
          </li>
          <li className={listItemClass(1)} onClick={() => handleChangeIndex(1)}>
            <GameTwo theme="outline" size="24" fill="#b9bbbe" />
            <span className="label">群组</span>
          </li>
          <div className="mt-4 mb-4 flex justify-between">
            <span className=" indent-4">聊天列表</span>
            <Plus
              className="cursor-pointer"
              theme="outline"
              size="24"
              fill="#b9bbbe"
            />
          </div>
          {chatList.map((item, index) => (
            <li
              key={item}
              className={listItemClass(index + 2)}
              onClick={() => handleChangeIndex(index + 2)}
            >
              <span className="label">{item}</span>
              <CloseSmall
                className="chat-close"
                theme="outline"
                size="24"
                fill="#333"
              />
            </li>
          ))}
        </ul>
      </aside>
      <main className="h-full flex">
        <div className="relative chat-container">
          <div className="grid grid-cols-1 grid-rows-1 h-full w-full">
            <div className="chat-wrapper">
              <div className="chat-title">sb是不</div>
              <div className="chat-content">
                <div className="chat-content-view h-3/5"></div>
                <div className="relative chat-content-editor h-2/5 p-2 flex flex-col border-gray-600">
                  {/* <div className="chat-menu flex">
                    <div className="chat-menu-item hover:bg-gray-400 w-8 h-8 flex justify-center items-center cursor-pointer">
                      <SlightlySmilingFace
                        theme="outline"
                        size="24"
                        fill="#ddd"
                      />
                    </div>
                    <div className="chat-menu-item hover:bg-gray-400 w-8 h-8 flex justify-center items-center cursor-pointer">
                      <Picture theme="outline" size="24" fill="#ddd" />
                    </div>
                  </div> */}
                  <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: "1px solid #ccc" }}
                  />
                  <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={(editor) => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: "500px", "overflowY": "hidden" }}
                  />
                  {/* 编辑器 */}
                  <div className="absolute bottom-2 right-2">
                    <button
                      onClick={() => handleSubmit()}
                      className="px-8 py-2 bg-teal-400 text-white hover:bg-teal-600"
                    >
                      发送
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="blank-bg absolute top-0 left-0 w-full h-full"></div>
        </div>
        <aside className="w-60 bg-gray-900">
          <ul>
            <li className="my-item">
              <div className="my-item-avatar"></div>
              <div className="my-item-content">
                <div className="my-item-name">lucciyun</div>
                <div className="my-item-online">
                  <div className="online-dot">● 在线</div>
                </div>
              </div>
            </li>
            <div className="my-friends">我的好友</div>
            {userList.map((item) => (
              <li className="my-friend" key={item}>
                <div className="friend-item-avatar"></div>
                <div className="friend-item-content">
                  <div className="friend-item-name">{item}</div>
                  <div className="friend-item-online">
                    <div className="offline-dot">● 在线</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default Main;
