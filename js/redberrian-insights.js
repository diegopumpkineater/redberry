//REDBERRIAN-INSIGHTS VALIDATION STARTS FROM HERE
//INPTUS
var radioquestion = document.getElementsByName("radio4")
var devtalksquestion = document.getElementsByClassName("devtalks-txt")
var specialquestion = document.getElementsByClassName("special-txt")
var radioanswer
//QUESTION DIVS
var rad1div = document.getElementsByClassName("radio4-div")
var devtalksdiv =document.getElementsByClassName("txtarea1-div")
var specialdiv = document.getElementsByClassName("txtarea2-div")
//GO TO NEXT PAGE BUTTON
var nextbutton = document.getElementsByClassName("right-faced-button")
//ARRAY OF ERRORS
var errorsarray = []
errorsarray["radio1"] = {title:'This question is required',div:rad1div,index:3}
errorsarray["devtalks"] = {title:'',div:devtalksdiv,index:2}
errorsarray["special"] = {title:'This question is required',div:specialdiv,index:specialquestion[0].parentElement.children.length-1}
//FUNCTION TO SHOW ERRORS
function writeerror(field,error,index){
field[0].children[index].innerHTML= error
}
//THIS FUNCTION DRAWS TWO TEXTBOX IF YES IS ANSWERED
function drawdevtalktxtbox(divclassname,spanclassname,spaninnerhtml,textareaclass,textareaplacehodlder,textareaname,h4class){
var div = document.createElement("div")
div.className = divclassname

var span = document.createElement("span")
span.className = spanclassname
span.innerHTML = spaninnerhtml

var textarea = document.createElement("textarea")
textarea.id = "devtalks-txt"
textarea.className = textareaclass
textarea.placeholder = textareaplacehodlder
textarea.name = textareaname

var h4 = document.createElement("h4")
h4.className=h4class

div.appendChild(span)
div.appendChild(textarea)
div.appendChild(h4)

var leftsidediv = document.getElementsByClassName("left-side")
leftsidediv[0].appendChild(div)

}

//START LISTENING TO RADIO ANSWERS
radioquestion.forEach((rad1)=>{    
    rad1.addEventListener('click',()=>{
        radioanswer=rad1.value;
        errorsarray["radio1"].title = ''
        writeerror(errorsarray["radio1"].div,errorsarray["radio1"].title,errorsarray["radio1"].index)
        //IF RADIO ANSWER IS YES TWO TEXT BOX WILL SHOW UP
        if(rad1.value=="Yes"){
            if(devtalksdiv[0]!=null){
            if(devtalksdiv[0].lastElementChild.className=="devtalks-h4"){
                devtalksquestion[0].parentElement.remove()
            }
            }

            drawdevtalktxtbox("txtarea1-div","textarea-span","What would you speak about at Devtalk?","devtalks-txt","I would...","devtalks-txt","devtalks-h4")
            
            errorsarray["devtalks"].title = "This question is required"
        //GIVE TEXTBOXES THEIR OWN LISTENERS
            devtalksquestion[0].addEventListener("input",()=>{
            if(devtalksquestion[0].value == null || devtalksquestion[0].value==""){
                errorsarray["devtalks"].title = 'This question is required'
                devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devtalks"].title
            }else{
                errorsarray["devtalks"].title = ''
                devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devtalks"].title
            }
            })

            specialquestion[0].addEventListener("input",()=>{
            if(specialquestion[0].value==null || specialquestion[0].value==""){
                errorsarray["special"].title = 'This question is required'
                specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
            }else{
                errorsarray["special"].title = ''
                specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
            }    

            })
        //IF NO IS ANSWERED DELETE ALL TEXTBOXES
        }else if(rad1.value=="No"){
            if(devtalksquestion[0]!=null){
            if(devtalksdiv[0].lastElementChild.className=="devtalks-h4"){
                devtalksquestion[0].parentElement.remove()
            }
        }
            errorsarray["devtalks"].title = ""
        }
    })
})
    specialquestion[0].addEventListener("input",()=>{   
    if(specialquestion[0].value==null || specialquestion[0].value==""){
            errorsarray["special"].title = 'This question is required'
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        }else{
            errorsarray["special"].title = ''
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        }  
        })
