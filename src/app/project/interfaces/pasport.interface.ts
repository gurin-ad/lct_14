import { IOption } from ".";

export interface IPassport {
	project_name: string;
	initiator_name: string;
	organizational_form: string;
	project_industry: string;
	segments: string[];
	tax_type: string;
	location: string;
}