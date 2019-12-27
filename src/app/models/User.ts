import { role } from './role';
import { task } from './task';

export class user {
	usrId: number;
	usrName: string;
	usrEmail: string;
	usrPhno: string;
	password: string;
	usrMId: number;
	role: role;
	usrCurrentAdd: string;
	usrPermanentAdd: string;
	usrProfileImage: string;
	usrMName: String;
	usrMEmail: String;
	tasks:task[] = [];
	pendingTask:number;
}