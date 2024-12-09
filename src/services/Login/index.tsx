import axios from 'axios';

const BASE_URL="https://localhost:7009/api";

const PostAdminLogin =async (data:{email:string;password:string}) => {
  console.log(data)
    const response=await axios.post(`${BASE_URL}/Admin/login`,data)
  return response
    
}

export default PostAdminLogin
