import React from 'react';
import { User } from '../types';

interface CelebrityDetailsProps {
    user: User;
}

const CelebrityDetails: React.FC<CelebrityDetailsProps> = ({ user }) => {
    return (
        <div>
            <h2>{`${user.first} ${user.last}`}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>Description:</strong> {user.description}</p>
        </div>
    );
};

export default CelebrityDetails;