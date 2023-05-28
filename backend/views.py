from rest_framework.views import APIView
from rest_framework.response import Response
import fitz
import os
from django.conf import settings
import uuid


app_path = settings.BASE_DIR
file_path = os.path.join(app_path, 'landing', 'template.pdf')

def insert_pdf(data):
    # Create 'files' directory if it doesn't exist
    if not os.path.exists('files'):
        os.makedirs('files')

    doc = fitz.open(file_path)
    for obj in data:
        page = doc[obj[3]]
        text = page.insert_text((obj[0]*28, obj[1]*28), str(obj[2]), fontname='notosbi', fontsize=12, rotate=0)

    output_filename = "modified_pdf_" + str(uuid.uuid4()) + ".pdf"
    output_path = os.path.join('files', output_filename)
    doc.save(output_path)
    doc.close()
    return 'https://lct-competition-back.metadoor-invest.com/files/' + output_filename

class CalculationFinancialData(APIView):
    permission_classes = []

    def post(self, request):
        data = request.data

        industry = data['passport']['project_industry']
        organizational_form = data['passport']['organizational_form']
        staff_number = data['costs']['salary']['staff_number']
        location = data['passport']['location']

        total_possible_costs = round(calc_total_possible_costs(data),2)
        capex = round(calc_capex(data), 2)
        materials = round(calc_materials(data), 2)
        salary_costs = round(calc_salary_costs(data), 2)
        payroll_taxes = round(calc_payroll_taxes(data), 2)
        medical_contributions = round(calc_medical_contributions(data), 2)
        pension_contributions = round(calc_pension_contributions(data), 2)
        rent_costs = round(calc_rent_costs(data), 2)
        fixed_costs = round(calc_fixed_costs(data), 2)
        revenue = round(calc_revenue(data), 2)
        business_taxes = round(calc_business_taxes(data), 2)
        staff_costs = round(calc_staff_costs(data), 2)
        staff_num = round(data['costs']['salary']['staff_number'],2)

        finance_data = {
            'total_possible_costs': total_possible_costs,
            'capex': capex,
            'materials': materials,
            'salary_costs': salary_costs,
            'payroll_taxes': payroll_taxes,
            'medical_contributions': medical_contributions,
            'pension_contributions': pension_contributions,
            'rent_costs': rent_costs,
            'fixed_costs': fixed_costs,
            'revenue': revenue,
            'business_taxes': business_taxes,
            'staff_costs': staff_costs,
            'staff_num':staff_num,
        }
        cords = [
            (9, 6.3, industry, 2),
            (9, 8.7, organizational_form, 2),
            (9, 11.3, staff_num, 2),
            (9, 13.6, location, 2),
            (9, 17, total_possible_costs, 2),
            (9, 20.4, salary_costs, 2),
            (9, 22.4, rent_costs, 2),
            (9, 24, business_taxes, 2),
            (9, 25.6, fixed_costs, 2),

            (12, 18, staff_costs, 3),
            (12, 20.2, staff_num, 3),
            (12, 22.4, pension_contributions, 3),
            (12, 24.7, medical_contributions, 3),
        ]
        new_pdf_url = insert_pdf(cords)

        finance_data = {
                        'capex': round(capex,2),
                        'materials': round(materials,2),
                        'salary_costs': round(salary_costs,2),
                        'payroll_taxes': round(payroll_taxes,2),
                        'medical_contributions': round(medical_contributions,2),
                        'pension_contributions': round(pension_contributions,2),
                        'rent_costs': round(rent_costs,2),
                        'fixed_costs': round(fixed_costs,2),
                        'revenue': round(revenue, 2),
                        'business_taxes': round(business_taxes,2),
                        'staff_costs': round(staff_costs,2),
                        'pdf_url': new_pdf_url,
                        }
        return Response(finance_data)



def calc_total_possible_costs(data):
    return (calc_capex(data) 
        + calc_materials(data) 
        + calc_rent_costs(data) 
        + calc_salary_costs(data) 
        + calc_business_taxes(data)
        + calc_payroll_taxes(data) 
        + calc_add_pension_contributions(data) 
        + calc_add_medical_contributions(data)) 

def calc_capex(data):
    equipments = data['equipment']
    realties = data['realty']
    capexs_price = 0
    for equipment in equipments:
        capexs_price +=  equipment['price']

    for realt in realties:
        capexs_price +=  realt['price']

    return capexs_price/1000000

