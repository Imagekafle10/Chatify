import { useRef, useState } from "react";
import { Input, Button, Upload, Tooltip } from "antd";
import { UploadOutlined, SendOutlined, CloseOutlined } from "@ant-design/icons";
import useKeyboardSound from "../hooks/useKeyboardSound";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../api/chat.api";

const { TextArea } = Input;

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const {  isSoundEnabled } = useSelector(state=>state.chat)

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
const dispatch  = useDispatch();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

  const formData = new FormData();
    formData.append("text", text.trim());
    if (selectedFile) formData.append("photo", selectedFile);

    dispatch(sendMessage(formData)); // send FormData
    

    setText("");
    setImagePreview(null);
     setSelectedFile(null);
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
        setSelectedFile(file);
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
  style={{
    backgroundColor: "rgba(15, 23, 42, 0.8)", // darker slate
    color: "#ffffff",
    border: "1px solid #334155", // slate-700
    borderRadius: "10px",
    padding: "8px 12px",
  }}
  className="
    flex-1
    resize-none
    placeholder:text-slate-400
    focus:!bg-slate-900
    focus:!border-cyan-500
    focus:!shadow-none
  "
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
          style={{color:"white", fontSize:"20px"}}
            icon={<UploadOutlined />}
            type="text"
            onClick={() => fileInputRef.current?.click()}
            className={`text-white bg-white hover:text-white ${
              imagePreview ? "text-cyan-500" : ""
            }`}
          />
        </Tooltip>

        <Tooltip title="Send message">
          <Button
          style={{color:"white", fontSize:"20px"}}
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
