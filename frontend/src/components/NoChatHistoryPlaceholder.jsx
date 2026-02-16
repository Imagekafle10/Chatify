import { MessageOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

const NoChatHistoryPlaceholder = ({ name }) => {
  const suggestedMessages = ["👋 Say Hello", "🤝 How are you?", "📅 Meet up soon?"];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 rounded-full flex items-center justify-center mb-5">
        <MessageOutlined className="text-cyan-400 text-2xl" />
      </div>

      {/* Heading */}
      <h3 className="text-lg font-medium text-slate-200 mb-3">
        Start your conversation with {name}
      </h3>

      {/* Description + divider */}
      <div className="flex flex-col space-y-3 max-w-md mb-5">
        <p className="text-slate-400 text-sm">
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mx-auto"></div>
      </div>

      {/* Suggested buttons */}
      <Space wrap size="small">
        {suggestedMessages.map((msg, idx) => (
          <Button
            key={idx}
            type="text"
            className="text-cyan-400 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20 transition-colors px-4 py-2 text-xs"
          >
            {msg}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
