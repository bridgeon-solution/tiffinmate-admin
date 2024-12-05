import axios from 'axios';

const BASE_URL="https://localhost:7009/api";

const PostAdminLogin =async (data:{email:string;password:string}) => {
    const response=await axios.post(`${BASE_URL}/Admin`,data)
  return response
    
}

export default PostAdminLogin
