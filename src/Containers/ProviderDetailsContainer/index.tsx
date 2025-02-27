import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FetchProviderDetails, FetchProviderMenus, FetchTransaction } from '../../Services/ProviderService';
import { toast } from 'react-toastify';
import { ProviderDetails, ProviderMenu, Transaction } from '../../Components/ProviderComponent/type';
import ProviderDetailsComponent from '../../Components/ProviderComponent/ProviderDetails';
import TransactionHistory from '../../Components/ProviderComponent/TransactionHistory';


const ProviderDetailsContainer=()=> {
    const{id}=useParams()
    const [openModal, setOpenModal] = useState<boolean>(false);
      const [open, setOpen] = React.useState(false);
      const [providerDetails, setProviderDetails] =
        useState<ProviderDetails>({user_name: "",
            email: "",
            address: "",
            phone_no: "",
            image: "",
            resturent_name: "",
            certificate:""
});
      const [providerMenu, setProviderMenu] = useState<ProviderMenu[]>([]);
     useEffect(() => {
        const fetchProviderDetails = async () => {
          try {
            const response = await FetchProviderDetails(id || "");
    
            if (response && response.result) {
              setProviderDetails(response.result);
            }
          } catch (error) {
            toast.error("error fetching details of users");
          }
        };
        fetchProviderDetails();
      }, [id]);

        useEffect(() => {
          const fetchMenuDetails = async () => {
            try {
              const response = await FetchProviderMenus(id || "");
      
              if (response && response.result) {
                setProviderMenu(response.result);
              }
            } catch (error) {
              toast.error("error fetching details of users");
            }
          };
          fetchMenuDetails();
        }, [id]);
  const handleViewCertificate = (certificate: string) => {
    window.open(certificate, "_self");
  };

  const handleReviews = () => {

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

 const handleTransactions = () => {
    if (!id) {
      toast.error("No provider selected!");
      return;
    }
      setOpen(true);

  };
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };
   const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        setLoading(true);
        try {
          if(id){
            const data = await FetchTransaction(id);
            if (data && data.result) {
              setTransactions(data.result);
            }
          }      
        } catch (error) {
          console.error("Error fetching transactions:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (open) {
        fetchTransactions();
      }
    }, [open, id]);
  return (
    <>
     <ProviderDetailsComponent 
     providerDetails={providerDetails}
     providerMenu={providerMenu}
     handleViewCertificate={handleViewCertificate}
     handleReviews={handleReviews}
     handleTransactions={handleTransactions}
     handleCloseModal={handleCloseModal}
     openModal={openModal}
     transactions={transactions}
     loading={loading}
     />
      {open&&
           <TransactionHistory toggleDrawer={toggleDrawer} open={open} transactions={transactions} loading={loading}/>
           }
    </>
  )
}

export default ProviderDetailsContainer