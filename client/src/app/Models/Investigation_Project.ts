export interface InvestigationInterface{
    investigation_code?: number;
    research_name?: string;
    research_topic?: string;
    description?: string;
    investment_amount?: number;
    start_date?: Date;
    ending_date?: Date;
    state?: boolean;
    image?: string;
    pathImage?: string;
    number_activities?: number;
    percent_completion?: number;
    interinstitutional_agreement?: string;
    institute_code?: number;
    investigatorCode?: number;
}