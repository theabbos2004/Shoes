import { Client, Account, Databases } from 'appwrite';
import config from '../config';

export const client = new Client();

client
    .setEndpoint(config.env.apiEndpoint ?? '')
    .setProject(config.env.projectId ?? '')

export const account = new Account(client);
export { ID } from 'appwrite';
export const databases = new Databases(client);
