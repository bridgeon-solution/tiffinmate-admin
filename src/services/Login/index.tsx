import axiosInstance from "../api";

const PostAdminLogin =async (data:{email:string;password:string}) => {
  const response=await axiosInstance.post('/Admin/login',data)
return response
}
export default PostAdminLogin
