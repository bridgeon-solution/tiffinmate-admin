import React, { useEffect, useState } from 'react';
import ProviderDetails from '../../services/provider';
import Providertable from '../../components/provider/providertable';
import { toast } from 'react-toastify';

interface Provider {
  id:string,
  email: string;
  username: string;
}

const VendorContainer: React.FC = () => {
  const [providerData, setProviderData] = useState<Provider[] | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await ProviderDetails();
        setProviderData(response); 
      } catch (error) {
        toast.error("something went wrong")
      }
    };
    fetchProvider();
  }, []);

  return (
    <div>
      {providerData ? (
        <Providertable provider={providerData} /> 
      ) : (
        <div>Loading...</div> 
      )}
    </div>
  );
};

export default VendorContainer;
