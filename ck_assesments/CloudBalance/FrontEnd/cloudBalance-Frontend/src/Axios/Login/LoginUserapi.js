import axios from 'axios'




 const loginUserapi = async () => {

    
  const response = await axios.get("http://localhost:8080/user/getUsers");
  console.log(response,"response");
  

};

export default loginUserapi;
