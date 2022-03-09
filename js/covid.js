var radio1 = document.getElementsByName("radio1");
var radio2 = document.getElementsByName("radio2");
var radio3 = document.getElementsByName("radio3");
//RADIO DIVS
var rad1div = document.getElementsByClassName("radio1-div")
var rad2div = document.getElementsByClassName("radio2-div")
var rad3div = document.getElementsByClassName("radio3-div")
//
var radio1Answer;
var radio2Answer;
var radio3Answer;
//
var nextpagebutton = document.getElementsByClassName("right-faced-button");
//ERRORS
var errorsarray=[]
errorsarray["radio1"] = {title:'This question required',div:rad1div,index:4}
errorsarray["radio2"] = {title:'This question required',div:rad2div,index:3}
errorsarray["radio3"] = {title:'This question required',div:rad3div,index:3}
errorsarray["date1"] = {title:''}
errorsarray["date2"] = {title:''}
//WRITEERROR FUNCTION
function writeerror(field,error,index){
field[0].children[index].innerHTML= error
}
//OUTPUT DATE IF IT IS SAVED IN LOCALSTORAGE
function showdate(parent,value){
    var newdiv = document.createElement("div")
    newdiv.className="covid-date-div"

    var questionspan = document.createElement("span")
    questionspan.className = "radio-question"
    questionspan.innerHTML = "When?"
    var dateinputdiv = document.createElement("div")
    dateinputdiv.className = "date-input-div"

    var input = document.createElement("input")
    input.type="date"
    input.className= "covid-date"
    input.value = value
    input.id = "covid-date"
    input.placeholder = "date"

    var errormessage = document.createElement("h4")

    dateinputdiv.appendChild(input)
    newdiv.appendChild(questionspan)
    newdiv.appendChild(dateinputdiv)
    newdiv.appendChild(errormessage)
    parent.appendChild(newdiv)
}

//TAKE WORK PREFERENCE VALUE FROM LOCALSTORAGE
if(localStorage.getItem('work_preference') && localStorage.getItem('work_preference')=="From Sairme Office"){
radio1[0].checked=true
radio1Answer = radio1[0].value
errorsarray["radio1"].title=""
}else if(localStorage.getItem('work_preference')=="From Home"){
radio1[1].checked=true
radio1Answer = radio1[1].value
errorsarray["radio1"].title=""
}else if(localStorage.getItem('work_preference')=="Hybrid"){
radio1[2].checked=true
radio1Answer = radio1[2].value
errorsarray["radio1"].title=""
}
//TAKE COVID DATE FROM LOCALSTORAGE
if(localStorage.getItem('had_covid_at')){
    showdate(rad2div[0],localStorage.getItem('had_covid_at'))
    radio2[0].checked=true
    radio2Answer = radio2[0].value
    errorsarray["radio2"].title=""
}else{
    if(localStorage.getItem("had_covid")=="false"){
        radio2[1].checked=true
        radio2Answer = radio2[0].value
        errorsarray["radio2"].title=""
    }
}
//TAKE VACCINATE DATE FROM LOCALSTORAGE
if(localStorage.getItem('vaccinated_at')){
    showdate(rad3div[0],localStorage.getItem('vaccinated_at'))
    radio3[0].checked=true
    radio3Answer = radio3[0].value
    errorsarray["radio3"].title=""
}else{
    if(localStorage.getItem("vaccinated")=="false"){
        radio3[1].checked=true
        radio3Answer=radio3[1].value
        errorsarray["radio3"].title=""
    }
}

//RADIO ANSWERS SELECT AND VALIDATION
radio1.forEach((rad1)=>{    
    rad1.addEventListener('click',()=>{
        radio1Answer=rad1.value;
        errorsarray["radio1"].title = ''
        writeerror(errorsarray["radio1"].div,errorsarray["radio1"].title,errorsarray["radio1"].index)
    })
})

radio2.forEach((rad2)=>{    
    rad2.addEventListener('click',()=>{
        errorsarray["radio2"].title = ''
        writeerror(errorsarray["radio2"].div,errorsarray["radio2"].title,errorsarray["radio2"].index)
        radio2Answer=rad2.value;
        if(rad2.value=="Yes"){
            if(rad2div[0].children.length > 4 ){
            newdiv.parentElement.remove()
            }
          showdate(rad2div[0],"")
        }else{
            if(rad2div[0].children.length > 4)
            rad2div[0].lastChild.remove()
            errorsarray["date1"].title=""
            if(localStorage.getItem("had_covid_at")){
                localStorage.removeItem("had_covid_at")
            }
        }
    })
})

