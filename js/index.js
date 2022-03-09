//VALIDATION STARTS FROM HERE//
var firstname =document.getElementById("firstname");
var lastname =document.getElementById("lastname");
var email = document.getElementById("email");
var number = document.getElementById("number");
var firstnamediv = document.getElementsByClassName("firstname-div")
var lastnamediv = document.getElementsByClassName("lastname-div")
var emaildiv = document.getElementsByClassName("email-div")
var numberdiv = document.getElementsByClassName("number-div")
var errormessage = document.getElementById("errormessage")

//ERRORS ARRAY
var errorsarr = {};
errorsarr["Firstname"] = {title:"Firstname is required",div:firstnamediv}
errorsarr["Lastname"] = {title:"Lastname is required",div:lastnamediv}
errorsarr["Email"] = {title:"Email is required",div:emaildiv}
errorsarr["Number"] = {title:"",div:numberdiv}

//OUTPUT ERRORS
function writeerror(field,error){
field[0].children[1].innerHTML= error
}

//FIRSTNAME VALIDATION
function validatefirstname(){
if(!lengthvalidate("Firstname",firstnamediv,firstname.value.length,2,55)){return}
if(checkifonlychars("Firstname",firstnamediv,firstname.value)){return}
}

//LASTNAME VALIDATION
function validatelastname(){
if(!lengthvalidate("Lastname",lastnamediv,lastname.value.length,2,55)){return}
if(checkifonlychars("Lastname",lastnamediv,lastname.value)){return}
}

//EMAIL VALIDATION
function validateemail(){
if(!checkifempty("Email",emaildiv,email.value.length)){return}
if(checkemail(emaildiv,email.value)){return}
}

//NUMBER VALIDATION
function validatenumber(){
if(number.value==""){
    errorsarr["Number"].title=''
    writeerror(numberdiv,``)
    return 0
}
if(!checkplussign(numberdiv,number.value)){return}
if(!checkifalpha(numberdiv,number.value)){return}
if(GEOnum(numberdiv,number.value)){return}

}

//LENGTH VALIDATION FUNCTION
function lengthvalidate(inputname,field,valuelength,minlength,maxlength){
if(valuelength > minlength && valuelength < maxlength){
    writeerror(field,``)
    errorsarr[inputname].title = ``
    return true;
}else if(valuelength > 0 && valuelength < minlength){
writeerror(field,`${inputname} shoud be more than ${minlength} character`)
    errorsarr[inputname].title = `${inputname} shoud be more than ${minlength} character`
    return false;
}else if(valuelength > 0 && valuelength > maxlength){
    writeerror(field,`${inputname} shoud not be more than ${maxlength} character`)
    errorsarr[inputname].title = `${inputname} shoud not be more than ${maxlength} character`
return false
}else if(valuelength==0){
    writeerror(field,`${inputname} is required`)
    errorsarr[inputname].title = `${inputname} is required`
return false
}
}

//CHECK IN INPUT VALUE IS EMPTY
function checkifempty(inputname,field,valuelength){
    if(valuelength==0 || valuelength<0){
        writeerror(field,`${inputname} is required`)
        errorsarr[inputname].title = `${inputname} is required`
        return false
    }else{
        writeerror(field,``)
        errorsarr[inputname].title = `` 
        return true
    }
}

