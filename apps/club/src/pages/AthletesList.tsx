import React, { useEffect, useState } from 'react';
import { runFlow } from '../utils/runFlow';

interface Athlete {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
}

export default function AthletesList() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  useEffect(() => {
    runFlow('Athletes_List', {}).then(data => setAthletes(data.athletes || []));
  }, []);

  return (
    <main className="p-4 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold">Lista Atleti</h1>
      <ul className="space-y-2">
        {athletes.map(a => (
          <li key={a.id} className="border p-2 rounded">
            {a.first_name} {a.last_name} - {a.position}
          </li>
        ))}
      </ul>
    </main>
  );
}
