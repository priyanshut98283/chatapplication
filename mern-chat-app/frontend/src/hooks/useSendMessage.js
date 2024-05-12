import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { getLLMResponse } from "../../../frontend/llm/llm"; // Import getLLMResponse from your LLM integration file
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            let responseMessage = message; // Default message to be sent

            // Check if recipient is 'BUSY' and generate response using LLM
            // if (selectedConversation?.status === 'BUSY') {
            //     const response = await getLLMResponse(message);
            //     responseMessage = response; // Update message with LLM response
            // }

            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: responseMessage }), // Use the generated response as message
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;
