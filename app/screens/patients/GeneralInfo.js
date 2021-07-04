import React from 'react';

import PatientInfo from '../../components/PatientInfo';

const GeneralInfo = ({patient}) => {
  return (
    <>
      <PatientInfo title="First Name:" value={patient?.firstName} />
      <PatientInfo title="Last Name:" value={patient?.lastName} />
      <PatientInfo title="Birth Date:" value={patient?.birthDate} />
      <PatientInfo title="Email:" value={patient?.email} />
      <PatientInfo title="ID No.:" value={patient?.idNo} />
      <PatientInfo title="Marital Status:" value={patient?.maritalStatus} />
      <PatientInfo title="Phone No." value={patient?.phoneNumber1} />
      <PatientInfo title="Mobile No.:" value={patient?.phoneNumber2} />
      <PatientInfo
        title="Relationship:"
        value={patient?.relationshipWithUser}
      />
      <PatientInfo title="Address:" value={patient?.address} />
      <PatientInfo title="Age:" value={patient?.age} />
      <PatientInfo title="Height:" value={patient?.height} />
      <PatientInfo title="Wight:" value={patient?.weight} />
      <PatientInfo title="Blood Type:" value={patient?.bloodType} />
    </>
  );
};

export default GeneralInfo;
