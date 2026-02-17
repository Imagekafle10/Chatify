import { Layout, Tabs, Avatar, List, Button } from "antd";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoChatHistoryPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, setSelectedUser } from "../store/slices/chatStoreSlice";
import { useEffect } from "react";
import { getAllContacts, getMyChatPartners } from "../api/chat.api";

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

function ChatPage() {
  const dispatch = useDispatch();
  const { activeTab, selectedUser, chats, allContacts } = useSelector(state => state.chat);

  const contacts = allContacts;
  const { onlineUsers } = useSelector((state) => state.auth);



  
  
  useEffect(() => {
     dispatch(getMyChatPartners()).unwrap();
     dispatch(getAllContacts()).unwrap();

  }, []); // run only once on mount


  return (
    <div className="relative w-full max-w-6xl h-[800px] mx-auto">
      <BorderAnimatedContainer>
        <Layout className="h-full">
          {/* LEFT SIDEBAR */}
          <Sider
            width={300}
            className="bg-slate-800/50 backdrop-blur-sm flex flex-col"
          >
            <ProfileHeader />

<Tabs
  activeKey={activeTab}
  onChange={(key) => dispatch(setActiveTab(key))}
  className="flex-1 overflow-y-auto px-2"
  tabBarStyle={{ color: "white" }} // ✅ this makes all tab labels white
  items={[
    {
      label:<span className="text-slate-200 ">Chats</span>,
      key: "chats",
      children: (
   <List
  dataSource={Array.isArray(chats) ? chats : []}
  renderItem={(chat) => {
    const isOnline = onlineUsers.includes(chat.id.toString());

    return (
      <List.Item
        onClick={() => dispatch(setSelectedUser(chat))}
        className="hover:bg-slate-600 rounded p-2 cursor-pointer"
      >
        <List.Item.Meta
          avatar={
            <div className="relative">
              <Avatar src={chat.profilePic || "/avatar.png"} />

              {/* ✅ Online indicator */}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                  isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
          }
          title={
            <div className="flex items-center justify-between">
              <span className="text-white">{chat.fullName}</span>

              {/* text status */}
              <span
                className={`text-xs ${
                  isOnline ? "text-green-400" : "text-slate-400"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
          }
        />
      </List.Item>
    );
  }}
/>

      ),
    },
    {
      label: <span className="text-slate-200 ">Contacts</span>,
      key: "contacts",
      children: (
         <div className="overflow-y-auto">
      <List
  dataSource={Array.isArray(contacts) ? contacts : []}
  renderItem={(contact) => {
    const isOnline = onlineUsers.includes(contact.id.toString());

    return (
      <List.Item
        onClick={() => dispatch(setSelectedUser(contact))}
        className="hover:bg-slate-700 rounded p-2 cursor-pointer"
      >
        <List.Item.Meta
          avatar={
            <div className="relative">
              <Avatar src={contact.profilePic || "/avatar.png"} />

              {/* ✅ Online indicator */}
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                  isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
          }
          title={
            <span className="text-white">
              {contact.fullName}
            </span>
          }
        />
      </List.Item>
    );
  }}
/>
</div>

      ),
    },
  ]}
/>


          </Sider>

          {/* RIGHT CONTENT */}
          <Content className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
            {selectedUser ? (
              <ChatContainer />
            ) : (
              <NoConversationPlaceholder name={selectedUser?.fullName} />
            )}
          </Content>
        </Layout>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
