import axios from "axios";
import { UserFormData, UserDTO } from "../types/CarePortalData";

export class CarePortalService {
  private static BASE_URL = "http://13.60.23.51:8000/api/v1";

  public static async matchFacility(formData: UserFormData): Promise<UserDTO> {
    try {
      const response = await axios.post<UserDTO>(`${this.BASE_URL}/match-facility`, {
        user_name: formData.user_name,
        type_of_care: formData.type_of_care,
        user_zip_code: formData.zip_code,
      });

      return response.data;
    } catch (error) {
      console.error("Error matching facility:", error);
      return { message: "Failed to match a facility", facility: null };
    }
  }
}
