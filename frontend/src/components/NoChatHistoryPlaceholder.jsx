import { MessageOutlined } from "@ant-design/icons";

const NoConversationPlaceholder = ({name}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8 bg-slate-900">
      {/* Icon */}
      <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 shadow-md">
        <MessageOutlined className="text-cyan-400 text-3xl" />
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-semibold text-slate-100 mb-3">
        Select a conversation {name}
      </h3>

      {/* Description */}
      <p className="text-slate-400 max-w-md text-sm">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;
