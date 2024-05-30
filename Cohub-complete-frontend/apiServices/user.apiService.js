import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '../firebase-config/firebase-init';
import getBearerToken from '../src/Helper/getBearerToken';
import axios from 'axios';

class UserApiService {
    constructor() {
        this.api = String(import.meta.env.VITE_APP_BACKEND_USER_API);
        this.auth = getAuth(app);
    }
    
    async userLogin() {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(this.auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const idToken = await result.user.getIdToken();
            sessionStorage.setItem('idToken', idToken);
            console.log(idToken);
            return true; // Indicate success
        } catch (error) {
            console.error(error);
            throw error; // Throw the error for the caller to handle
        }
    }
    
    async userRegistration(data){
        try {
            const bearerToken=getBearerToken();
            // console.log(data);
            console.log(data.address)
            const response=await axios.post(`${this.api}/userRegistration`,data,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            });
            return true;
        } catch (error) {
            console.error("Error in signing up",error);
            return false;
        }
    }
    async getUserInfo(){
        try {
            const bearerToken=getBearerToken();
            const response=await axios.get(`${this.api}/getUserInfo`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error in signing up",error);
        }
    }

    async fetchProjects(){
        try {
            const bearerToken=getBearerToken();
            const response=await axios.get(`${this.api}/getOwnProjects`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching projects:',error);
        }
    }

    async fetchBookedProducts(){
        try {
            const bearerToken=getBearerToken();
            const response=await axios.get(`${this.api}/getBookedProducts`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            })
            return response.data;
        } catch (error) {
            console.error('Error fetching products:',error);
        }
    }

    async fetchMyProducts(){
        try {
            const bearerToken=getBearerToken();
            const response=await axios.get(`${this.api}/getOwnAvailableProduct`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            })
            return response.data;
        } catch (error) {
            console.error('Error fetching my products:',error);
        }
    }

    async fetchMyRentedProducts(){
        try {
            const bearerToken = getBearerToken();
            const response = await axios.get(`${this.api}/getRentedProducts`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            })
            return response.data;
        } catch (error) {
            console.log('Error fetching my rented products:', error);
        }
    }

    async fetchAllProducts(){
        try {
            const bearerToken=getBearerToken();
            console.log(bearerToken);
            const response=await axios.get(`${this.api}/getAllProduct`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching all products:",error);
        }
    }

    async getBookingPaymentSummary(){
        try {
            const bearerToken=getBearerToken();
            const response=await axios.get(`${this.api}/bookingPayment`,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error getting booking payment summary.",error);
        }
    }

    async getOrderPaymentSummary(id,data){
        try{
            const bearerToken=getBearerToken();
            const response=await axios.post(`${this.api}/getBuyOrderSummary/${id}`,data,{
                headers:{
                    'Authorization':`Bearer ${bearerToken}`
                }
            });
            return response.data;
        }catch(error){
            console.error('Error getting order payment summary.',error);
        }
    }

}

const userApiService = new UserApiService();
export default userApiService;
