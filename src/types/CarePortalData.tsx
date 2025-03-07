export interface UserFormData {
	user_name: string;
	type_of_care: "stationary" | "ambulatory" | "day care";
	zip_code?: number;
  }
  
  export interface FacilityDTO {
	facility_name: string;
	zip_code_start: number;
	zip_code_end: number;
	facility_zip_code: number;
  }
  
  export interface UserDTO {
	message: string;
	facility?: FacilityDTO | null;
  }
  