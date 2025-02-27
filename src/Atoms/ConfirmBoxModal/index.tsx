import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}


const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box sx={{position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,}}>
        <Typography id="logout-modal-title" variant="h6" component="h2">
          Confirm Logout
        </Typography>
        <Typography id="logout-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to log out?
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" sx={{backgroundColor:"#e6852c"}} onClick={onConfirm}>
            Yes
          </Button>
          <Button variant="outlined" sx={{color:"#e6852c"}} onClick={onClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
