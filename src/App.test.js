// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


// UserList.test.js
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import UserList from './component/axiosDataFetch';
import axios from 'axios';

jest.mock('axios');

test('fetches and displays users', async () => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];

  axios.get.mockResolvedValue({ data: users });

  render(<UserList />);

  // Wait for the API call to finish and component to re-render
  await waitFor(() => {
    users.forEach(user => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
    });
  });
});
