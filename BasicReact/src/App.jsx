import React, { useState, useEffect } from "react";
import InternCard from "./components/InternCard";
import Filter from "./components/Filter";
import { interns as internData } from "./data/interns";

const App = () => {
  const [interns, setInterns] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
   
    setTimeout(() => {
      setInterns(internData);
    }, 500);
  }, []);

  const filteredInterns = interns.filter((intern) =>
    intern.pathway.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Intern Directory</h1>
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      <div className="grid gap-4">
        {filteredInterns.map((intern) => (
          <InternCard key={intern.id} {...intern} />
        ))}
      </div>
    </div>
  );
};

export default App;
