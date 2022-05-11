import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
const API_URL = "/api/auth/";
const API_book = "/hotel-booking/";
const API_rewards = "/";
const API_searchHotel = "/api/searchHotel/";


//axios.defaults.proxy.host = "http://localhost"
//axios.defaults.proxy.port = "8086"

class AuthService {

  postCoinPrediction(email, coin, date, price, more){
    console.log("Posting Prediction Data")
    return axios.post("http://52.203.20.210:8585/users/setTransactionDetail",{
      email,
      coin,
      date,
      price,
      more
    })
    .then(response =>{
      return response
    })
  }

  // getCoinPrediction(){
  //   console.log("Fetching Predicted Coins Data")
  //   var email = localStorage.getItem("email")
  //   return axios.post("http://localhost:8585/users/getUpdate",{
  //     email
  //   })
  //   .then(response =>{
  //     return response
  //   })
  // }

  getPrediction(email){
    console.log(email)
    return axios
    .post("http://52.203.20.210:8585/users/getUpdate",{
      "email":email
    }).then(response => {
              console.log(response)
               return response;
      })
  }

  setPrediction(email, coin, price, time, status){
    console.log("Set update")
    return axios
    .post("http://52.203.20.210:8585/users/setUpdate",{
      "email":email,
      "coin":coin,
      "status":status
    }).then(response => {
              console.log(response)
              //updateTransactionTable(email, coin ,price, time, status)
              return response;
    })
  }

  updateTransactionTable(email, coin ,price, time, status){
    console.log("Set update")
    return axios
    .post("http://52.203.20.210:8585/transaction/update",{
      "email":email,
      "coin":coin,
      "price":price,
      "date":time,
      "status":status
    }).then(response => {
              console.log(response)
              return response;
    })
  }

  getTransactions(email){
    console.log("Get Transactions")
    return axios
    .post("http://52.203.20.210:8585/transaction/getDetails",{
      "email":email,
    }).then(response => {
              console.log(response)
              return response;
    })
  }




