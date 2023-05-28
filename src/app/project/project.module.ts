import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalulationValueComponent, CostComponent, CostsMateralsComponent, CostsRentComponent, CostsSalaryComponent, EquipmentComponent, FixedCostsComponent, ParamComponent, PassportComponent, RealtyComponent, SalesComponent, SummaryComponent, TableComponent } from './components';
import { ProjectComponent } from './project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputModule, SelectModule, RadioModule, CheckboxModule, InputHelpModule, LinkModule, ButtonModule, SnackbarModule } from '../shared';
import { SideBarModule } from '../side-bar/side-bar.module';
import { FilterByIndexPipe, ValuesPipe } from '../pipes';
import { MultiselectModule } from '../shared/multiselect/multiselect.module';

@NgModule({
	declarations: [
		ProjectComponent,
		CostComponent,
		EquipmentComponent,
		PassportComponent,
		RealtyComponent,
		SalesComponent,
		TableComponent,
		ValuesPipe,
		FilterByIndexPipe,
		CostsMateralsComponent,
		CostsSalaryComponent,
		CostsRentComponent,
		FixedCostsComponent,
		CalulationValueComponent,
		SummaryComponent,
		ParamComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		InputModule,
		SelectModule,
		MultiselectModule,
		ButtonModule,
		RadioModule,
		CheckboxModule,
		InputHelpModule,
		SideBarModule,
		LinkModule,
		SnackbarModule,
	],
	exports: [
		ProjectComponent,
	]
})
export class ProjectModule { }
