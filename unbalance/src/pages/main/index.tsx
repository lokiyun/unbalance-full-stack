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
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const MESSAGE_SENT = gql`
  subscription messageSent($username: String!) {
    messageSent(username: $username) {
      from
      to
      message
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation ($from: String!, $to: String!, $type: String!, $message: String!) {
    createMessage(
      createMessageInput: {
        from: $from
        to: $to
        type: $type
        message: $message
      }
    ) {
      to
      message
    }
  }
`;

const GET_FRIENDS = gql`
  query GetFriends {
    getFriends {
      username
      email
      avatar
    }
  }
`;

interface User {
  username: string;
  email: string;
  avatar: string;
}

interface ChatMessageType {
  user: User;
  message: string;
  msgTime: string;
}

const Main = () => {
  const [labelSelectedIndex, setlabelSelectedIndex] = useState(1);
  const location: any = useLocation();

  const [username, setUsername] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      setUsername(location.state.username);
    }
  }, []);

  useSubscription(MESSAGE_SENT, {
    shouldResubscribe: true,
    variables: {
      username: username,
    },
    onSubscriptionData: (res: any) => {
      const data = res.subscriptionData.data.messageSent;
      const list: ChatMessageType[] = JSON.parse(
        JSON.stringify(chatMessageList)
      );
      // console.log(data)
      list.push({
        message: data.message,
        user: {
          email: data.from,
          username: data.from,
          avatar:
            data.from === "lq"
              ? "https://s2.loli.net/2022/04/25/lxo36CQntNmSTqU.jpg"
              : "https://s2.loli.net/2022/04/25/de9YhIX5SlNBqTa.jpg",
        },
        msgTime: Date.now().toString(),
      });
      setchatMessageList(list);
    },
  });

  const [chatList] = useState<string[]>(["dasdas", "czxczxdas"]);

  const [chatMessageList, setchatMessageList] = useState<ChatMessageType[]>([]);

  const [userList] = useState<string[]>(["dasdas", "czxczxdas"]);

  const [editor, setEditor] = useState<IDomEditor | null>(null); // 存储 editor 实例
  const [html, setHtml] = useState(""); // 编辑器内容

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const listItemClass = (index: number) => {
    return classNames("main-list-item", {
      selected: labelSelectedIndex === index,
    });
  };

  const handleChangeIndex = (index: number) => {
    setlabelSelectedIndex(index);
  };

  const { data: friendsData } = useQuery(GET_FRIENDS);

  useEffect(() => {
    console.log(friendsData);
  }, [friendsData]);

  const handleSubmit = async () => {
    if (editor && !editor.isEmpty()) {
      const msg = editor.getText();
      const to = username === "zz" ? "lq" : "zz";
      const result = await createMessage({
        variables: { from: username, to, type: "normal", message: msg },
      });
      const list: ChatMessageType[] = JSON.parse(
        JSON.stringify(chatMessageList)
      );
      console.log(result);
      list.push({
        message: msg,
        user: {
          email: username,
          username,
          avatar:
            username === "lq"
              ? "https://s2.loli.net/2022/04/25/lxo36CQntNmSTqU.jpg"
              : "https://s2.loli.net/2022/04/25/de9YhIX5SlNBqTa.jpg",
        },
        msgTime: Date.now().toString(),
      });
      setchatMessageList(list);
      editor.clear();
    }
  };

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      "bold",
      "underline",
      "italic",
      "through",
      "code",
      "sub",
      "sup",
      "clearStyle",
      "color",
      "bgColor",
      "fontSize",
      "fontFamily",
      "indent",
      "delIndent",
      "justifyLeft",
      "justifyRight",
      "justifyCenter",
      "justifyJustify",
      "lineHeight",
      "insertImage",
      "deleteImage",
      "editImage",
      "viewImageLink",
      "imageWidth30",
      "imageWidth50",
      "imageWidth100",
      "divider",
      "insertLink",
      "editLink",
      "unLink",
      "viewLink",
      "codeBlock",
      "blockquote",
      "headerSelect",
      "header1",
      "header2",
      "header3",
      "header4",
      "header5",
      "todo",
      "redo",
      "undo",
      "fullScreen",
      "bulletedList",
      "numberedList",
      "insertTable",
      "deleteTable",
      "insertTableRow",
      "deleteTableRow",
      "insertTableCol",
      "deleteTableCol",
      "tableHeader",
      "tableFullWidth",
      "insertVideo",
      "uploadVideo",
      "uploadImage",
      "codeSelectLang",
      "group-justify",
      "group-more-style",
      "group-indent",
      "group-image",
      "group-video",
    ],
  };

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
              <div className="chat-title">
                {username === "lq" ? "zz" : "lq"}
              </div>
              <div className="chat-content">
                <div className="chat-content-view h-3/5 p-2 overflow-auto">
                  {chatMessageList.map((item, index) => (
                    <div className="text-left flex mb-2" key={index}>
                      <div className="h-8 flex">
                        <img className="h-6 w-6" src={item.user.avatar} />
                      </div>
                      <div className="flex-col">
                        <div className=" ml-2">
                          {item.user.username}{" "}
                          <span className=" text-gray-500 text-sm">
                            {item.msgTime}
                          </span>
                        </div>
                        <div className=" indent-4">{item.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative chat-content-editor h-2/5 p-2 flex flex-col border-gray-600">
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
                    style={{ height: "500px", overflowY: "hidden" }}
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
                <div className="my-item-name">{username}</div>
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
