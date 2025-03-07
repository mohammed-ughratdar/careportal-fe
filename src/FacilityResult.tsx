import { UserDTO, FacilityDTO } from "./types/CarePortalData";
import "./FacilityResult.css";

const FacilityResult = ({ response, onReset }: { response: UserDTO; onReset: () => void }) => {
  return (
    <div className="facility-result">
      <h3>{response.message}</h3>
      {response.facility ? (
        <FacilityDetails facility={response.facility} />
      ) : (
        <p>No facility available.</p>
      )}
      <button onClick={onReset}>Start Over</button>
    </div>
  );
};

const FacilityDetails = ({ facility }: { facility: FacilityDTO }) => (
  <div>
    <p>Facility Name: {facility.facility_name}</p>
    <p>Facility Zip Code: {facility.facility_zip_code}</p>
    <p>Serves Zip Codes: {facility.zip_code_start} - {facility.zip_code_end}</p>
  </div>
);

export default FacilityResult;