radio3.forEach((rad3)=>{    
    rad3.addEventListener('click',()=>{
        radio3Answer=rad3.value;
        errorsarray["radio3"].title = ''
        writeerror(errorsarray["radio3"].div,errorsarray["radio3"].title,errorsarray["radio3"].index)
        if(rad3.value=="Yes"){
            if(rad3div[0].children.length > 4 ){
            newdiv.parentElement.remove()
            }
          showdate(rad3div[0],"")
        }else{
            if(rad3div[0].children.length > 4)
            rad3div[0].lastChild.remove()
            errorsarray["date2"].title=""
            if(localStorage.getItem("vaccinated_at")){
                localStorage.removeItem("vaccinated_at")
            }
        }
    })
})

//VALIDATE IF RADIOS ARE EMPTY
function RadiosAreEmpty(){
if(radio1Answer==null){
writeerror(errorsarray["radio1"].div,errorsarray["radio1"].title,errorsarray["radio1"].index)
}else{
errorsarray["radio1"].title = ''
writeerror(errorsarray["radio1"].div,errorsarray["radio1"].title,errorsarray["radio1"].index)
}
if(radio2Answer==null){
writeerror(errorsarray["radio2"].div,errorsarray["radio2"].title,errorsarray["radio2"].index)
}else{
errorsarray["radio2"].title = ''
writeerror(errorsarray["radio2"].div,errorsarray["radio2"].title,errorsarray["radio2"].index)
}
if(radio3Answer==null){
writeerror(errorsarray["radio3"].div,errorsarray["radio3"].title,errorsarray["radio3"].index)
}else{
errorsarray["radio3"].title = ''
writeerror(errorsarray["radio3"].div,errorsarray["radio3"].title,errorsarray["radio3"].index)
}
}

//CHECK IF STRING IS EMPTY
function checkifdateisempty(input){
if(input==""){
    return true
}else{
    return false
}
}
//CHECK CHILDNODE LENGTH
function childrennodesn(parent){
    if(parent.children.length > 4){
        return true
    }else{
        return false
    }
}

//GO TO NEXT PAGE BUTTON EVENT LISTENER
nextpagebutton[0].addEventListener('click', ()=>{
RadiosAreEmpty()
//CHECK IF DATE INPUT EXISTS AND IS NOT EMPTY
if(childrennodesn(rad2div[0])){
    var inputvalue1 = rad2div[0].children[4].children[1].firstChild
    if(checkifdateisempty(inputvalue1.value)){
        errorsarray["date1"].title = 'Date is required'
        rad2div[0].children[4].children[2].innerHTML = 'Date is required'
    }else{
        errorsarray["date1"].title = ''
        rad2div[0].children[4].children[2].innerHTML = ''
    }
}
//CHECK IF DATE INPUT EXISTS AND IS NOT EMPTY
if(childrennodesn(rad3div[0])){
    var inputvalue2 = rad3div[0].children[4].children[1].firstChild
    if(checkifdateisempty(inputvalue2.value)){
        errorsarray["date2"].title = 'Date is required'
        rad3div[0].children[4].children[2].innerHTML = 'Date is required'
    }else{
        errorsarray["date2"].title = ''
        rad3div[0].children[4].children[2].innerHTML = ''
    }
}
//IF NO ERRORS SAVE TO LOCALSTORAGE AND GO TO NEXT PAGE
if(errorsarray["radio1"].title=="" && errorsarray["radio2"].title=="" && errorsarray["radio3"].title=="" && errorsarray["date1"].title=="" && errorsarray["radio1"].title==""){
    localStorage.setItem('work_preference',radio1Answer);

    if(radio2Answer =="Yes"){
        localStorage.setItem('had_covid',true);
    }else{
        localStorage.setItem('had_covid',false);
    }

    if(childrennodesn(rad2div[0])){
        var inputvalue1 = rad2div[0].children[4].children[1].firstChild.value
        localStorage.setItem('had_covid_at',inputvalue1);
    }

    if(radio3Answer == "Yes"){
        localStorage.setItem('vaccinated',true);
    }else{
        localStorage.setItem('vaccinated',false);
    }

    if(childrennodesn(rad3div[0])){
        var inputvalue2 = rad3div[0].children[4].children[1].firstChild.value
        localStorage.setItem('vaccinated_at',inputvalue2);
    }

    window.location.replace("../redberrian-insights.html");
}

})
