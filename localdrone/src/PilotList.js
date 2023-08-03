import React from 'react';

const PilotList = () => {
  // Sample list of pilots (you can replace this with actual data from an API or a backend)
  const pilots = [
    { id: 1, name: 'John Doe', experience: '3 years', location: 'New York' },
    { id: 2, name: 'Jane Smith', experience: '5 years', location: 'Los Angeles' },
    { id: 3, name: 'Michael Johnson', experience: '2 years', location: 'Chicago' },
    // Add more pilots as needed
  ];

  return (
    <div>
      <h2>List of Available Drone Pilots</h2>
      <ul>
        {pilots.map((pilot) => (
          <li key={pilot.id}>
            <strong>{pilot.name}</strong> - {pilot.experience} of experience - {pilot.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PilotList;
