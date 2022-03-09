//GET SUBMIT BUTTON
var button = document.getElementsByClassName("sumbit-button")
//CREATE DATA OBJECT AND GIVE IT VALUES
var data={}
//CHECK VALUES AND GIVE THEM TO OBJECT
data["token"] = "d8e4de3f-c589-411d-8cd0-a690f4a657c3"
data["first_name"] = localStorage.getItem("first_name")
data["last_name"] = localStorage.getItem("last_name")
data["email"] = localStorage.getItem("email")
if(localStorage.getItem("phone")!=null && localStorage.getItem("phone")!=""){
data["phone"] = localStorage.getItem("phone") 
}
data["skills"] = JSON.parse(localStorage.getItem("skills"))
if(localStorage.getItem("work_preference")=="From Sairme Office"){
data["work_preference"] = "from_office"
}else if(localStorage.getItem("work_preference")=="From Home"){
  data["work_preference"] = "from_home"
}else if(localStorage.getItem("work_preference")=="Hybrid"){
  data["work_preference"] = "hybrid"
}
data["had_covid"] = JSON.parse(localStorage.getItem("had_covid"))
if(localStorage.getItem("had_covid_at")!=null && localStorage.getItem("had_covid_at")!=""){
  data["had_covid_at"] = localStorage.getItem("had_covid_at")
 }
data["vaccinated"] = JSON.parse(localStorage.getItem("vaccinated"))
if(localStorage.getItem("vaccinated_at")!=null && localStorage.getItem("vaccinated_at")!=""){
  data["vaccinated_at"] = localStorage.getItem("vaccinated_at")
}
data["will_organize_devtalk"] = JSON.parse(localStorage.getItem("will_organize_devtalk"))
if(localStorage.getItem("devtalk_topic")!=null && localStorage.getItem("devtalk_topic")!=""){
  data["devtalk_topic"] = localStorage.getItem("devtalk_topic")
}
data["something_special"] = localStorage.getItem("something_special")
///

//SUBMIT BUTTON EVENT LISTENER
button[0].addEventListener("click",()=>{
//CONNECT TO SERVER 
const xhr = new XMLHttpRequest();
xhr.open("POST", "https://bootcamp-2022.devtest.ge/api/application", true);
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify(data));
xhr.onload=()=>{
    if(xhr.status===201){
      //IF SUCCESS
      alert("თქვენი ინფორმაცია გაიგზავნა")
      window.location.replace("../thankyou.html")
    }else{
      //ELSE
      console.log(JSON.parse(xhr.responseText))
    }
  
}
})