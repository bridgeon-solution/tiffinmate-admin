import axios from 'axios';


const BASE_URL=import.meta.env.VITE_BASE_URL;

const PostAdminLogin =async (data:{email:string;password:string}) => {
    const response=await axios.post(`${BASE_URL}/Admin/login`,data)
  return response
    
}

export default PostAdminLogin
