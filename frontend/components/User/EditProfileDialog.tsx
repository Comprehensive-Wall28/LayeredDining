import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Alert,
    Box
} from '@mui/material';
import { authService } from '../../services/authService';

interface EditProfileDialogProps {
    open: boolean;
    onClose: () => void;
    user: any;
    onUpdateSuccess: (updatedUser: any) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ open, onClose, user, onUpdateSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPassword(''); // Don't pre-fill password
            setError('');
        }
    }, [user, open]);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const updateData: any = { name, email };
            if (password) {
                updateData.password = password;
            }

            const result = await authService.updateProfile(updateData);

            // Result structure based on controller: { status: 'success', user: ... }
            if (result.user) {
                onUpdateSuccess(result.user);
            } else {
                // Fallback if structure is different
                onUpdateSuccess({ ...user, ...updateData });
            }
            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent sx={{ minWidth: 400 }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="New Password (optional)"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText="Leave blank to keep current password"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileDialog;
