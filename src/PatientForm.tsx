import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserFormData, UserDTO } from "./types/CarePortalData";
import FacilityResult from "./FacilityResult";
import { CarePortalService } from "./api/CarePortalService";
import "./PatientForm.css";

const PatientForm = () => {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<UserFormData>({ mode: "onTouched" });
  
    const [response, setResponse] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(false);
    const typeOfCare = watch("type_of_care") as UserFormData["type_of_care"];
  
    const onSubmit = async (data: UserFormData) => {
      setLoading(true);
      setResponse(null);
      try {
        const res = await CarePortalService.matchFacility(data);
        setResponse(res);
      } catch (error) {
        console.error("Error submitting form", error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="patient-form-container">
        {response ? (
          <FacilityResult response={response} onReset={() => setResponse(null)} />
        ) : (
          <div className="patient-form">
            <h2>CarePortal Patient Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Patient Name:</label>
                <input
                  {...register("user_name", { required: "Patient name is required" })}
                />
                {errors.user_name && <p className="error">{errors.user_name.message}</p>}
              </div>
  
              <div>
                <label>Type of Care:</label>
                <select {...register("type_of_care", { required: "Please select a type of care" })}>
                  <option value="">Select Care Type</option>
                  <option value="stationary">Stationary</option>
                  <option value="ambulatory">Ambulatory</option>
                  <option value="day care">Day Care</option>
                </select>
                {errors.type_of_care && <p className="error">{errors.type_of_care.message}</p>}
              </div>
  
              <div>
                <label>Zip Code:</label>
                <input
                  type="number"
                  {...register("zip_code", {
                    required: typeOfCare !== "day care" ? "Zip code is required for non-day-care" : false,
                  })}
                />
                {errors.zip_code && <p className="error">{errors.zip_code.message}</p>}
              </div>
  
              <button className="patient-form-button" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };  

export default PatientForm;
