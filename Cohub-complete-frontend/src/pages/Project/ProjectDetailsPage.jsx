import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import getBearerToken from "../../Helper/getBearerToken";
import llmApiService from "../../../apiServices/llm.apiServices";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    getProjectDetails();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat container when chatHistory changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const getProjectDetails = async () => {
    try {
      const data = await llmApiService.getIdealDescription(projectId);
      setProject(data);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const cohubChatBot = async () => {
    try {
      setLoading(true);
      const data = await llmApiService.cohubChatBot(messageInput);
      const botResponse = data;
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { type: "user", content: messageInput },
        { type: "bot", content: botResponse },
      ]);
      setMessageInput("");
      setLoading(false);
    } catch (error) {
      console.error("Error communicating with chat bot", error);
      setLoading(false);
    }
  };

  // Handler for updating input value
  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  // Handler for submitting a message
  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim() !== "") {
      cohubChatBot();
    }
  };

  // Handler for pressing Enter key in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">Project Details</h1>
        </div>
      </header>
      {/* Main content */}
      <main className="flex-grow flex">
        <div className="flex-grow max-w-4xl mx-auto px-4 py-8">
          <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{project.name}</div>
              <div className="text-gray-400 text-sm mb-3">Project Type: {project.type}</div>
              <div className="text-gray-400 text-sm mb-2">Start Date: {new Date(project.startedAt).toLocaleDateString()}</div>
              <p className="text-gray-400 text-sm mb-2 font-bold">Ideal Description:</p>
              <p className="text-gray-400 ">{project.llm_description}</p>
            </div>
          </div>
        </div>
        {/* Chat Screen */}
        <div className="flex-none w-2/5 bg-gray-800 px-4">
          <p className="mx-auto text-center">Ask Me Here</p>
          <div ref={chatContainerRef} className="h-96 border overflow-y-scroll">
            {chatHistory.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="text-sm font-semibold text-gray-300 mb-1">{message.type === 'user' && <p>Your Question:</p>}</div>
                <div className="text-sm font-semibold text-gray-300 mb-1">{message.type === 'bot' && <p>Answer:</p>}</div>
                <div className="bg-gray-700 rounded-lg px-4 py-2 text-sm">{message.content}</div>
              </div>
            ))}
          </div>
          {/* Loader */}
          {loading && <div className="text-center mt-2">Loading...</div>}
          {/* Message Input */}
          <div className="mt-10 flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your message..."
              className="w-full border border-gray-600 rounded-md px-3 py-2 outline-none bg-gray-700 text-gray-300"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
