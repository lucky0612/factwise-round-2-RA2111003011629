import React, { useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails, Typography, TextField,
    Button, MenuItem, Avatar, IconButton, Dialog, DialogActions, DialogTitle,
    Grid, Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../types';

interface CelebrityAccordionProps {
    user: User;
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    users: User[];
}

const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const CelebrityAccordion: React.FC<CelebrityAccordionProps> = ({ user, setUsers, users }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User>({ ...user });
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUser({ ...user });
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        setUsers((prevUsers) => prevUsers.map((u) => (u.id === user.id ? editedUser : u)));
    };

    const handleDeleteClick = () => {
        if (window.confirm(`Are you sure you want to delete ${user.first} ${user.last}?`)) {
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleDeleteConfirm = () => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
        setIsDeleteDialogOpen(false);
    };

    const age = calculateAge(user.dob);
    const isAdult = age >= 18;
    const grayColor = '#808080';

    return (
        <Accordion sx={{ borderRadius: 1, '&:before': { display: 'none' }, boxShadow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Avatar src={user.picture} sx={{ mr: 2 }} />
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>{`${user.first} ${user.last}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {isEditing ? (
                    <Box component="form" noValidate autoComplete="off">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    value={editedUser.age}
                                    onChange={handleChange}
                                    type="number"
                                    error={editedUser.age && editedUser.age < 18}
                                    helperText={editedUser.age && editedUser.age < 18 ? 'Age must be 18 or older' : ''}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Gender"
                                    name="gender"
                                    value={editedUser.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="transgender">Transgender</MenuItem>
                                    <MenuItem value="rather not say">Rather not say</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={editedUser.country}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={editedUser.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={handleCancelClick} sx={{ mr: 1, color: 'red' }}>
                                <HighlightOffRoundedIcon />  {/* Import HighlightOffRoundedIcon  */}
                            </IconButton>
                            <IconButton variant="contained" onClick={handleSaveClick} disabled={!isAdult} sx={{ color: 'green' }}>
                                <CheckCircleIcon />  {/* Import CheckCircleIcon from @mui/icons-material */}
                            </IconButton>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={4}>
                                <Typography variant="body2" color={grayColor}>Age</Typography>
                                {age && <Typography variant="body2">{age}</Typography>}
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body2" color={grayColor}>Gender</Typography>
                                {user.gender && <Typography variant="body2">{user.gender}</Typography>}
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body2" color={grayColor}>Country</Typography>
                                {user.country && <Typography variant="body2">{user.country}</Typography>}
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color={grayColor}>Description</Typography>
                        {user.description && <Typography variant="body2">{user.description}</Typography>}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => setIsDeleteDialogOpen(true)} color="error">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton onClick={handleEditClick} disabled={!isAdult} sx={{ mr: 1 }} style={{ color: "blue" }}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </>
                )}
            </AccordionDetails>
            <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
                <IconButton onClick={() => setIsDeleteDialogOpen(false)}>
                    <CloseIcon sx={{ marginLeft: 'auto' }} />
                </IconButton>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Are you sure you want to delete?</DialogTitle>

                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" style={{ backgroundColor: "white", color: "black" }} onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                        <Button variant="contained" style={{ backgroundColor: "red", color: "white" }} onClick={handleDeleteConfirm} color="error">Delete</Button>
                    </Box>
                </DialogActions>

            </Dialog>
        </Accordion>
    );
};

export default CelebrityAccordion;