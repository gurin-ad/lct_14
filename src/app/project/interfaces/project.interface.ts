import { ICosts, IEquipment, IPassport, IRealty, ISales } from ".";


export interface IProject {
	passport?: IPassport;
	equipment?: IEquipment[];
	realty?: IRealty[];
	sales?: ISales;
	costs?: ICosts;

}

