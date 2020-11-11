export interface IDHProjectInterface{
    project_code?:number;
    project_name?:string;
    investment_amount?:number;
    start_date?: Date;
    ending_date?: Date;
    state?: boolean;
    image?: string;
    pathImage?: string;
    percent_completion?: number;
    institute_code?: number;
}