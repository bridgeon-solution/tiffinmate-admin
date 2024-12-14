import React, { useEffect, useState } from 'react';
import Usertable from '../../components/user/userstable';
import {UserDetails} from '../../services/user';
import { toast } from 'react-toastify';

interface User {
  id:string,
  email: string;
  name: string;
  is_blocked: boolean; 
}

const UserContainer: React.FC = () => {
  const [userData, setUserData] = useState<User[] | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserDetails();

        setUserData(response); 
        if(response==null){
          toast.warning("users is empty");
        }
      } catch (error) {
       toast.error("something went wrong");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      {userData ? (
        <Usertable user={userData} /> 
      ) : (
        <div>Loading...</div> 
      )}
    </div>
  );
};

export default UserContainer;
