import React, { useEffect, useState } from 'react';
import ProviderDetails from '../../services/provider';
import Verificationtable from '../../components/vendorverification/verificationtable';

interface Provider {
  id:string,
  certificate: string;
  email: string;
  username: string;
  is_certificate_verified: boolean; 
}

const ProviderContainer: React.FC = () => {
  const [providerData, setProviderData] = useState<Provider[] | null>(null);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const response = await ProviderDetails();
        setProviderData(response); 
      } catch (error) {
        console.log(error);
      }
    };
    fetchProvider();
  }, []);

  return (
    <div>
      {providerData ? (
        <Verificationtable provider={providerData} /> 
      ) : (
        <div>Loading...</div> 
      )}
    </div>
  );
};

export default ProviderContainer;