import getBearerToken from '../src/Helper/getBearerToken';
import axios from 'axios';

class LlmApiService {
    constructor() {
        this.api = String(import.meta.env.VITE_APP_BACKEND_USER_API);
    }

    async getIdealDescription(projectId) {
        try {
            const bearerToken = getBearerToken();
            const response = await axios.get(
                `http://127.0.0.1:3000/getProjectDetails/${projectId}`,
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    }

    async cohubChatBot(prompt) {
        try {
            const response = await axios.post(
                `http://127.0.0.1:3000/cohubChatBot`,
                { prompt }
            );
            return response.data; 
        } catch (error) {
            console.error("Error communicating with chatbot:", error);
        }
    }
}

const llmApiService = new LlmApiService();
export default llmApiService;