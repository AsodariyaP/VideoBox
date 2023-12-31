import { User } from './models/user';
import * as path from 'path';

export const PORT = 3000;
export const LOGGED_IN_USER =  new User('xxxxx0', 'Tanaka Shigeru', 'http://localhost:3000/images/tanaka-icon.png');
export const USERS_DB_PATH = path.join(__dirname, '../db/users.json');
export const VIDEOS_DB_PATH = path.join(__dirname, '../db/videos.json');
export const ACTIVITIES_DB_PATH = path.join(__dirname, '../db/videos-reactions.json');