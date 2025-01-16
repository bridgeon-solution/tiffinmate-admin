import api from "../api";

const PostAdminLogin =async (data:{email:string;password:string}) => {
  const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }
  const response=await api.post('/Admin/login',data)
return response
}
export default PostAdminLogin