//CHECK AND TEST EMAIL
function checkemail(field,email){
if(/^[\w.,!#$%^&*()\-_+=><?/{}[\]';":]+[\@]{1}[\w.]+[.]{1}[\w]+$/.test(email)){
    writeerror(field,``)
    errorsarr["Email"].title = ``
    return true
}else{
    writeerror(field,`Email Format is wrong`)
    errorsarr["Email"].title = `Email Format is wrong`
    return false;
}
}

//CHECK IF STRING HAS ONLY ENGLISH CHARACTERS
function checkifonlychars(inputname,field,value){
if(/^[a-zA-Z]+$/.test(value)){
    writeerror(field,``)
    errorsarr[inputname].title = ``
    return true
}else{
    writeerror(field,`${inputname} should only contain letters`)
    errorsarr[inputname].title = `${inputname} should only contain letters`
    return false;
}
}

//CHECK IF NUMBER IS GEORGIAN
function GEOnum(field,value){
    if(/^[+]{1}[9]{1}[9]{1}[5]{1}[5]{1}[0-9]{8}$/.test(value.toString())){
        writeerror(field,``)
        errorsarr["Number"].title = ``
        return true 
    }else{
        writeerror(field,`Only georgian Phone number is valid(start with +995)`)
        errorsarr["Number"].title = `Only georgian Phone number is valid(start with +995)`
        return false;
    }
}

//NUMBER PLUS SIGN CHECK
function checkplussign(field,value){
    if(value[0]=='+'){
        writeerror(field,``)
        errorsarr["Number"].title = ``
        return true
    }else{
        number.value = number.value.slice(0,0)
        writeerror(field,`Number should start with +`)
        errorsarr["Number"].title = `Number should start with +`
        return false
    }
}

//CHECK IF NUMBER HAS ANY LETTERS OR SYMBOLS
function checkifalpha(field,value){
    if(!(/^[a-zA-Z.,!#$%^&*()\-_=><?/{}[\]';":\@\s]+$/.test(value[value.length-1]))){
        writeerror(field,``)
        errorsarr["Number"].title = ``
        return true
    }else{
        number.value = number.value.slice(0,value.length-1)
        writeerror(field,`Input only numbers`)
        errorsarr["Number"].title = `Input only numbers`
        return false
    }
}

//EVENT LISTENERS
firstname.addEventListener("input",validatefirstname);
firstname.addEventListener("click",validatefirstname);
lastname.addEventListener("input",validatelastname);
lastname.addEventListener("click",validatelastname);
email.addEventListener("input",validateemail);
email.addEventListener("click",validateemail);
number.addEventListener("input",validatenumber);

//VALIDATION ENDS HERE

///TAKE OUT VALUES FROM LOCALSTORAGE AND OUTPUT IT
if(localStorage.getItem('first_name')!=null && localStorage.getItem('first_name')!=""){
firstname.value=localStorage.getItem('first_name')
errorsarr["Firstname"].title = ``
}
if(localStorage.getItem('last_name')!=null && localStorage.getItem('last_name')!=""){
lastname.value=localStorage.getItem('last_name')
errorsarr["Lastname"].title = ``
}
if(localStorage.getItem('email')!=null && localStorage.getItem('email')!=""){
email.value=localStorage.getItem('email')
errorsarr["Email"].title = ``
}
if(localStorage.getItem('phone')!=null && localStorage.getItem('phone')!=""){
number.value=localStorage.getItem('phone')
errorsarr["Number"].title = ``
}

//SAVE TO LOCALSTORAGE OR OUTPUT ERRORS
var next=document.getElementsByClassName("right-faced-button");
next[0].addEventListener("click",function() {
if(errorsarr["Firstname"].title=="" && errorsarr["Lastname"].title=="" && errorsarr["Email"].title=="" && errorsarr["Number"].title==""){
if(firstname.value!=null){
localStorage.setItem('first_name',firstname.value);
}
if(lastname.value!=null){
localStorage.setItem('last_name',lastname.value);
}
if(email.value!=null){
localStorage.setItem('email',email.value);
}
if(email.value!=null){
localStorage.setItem('phone',number.value.toString());
}
    window.location.replace("../technical-skillset.html");
}else{
    //errors
    alert("გთხოვთ შეავსოთ ყველა სავალდებულო ველი")
    writeerror(errorsarr["Firstname"].div,errorsarr["Firstname"].title)
    writeerror(errorsarr["Lastname"].div,errorsarr["Lastname"].title)
    writeerror(errorsarr["Email"].div,errorsarr["Email"].title)
    writeerror(errorsarr["Number"].div,errorsarr["Number"].title)

}
});
//SAVED TO LOCALSTORAGE
