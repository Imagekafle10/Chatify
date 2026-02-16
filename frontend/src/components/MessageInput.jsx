import { useRef, useState } from "react";
import { Input, Button, Upload, Tooltip } from "antd";
import { UploadOutlined, SendOutlined, CloseOutlined } from "@ant-design/icons";
import useKeyboardSound from "../hooks/useKeyboardSound";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const { TextArea } = Input;

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const { sendMessage, isSoundEnabled } = useSelector(state=>state.chat)

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({ text: text.trim(), image: imagePreview });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <Tooltip title="Remove image">
              <Button
                type="text"
                shape="circle"
                icon={<CloseOutlined />}
                size="small"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-slate-800 hover:bg-slate-700 text-white"
              />
            </Tooltip>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-auto flex items-center gap-2"
      >
        <TextArea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (isSoundEnabled) playRandomKeyStrokeSound();
          }}
          placeholder="Type your message..."
          autoSize={{ minRows: 1, maxRows: 4 }}
          className="flex-1 bg-slate-800/50 text-white border border-slate-700 rounded-lg px-3 py-2 resize-none"
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <Tooltip title="Attach image">
          <Button
            icon={<UploadOutlined />}
            type="text"
            onClick={() => fileInputRef.current?.click()}
            className={`text-slate-400 hover:text-white ${
              imagePreview ? "text-cyan-500" : ""
            }`}
          />
        </Tooltip>

        <Tooltip title="Send message">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!text.trim() && !imagePreview}
            icon={<SendOutlined />}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
          />
        </Tooltip>
      </form>
    </div>
  );
}

export default MessageInput;
