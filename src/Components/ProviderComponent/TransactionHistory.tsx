import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Transaction } from "./type";

interface TransactionProps {
  toggleDrawer: (open: boolean) => void;
  open: boolean;
  transactions: Transaction[];
  loading: boolean;
}

function TransactionHistory({
  toggleDrawer,
  open,
  transactions,
  loading,
}: TransactionProps) {
  const DrawerList = (
    <Box sx={{ width: 300, padding: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Transaction History
      </Typography>
      <Divider />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      ) : transactions.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: "gray", marginY: 2 }}
        >
          No transactions found
        </Typography>
      ) : (
        <List>
          {transactions.map((transaction) => (
            <ListItem
              key={transaction.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {transaction.user_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: transaction.is_paid ? "green" : "red",
                  }}
                >
                  {transaction.is_paid ? "Paid" : "Unpaid"}
                </Typography>
              </Box>

              <Typography variant="body2" color="textSecondary">
                Amount: $
                {transaction.amount
                  ? Number(transaction.amount).toFixed(2)
                  : "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {new Date(transaction.payment_date).toLocaleDateString()}
              </Typography>
              <Divider sx={{ width: "100%", marginY: 1 }} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default TransactionHistory;