  // Below code is not reqired
  //To_Login User
  login(email, password) {
    //return Promise.resolve(localStorage.setItem("user", "Shreyansh"))
    console.log("Getting booking")
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response) {
          console.log(response.data.username)
          localStorage.setItem("user", JSON.stringify(response.data.username));
          localStorage.setItem("token", JSON.stringify(response.data.token));

        }
        return response.data;
      });
  }

  //To_logout User
  logout() {
    return Promise.resolve(localStorage.removeItem('user'));
  }

  //To_register User
  register( username, email, password, phoneNumber) {
    console.log(username)
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      phoneNumber,
    }).then(response => {
      return response
    })
    // ).catch(e=> {
    //   //window.alert(e)
    //   console.log(e);
    // });
  }

  //To_login employee
  employeelogin(email, password) {
    //return Promise.resolve(localStorage.setItem("user", "Shreyansh"))
    console.log("Getting booking")
    return axios
      .post(API_rewards + "api/employee/login", {
        email,
        password
      })
      .then(response => {
        if (response) {
          console.log(response.data.username)
          localStorage.setItem("user", "Employee");
        }
        return response.data;
      });
  }

  //To_register Employee
  employeeregister( username, email, password, phoneNumber) {
    console.log(username)
    return axios.post(API_rewards+"api/employee/register", {
      username,
      email,
      password,
      phoneNumber,
    }).then(response => {
      console.log(response);
    }).catch(e=> {
      console.log(e);
    });
  }

  //To_getBooking for Employee
  getBookingEmployee(){
    return axios
        .get(API_rewards+"api/getBooking")
          .then(response => {
                  console.log(response)
                   return response;
          })
  }

  getHotelLocation(location){
    return axios
    .get(API_searchHotel+location)
      .then(response => {
              console.log(response)
               return response;
      })
  }




  //To_AddHotel Employee
  postemployeeHotel(location,hotelName,id){
    return axios
      .post(API_rewards + "api/savehotel", {
        location,
        hotelName,
        id
      })
      .then(response => {
        return response.data;
      });
  }

  //To get current User
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  //To get Balance for the user
  getBalanceUser(){
    //return Promise.resolve(JSON.stringify({"balance":1000}));
    let x = localStorage.getItem('user')
    let email = x;
    email = email.replace(/\"/g,'')
    let token = localStorage.getItem('token');
    token = token.replace(/\"/g,'')
    console.log(token)
    let yourConfig = {
      headers: {
          'Content-Type' : 'application/json',
         'Authorization': "Bearer " + token,
      }
   }
    return axios
      .get(API_book + "getRewardPoints/"+email, yourConfig)
       .then(response => {
         return response.data;
       });
  }

  //To_get bookings for the user
  getBookingDetails(){
    let x = localStorage.getItem('user')
    let email = x;
    email = email.replace(/\"/g,'')
    let token = localStorage.getItem('token');
    token = token.replace(/\"/g,'')
    console.log(token)
    let yourConfig = {
      headers: {
          'Content-Type' : 'application/json',
         'Authorization': "Bearer " + token,
      }
   }
    return axios
        .get(API_book+"getBooking/"+ email, yourConfig)
          .then(response => {
                  console.log(response)
                   return response;
          })
  }

  //To book hotel for user
  getBookingConfirmation(roomType, fromDate, toDate, daily_continental_breakfast, access_to_fitness_room, access_to_swimming_Pool_Jacuzzi, daily_parking, all_meals_included, numberOfRooms, number_of_children, number_of_adults){
    let x = localStorage.getItem('user')
    let email = x;
    email = email.replace(/\"/g,'')
    let token = localStorage.getItem('token');
    token = token.replace(/\"/g,'')
    let emailID = email
    console.log(fromDate)
    var date = new Date(fromDate.getTime());
    date.setHours(0, 0, 0, 0);
    console.log(date)
    let yourConfig = {
      headers: {
          'Content-Type' : 'application/json',
         'Authorization': "Bearer " + token,
      },
        emailID,
        roomType,
        fromDate,
        toDate,
        numberOfRooms,
        number_of_children,
        number_of_adults,
        "amenities": {
        daily_continental_breakfast,
        access_to_fitness_room,
        access_to_swimming_Pool_Jacuzzi,
        daily_parking,
        all_meals_included
      }
   }
    console.log("Welcome")
    return axios
       .post(API_book + "createBooking", {
        emailID,
        roomType,
        fromDate,
        toDate,
        numberOfRooms,
        number_of_children,
        number_of_adults,
        "amenities": {
        daily_continental_breakfast,
        access_to_fitness_room,
        access_to_swimming_Pool_Jacuzzi,
        daily_parking,
        all_meals_included
      }
       }, yourConfig
        )
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  //To update hotel booking for the user
  getUserUpdate(roomType, fromDate, toDate, daily_continental_breakfast, access_to_fitness_room, access_to_swimming_Pool_Jacuzzi, daily_parking, all_meals_included, numberOfRooms, number_of_children, number_of_adults, bookid)
  {
    let x = localStorage.getItem('user')
    let email = x;
    email = email.replace(/\"/g,'')
    let token = localStorage.getItem('token');
    token = token.replace(/\"/g,'')
    let emailID = email
    console.log(fromDate)
    var date = new Date(fromDate.getTime());
    date.setHours(0, 0, 0, 0);
    let yourConfig = {
      headers: {
          'Content-Type' : 'application/json',
         'Authorization': "Bearer " + token,
      },
        emailID,
        roomType,
        fromDate,
        toDate,
        numberOfRooms,
        number_of_children,
        number_of_adults,
        "amenities": {
        daily_continental_breakfast,
        access_to_fitness_room,
        access_to_swimming_Pool_Jacuzzi,
        daily_parking,
        all_meals_included
      }
   }
    return axios
       .put(API_book + "updateBooking/"+ bookid, {
        emailID,
        roomType,
        fromDate,
        toDate,
        numberOfRooms,
        number_of_children,
        number_of_adults,
        "amenities": {
        daily_continental_breakfast,
        access_to_fitness_room,
        access_to_swimming_Pool_Jacuzzi,
        daily_parking,
        all_meals_included
      }
       },yourConfig
       )
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  //To cancel booking for the user
  getCancelBooking(description){
    let x = localStorage.getItem('user')
    let email = x;
    email = email.replace(/\"/g,'')
    let token = localStorage.getItem('token');
    token = token.replace(/\"/g,'')
    console.log(token)
    let yourConfig = {
      headers: {
         'Content-Type' : 'application/json',
         'Authorization': "Bearer " + token,
      }
   }
    return axios
        .delete(API_book+"cancel/"+ description,yourConfig)
          .then(response => {
                  console.log(response)
                   return response;
          })
  }


  validUser(){
      //var x = JSON.parse(localStorage.getItem('user'));
      var x = JSON.stringify(localStorage.getItem('user'))
      var y = localStorage.getItem('user');
      console.log("Valid User")
      console.log(y)
      if(y == null){
          return false
      }
      else{
          return true
      }
  }
}
export default new AuthService();

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }