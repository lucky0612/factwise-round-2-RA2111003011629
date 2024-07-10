import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CelebrityAccordion from './components/CelebrityAccordion.tsx';
import SearchBar from './components/SearchBar.tsx';
import { User } from './types';
import { usersData } from './users.ts';

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>(usersData);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        `${user.first} ${user.last}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom align="center" style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                Celebrity Management
            </Typography>
            <SearchBar value={searchTerm} onChange={handleSearchChange} />
            {filteredUsers.map((user) => (
                <Box key={user.id} my={2}>
                    <CelebrityAccordion user={user} setUsers={setUsers} users={users} />
                </Box>
            ))}
        </Container>
    );
};

export default App;