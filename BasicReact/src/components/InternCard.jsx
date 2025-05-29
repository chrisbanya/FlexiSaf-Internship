import React from "react";

const InternCard = ({ name, stage, pathway }) => {
  return (
    <div className="border p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p>Stage: {stage}</p>
      <p>Pathway: {pathway}</p>
    </div>
  );
};

export default InternCard;
