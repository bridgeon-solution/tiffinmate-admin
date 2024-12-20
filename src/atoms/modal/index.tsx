import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

interface BasicModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const BasicModal: React.FC<BasicModalProps> = ({ open, handleClose, children }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title"  aria-describedby="modal-description">
      <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "50px", backgroundColor: "white", borderRadius: "8px",width:"70%", height:"80%" ,overflow:"auto"}}>
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;
