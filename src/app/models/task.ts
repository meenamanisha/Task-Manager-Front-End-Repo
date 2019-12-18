import { taskStatus } from './TaskStatus';

export class task
{
    tId:number;
	tName:string;
	tOwner:string;
	tStatus:taskStatus;
	tExpEff:number;
	tActEff:number;
	tAllDate:Date;
	tCompDate:Date;
}