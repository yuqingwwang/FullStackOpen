import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Patient, Entry } from "../../types";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import HealthRatingBar from "../HealthRatingBar";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const PatientDetailPage = () => {
  const { id } = useParams() as { id: string };
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // Fetch the patient data based on the ID when the component mounts
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await patientService.getOne(id);
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching patient details", error);
      }
    };

    fetchPatient();
  }, [id]);



  if (!patient) {
    return <div>Loading...</div>;
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
      case "Hospital":
        return (
          <div>
            <Typography variant="h6">{entry.date}</Typography>
            <LocalHospitalIcon/>
            <Typography variant="body1">{entry.description}</Typography>
            <Typography variant="body1">Discharge: {entry.discharge.date} {entry.discharge.criteria}</Typography>
          </div>
        );
      case "HealthCheck":
        return (
          <div>
            <Typography variant="h6">{entry.date}</Typography>
            <MedicalInformationIcon/>
            <Typography variant="body1">{entry.description}</Typography>
            <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
            <Typography variant="body1">Diagnose by: {entry.specialist}</Typography>
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <Typography variant="h6">{entry.date}</Typography>
            <BusinessCenterIcon/>
            <Typography variant="body1">{entry.description}</Typography>
            <Typography variant="body1">Employer: {entry.employerName}</Typography>
            <Typography variant="body1">Diagnose by: {entry.specialist}</Typography>
          </div>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <h2>entries</h2>
      {patient.entries.map((entry) => (
      <div key={entry.id}>
        <EntryDetails entry={entry} />

      </div>
      ))}
    </div>
  );
};

export default PatientDetailPage;
