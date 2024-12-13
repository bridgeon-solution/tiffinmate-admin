import React, { useEffect, useState } from 'react';
import Usertable from '../../components/user/userstable';
import {UserDetails} from '../../services/user';

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
      } catch (error) {
       window.alert(error)
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
