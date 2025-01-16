import api from "../api";

const PostAdminLogin =async (data:{email:string;password:string}) => {
  const response=await api.post('/Admin/login',data)
return response
}
export default PostAdminLogin
