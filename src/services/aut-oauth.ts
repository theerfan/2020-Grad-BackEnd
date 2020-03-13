// import * as axios from 'axios';
import axios from 'axios';
import { InvalidClientIdException } from '../exceptions/oauth/invalid-client-id';
import * as configFile from '../config/config';

const aut = configFile.config.oauth.aut;
const baseURL = aut.baseUrl;
const clientID = aut.clientID;
const clientSecret = aut.clientSecret;

export class AutOauthService {
    clientCode: number;
    axios: any;
    constructor(clientCode: number) {
        this.clientCode = clientCode;
        this.axios = axios.create({
            baseURL,
            timeout: 1000,
            headers: { "Content-Type": "application/json" }
        });
    }

    async getUser() {
        const accessTokenObj = await this.getAccessToken();
        return await this.obtainUser(accessTokenObj.accessToken, accessTokenObj.tokenType);
    }

    async obtainUser(accessToken: any, tokenType: any) {
        let response;
        try {
            response = await this.axios.get('api/oauth/user', { headers: { 'Authorization': `Bearer ${accessToken}` } });
        } catch (e) {
            throw new InvalidClientIdException(e.response);
        }
        return response.data.user;
    }

    async getAccessToken() {
        let response;
        try {
            response = await this.axios.post('/api/oauth/access_token', {
                "client_id": clientID,
                "client_secret": clientSecret,
                "code": this.clientCode
            });
        } catch (e) {
            throw new InvalidClientIdException({ loggableError: e.response });
        }
        return { accessToken: response.data['access_token'], tokenType: response.data.['token_type'] };
    }
}

