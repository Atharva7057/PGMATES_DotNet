import axios from 'axios';

const BASE_URL = "http://localhost:5271/api/Authenticate/";

 export async function RegisterUser(userdata){
    var roletoreg = 0;

    if (userdata.role === "user") {
        roletoreg = 0;
    }else if (userdata.role === "owner") {
        roletoreg = 1;
    }else{
        roletoreg= 2;
    }
    const data = {
        FirstName:userdata.firstName,
        LastName:userdata.lastName,
        Email:userdata.email,
        Contact:userdata.contact,
        Password:userdata.password,
        Gender : userdata.gender === "male"? 0 : 1,
        Role: roletoreg
    }
    console.log(data);
    return await axios.post(`${BASE_URL}Register`,data);
}
export async function verify(email,password) {
    var credentials= {
        Email:email,
        Password:password
    }
    console.log(credentials);
    
    return await axios.post(`${BASE_URL}Login`,credentials);
}