def calc_materials(data):
    revenue = data['sales']
    cost = 0
    infl = revenue['annual_inflation']
    for material in data['costs']['materials']:
        if material['calc_inflation'] == False:
            infl = 0
        for year in range(revenue['sales_duration']):
            cost += (
                    (revenue['sales_volume'] 
                    * (1 + revenue['annual_sales_growth']/100) ** year) 
                    * (material['price'] 
                    * (1 + infl/100) ** year) 
                    * material['number_per_product']
                    )
    return cost/1000000

def calc_salary_costs(data):
    revenue = data['sales']
    salary = data['costs']['salary']
    cost = 0
    inf = data['sales']['annual_inflation'] if salary['calc_inflation'] == True else 0
    for year in range(revenue['sales_duration']):
        cost += salary['staff_number'] * salary['average_salary'] * 12 * (1 + inf /100)**year

    return cost/1000000

def calc_payroll_taxes(data):
    payroll = data['costs']['salary']['average_salary']
    tax = 0
    if payroll*12 >= 1917000:
        tax = ((1032000 + (payroll * 12 - 1917000) * (1+15.1/100)) * (1 + 1))/1000000*data['costs']['salary']['staff_number']
    else:
        tax = payroll*12*data['costs']['salary']['staff_number'] * (1+30/100) * (1 + 1)/1000000
    return tax

def calc_medical_contributions(data):
    taxes = calc_payroll_taxes(data)
    return taxes*5.1/30

def calc_pension_contributions(data):
    taxes = calc_payroll_taxes(data)
    medical_contributions = calc_medical_contributions(data)
    return taxes - medical_contributions

def calc_rent_costs(data):
    renta = data['costs']['rent']
    revenue = data['sales']
    rent = 0
    inf = data['sales']['annual_inflation'] if renta['calc_inflation'] == True else 0
    for year in range(revenue['sales_duration']):
        rent += renta['square'] * renta['meter_price'] * (1 + inf/100)**year
    return rent/1000000

def calc_fixed_costs(data):
    revenue = data['sales']
    cost = 0
    for fixed_cost in data['costs']['fixed_costs']:
        for year in range(revenue['sales_duration']):
            cost += fixed_cost['price'] * 12 * (1 + revenue['annual_inflation']/100)**year
    return cost/1000000

def calc_revenue(data):
    data = data['sales']
    duration = data['sales_duration']
    revenue = 0
    for year in range(data['sales_duration']):
        revenue += (data['sales_volume'] * (1 + data['annual_sales_growth']/100) ** year ) * (data['price'] * (1 + data['annual_inflation']/100) ** year)

    return revenue/1000000

def calc_staff_costs(data):
    return calc_salary_costs(data) + calc_payroll_taxes(data) 

def calc_add_pension_contributions(data):
    return sum([34445 * (1 + data['sales']['annual_inflation']) ** n/1000000 for n in range(data['sales']['sales_duration'])])

def calc_add_medical_contributions(data):
    return sum([8766 * (1 + data['sales']['annual_inflation']) ** n/1000000 for n in range(data['sales']['sales_duration'])])

def calc_business_taxes(data):
    organizational_form = data['passport']['organizational_form']
    tax_type = data['passport']['tax_type']
    revenue = data['sales']
    revenue_value = calc_revenue(data)
    materials_value = calc_materials(data)
    salary_value = calc_salary_costs(data)
    renta = calc_rent_costs(data)
    payroll_taxes = calc_payroll_taxes(data)
    pension_contributions = calc_add_pension_contributions(data)
    medical_contributions = calc_add_medical_contributions(data)

    if tax_type == 'Общий режим':
        if organizational_form == 'Индивидуальный предприниматель':
            return (revenue_value - 
                    materials_value - 
                    salary_value - 
                    renta - 
                    payroll_taxes - 
                    pension_contributions - 
                    medical_contributions) * (1+13/100)
        else: 
            return (revenue_value - materials_value - salary_value - renta - payroll_taxes) * (1+20/100)

    if tax_type == 'УСН-6':
        return max(0, revenue_value * (1+6/100) - pension_contributions - medical_contributions)
    elif tax_type == 'УСН-15':
        return max(revenue_value*(1+1/100),
                (revenue_value - materials_value - salary_value - renta - payroll_taxes - pension_contributions - medical_contributions) * (1+15/100))
    elif tax_type == 'Самозанятый':
        if revenue['clients_type'] == 'Юр. лица':
            return revenue_value * (1+6/100)
        elif revenue['clients_type'] == 'Физ. лица':
            return revenue_value * (1+4/100)

    return 0