import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const GET_TRIPS = gql`
  query trips {
    trips {
      _id
      start
      end
      miles
      date
    }
  }
`;

const ADD_TRIP = gql`
  mutation addTrip($start: String!, $end: String!, $miles: Float!, $date: String!) {
    addTrip(start: $start, end: $end, miles: $miles, date: $date) {
      _id
    }
  }
`;

const DELETE_TRIP = gql`
  mutation deleteTrip($id: ID!) {
    deleteTrip(id: $id) {
      _id
    }
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, refetch } = useQuery(GET_TRIPS);
  const [addTrip] = useMutation(ADD_TRIP);
  const [deleteTrip] = useMutation(DELETE_TRIP);
  const [tripForm, setTripForm] = useState({ start: '', end: '', miles: '', date: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTrip({
        variables: {
          start: tripForm.start,
          end: tripForm.end,
          miles: parseFloat(tripForm.miles),
          date: tripForm.date,
        },
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTrip({ variables: { id } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Your Trips</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Start" onChange={e => setTripForm({ ...tripForm, start: e.target.value })} />
        <input type="text" placeholder="End" onChange={e => setTripForm({ ...tripForm, end: e.target.value })} />
        <input type="number" placeholder="Miles" onChange={e => setTripForm({ ...tripForm, miles: e.target.value })} />
        <input type="date" onChange={e => setTripForm({ ...tripForm, date: e.target.value })} />
        <button type="submit">Add Trip</button>
      </form>
      <ul>
        {data?.trips.map(trip => (
          <li key={trip._id}>
            {trip.start} → {trip.end} ({trip.miles} mi on {trip.date})
            <button onClick={() => handleDelete(trip._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;