import React from "react";
import PatientForm from "./PatientForm";
import "./IndexPage.css";

const IndexPage = () => {
    return (
        <div className="index-page">
            <h1>CarePortal Beta</h1>
            <PatientForm />
        </div>
    );
};

export default IndexPage;