//FUNCTION WHICH CHECKS IF THERE IS ANY ERROR
function checkerrors(){
    if(radioanswer==null || radioanswer==""){
        writeerror(errorsarray["radio1"].div,errorsarray["radio1"].title,errorsarray["radio1"].index)
    }else{
        errorsarray["radio1"].title = ''
        writeerror(errorsarray["radio1"].div,errorsarray["radio1"].title,errorsarray["radio1"].index)
    }

    if(devtalksdiv[0]!=null){
        if(devtalksquestion[0].value==null || devtalksquestion[0].value=="" ){
            writeerror(errorsarray["devtalks"].div,errorsarray["devtalks"].title,errorsarray["devtalks"].index)
        }else{
            errorsarray["devtalks"].title = ''
            writeerror(errorsarray["devtalks"].div,errorsarray["devtalks"].title,errorsarray["devtalks"].index)
        }
    }

    if(specialquestion[0].value==null || specialquestion[0].value==""){
        specialquestion[0].parentElement.children[specialquestion[0].parentElement.children.length-1].innerHTML=errorsarray["special"].title
        errorsarray["special"].title="This question is required"
        writeerror(errorsarray["special"].div,errorsarray["special"].title,errorsarray["special"].index)
    }else{
        errorsarray["special"].title = ""
        writeerror(errorsarray["special"].div,errorsarray["special"].title,errorsarray["special"].index)
    }
}



//LOCALSTORAGE ITEMS, IF YES IS ANSWERED ONE TEXTBOX WILL SHOW UP WITH IT'S OWN VALUES
if(localStorage.getItem("will_organize_devtalk")=="true"){
    radioquestion[0].checked=true
    errorsarray["radio1"].title = ""
    //IF YES IS SAVED IN LOCALSTORAGE DRAW TEXTBOX
    drawdevtalktxtbox("txtarea1-div","textarea-span","What would you speak about at Devtalk?","devtalks-txt","I would...","devtalks-txt","devtalks-h4")
    //GIVING TEXTBOXES THEIR OWN LISTENERS
    devtalksquestion[0].addEventListener("input",()=>{
        if(devtalksquestion[0].value == null || devtalksquestion[0].value==""){
            errorsarray["devtalks"].title = 'This question is required'
            devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devtalks"].title
        }else{
            errorsarray["devtalks"].title = ''
            devtalksdiv[0].lastElementChild.innerHTML = errorsarray["devtalks"].title
        }
        })

        specialquestion.value= localStorage.getItem("something_special")
        errorsarray["special"].title=""
//
}else if(localStorage.getItem("will_organize_devtalk")=="false"){
    radioquestion[1].checked=true
    errorsarray["radio1"].title = ""

        specialquestion[0].addEventListener("input",()=>{
        if(specialquestion[0].value==null || specialquestion[0].value==""){
            errorsarray["special"].title = 'This question is required'
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        }else{
            errorsarray["special"].title = ''
            specialdiv[0].lastElementChild.innerHTML = errorsarray["special"].title
        }  
        })

        specialquestion.value= localStorage.getItem("something_special")
        errorsarray["special"].title=""

}
//GIVING TEXTBOXES SAVED VALUES
if(devtalksquestion[0]!=null){
    if(localStorage.getItem("devtalk_topic")){
        devtalksquestion[0].value = localStorage.getItem("devtalk_topic")
        errorsarray["devtalks"].title = '' 
    }
}
if(localStorage.getItem("something_special")){
    specialquestion[0].value = localStorage.getItem("something_special")
    errorsarray["special"].title = '' 
}


//GOING TO NEXT PAGE,SAVE TO LOCALSTORAGE AND REDIRECT
nextbutton[0].addEventListener('click',()=>{
    checkerrors()
    console.log(errorsarray["special"].title)
    if(errorsarray["radio1"].title == "" && errorsarray["devtalks"].title == "" && errorsarray["special"].title == "" ){
    if(radioanswer =="Yes"){
        localStorage.setItem('will_organize_devtalk',true);
    }else{
        localStorage.setItem('will_organize_devtalk',false);
    }
    if(devtalksdiv[0]!=null){
        localStorage.setItem('devtalk_topic',devtalksquestion[0].value);
    }else{
        localStorage.setItem('devtalk_topic',"");
    }
    localStorage.setItem('something_special',specialquestion[0].value);
    window.location.replace("../sumbit.html")
    }

})