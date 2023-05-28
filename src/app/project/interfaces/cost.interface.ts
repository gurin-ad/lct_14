import { IOption } from ".";

export interface IMaterials {
	name: string;
	number_per_product: number;
	price: number;
	calc_inflation: boolean
}

export interface ISalary {
	staff_number: number;
	average_salary: number;
	calc_inflation: boolean
}

export interface IRent {
	square: number;
	meter_price: number;
	calc_inflation: boolean
}

export interface IFixedCosts {
	name: string;
	price: number;
	expenses: string[];
	calc_inflation: boolean
}


export interface ICosts {
	materials: IMaterials[];
	salary: ISalary;
	rent: IRent;
	fixed_costs: IFixedCosts[]
}