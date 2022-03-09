//CONNECT TO SERVER WITH API
const request = new XMLHttpRequest();
//TOKEN
var token = "d8e4de3f-c589-411d-8cd0-a690f4a657c3"
//SEND REQUEST
request.open("GET","https://bootcamp-2022.devtest.ge/api/skills")
request.setRequestHeader('Authorization', 'Bearer ' + token);
request.send()
request.onload=()=>{
    skillsdata=JSON.parse(request.response)
    console.log(skillsdata)
    if(request.status===200){
        for(let i =0;i<skillsdata.length;i++){
            var options = document.createElement("option")
                options.value = skillsdata[i].id
                options.innerHTML = skillsdata[i].title
            var select = document.getElementsByClassName("skills-input")
            select[0].appendChild(options)
}
    }else{
        //CONSOLE LOG ERROR
        console.log("Error Happened")
    }
}
//API END HERE

//CLASS OF SKILLS AND EXP INFORMATION
class Info{
  constructor(skill, experience) {
    this.id = skill;
    this.experience = experience;
  }
}

var arrayofexpInfo = []
//FIELD VALIDATION STARTS FROM HERE
//GETDIVS
var skilldiv = document.getElementsByClassName("skill-div")
var expdiv = document.getElementsByClassName("exp-div")
//ERRORS ARRAY
var errorsarr = {}
errorsarr["exp"] = {title:'required',div:expdiv}
errorsarr["skill"] = {title:'',div:expdiv}
errorsarr["requiredskill"] = {title:'1 Skill is minimum',div:expdiv}
//GET INPUTS
var skill = document.getElementsByClassName("skills-input")
var experience = document.getElementsByClassName("exp-input")

var arrayofskills = ['HTML',
'CSS',
'PHP',
'Laravel', 
'React.JS',
'Vue.JS',
'Svelte',
'Angular',]

//WRITE ERRORS
function writeerror(field,error){
field[0].children[1].innerHTML= error
}


var button  = document.getElementsByClassName("sumbitbutton")
//ADD BOXES OF EXPAND SKILLS WHEN CLICKING BUTTON
function addexperience(){
    if(experience[0].value==""){
        errorsarr["exp"].title = "Experience is required";
        writeerror(errorsarr["exp"].div,errorsarr["exp"].title);
    }else{
        //TEST IF SKILL IS USED
        for(let i =0;i<arrayofexpInfo.length;i++){

            if(arrayofexpInfo[i]["id"]==skill[0].value){
                errorsarr["skill"].title = "skill is already used";
                writeerror(errorsarr["skill"].div,errorsarr["skill"].title);
                return
            }else{
                errorsarr["skill"].title = "";
                writeerror(errorsarr["skill"].div,errorsarr["skill"].title);
            }
        }
        //ELSE CONTINUE
        //ADDING LI
        console.log(skill)
        var list= document.createElement("li")
        var maindiv = document.getElementsByClassName("column-exp");
        var divtoadd = document.createElement("div");
        divtoadd.className = "exp-sumbited-div";
        //CREATING INSIDE CONTENT
        //SKILLS NAME
        var span1 = document.createElement("span");
        span1.className="skill-name";
        span1.innerHTML = arrayofskills[skill[0].value-1]
        span1.value=skill[0].value
        //YEARS OF EXPERIENCE
        var span2 = document.createElement("span");
        span2.className="experience";
        span2.innerHTML = `Years of Experience: ${experience[0].value}`
        span2.value = experience[0].value
        //DELETE BUTTON
        var deletebutton = document.createElement("button")
        deletebutton.className = "delete-button"
        //DELETE BUTTON ICON
        var icon = document.createElement("i")
        icon.className = "fa-solid fa-circle-minus"
        icon.style="color:#FE3B1F;font-size:28px;"
        //
        //APPENDING CHILDREN TO NEW ELEMENT
        deletebutton.appendChild(icon)
        divtoadd.appendChild(span1)
        divtoadd.appendChild(span2)
        divtoadd.appendChild(deletebutton)
        list.appendChild(divtoadd)
        maindiv[0].appendChild(list)
        //PUSHIN SKILLS IN ARRAY
        var info = new Info(skill[0].value,experience[0].value)
        arrayofexpInfo.push(info)
        //DELETING ADDED BOX
        var deletebutton = document.querySelectorAll(".delete-button")
        deletebutton.forEach((del) =>{
        del.addEventListener("click",()=>{
         for(let i=0;i<arrayofexpInfo.length; i++){
                if(arrayofexpInfo[i]["id"]==del.parentElement.children[0].value && arrayofexpInfo[i]["experience"]==del.parentElement.children[1].value){
                    arrayofexpInfo.splice(i,1)
                    localStorage.setItem('skills',JSON.stringify(arrayofexpInfo));
                }
            del.parentElement.remove()
            }
            })
            })
                    localStorage.setItem('skills',JSON.stringify(arrayofexpInfo));
    }

}

//CALLING FUNCTION ADDEXPERIENCE WHEN ADD BUTTON IS CLICKED
button[0].addEventListener("click",addexperience)
//FETCHING SKILLS DATA FROM LOCAL STORAGE AND DISPLAYING
if(localStorage.getItem('skills')!=null && localStorage.getItem('skills')!=""){
    var arrayofsavedskills  = JSON.parse(localStorage.getItem('skills'))
    for(let i =0;i<arrayofsavedskills.length;i++){
        //ADDING LI
        var list= document.createElement("li")
        var maindiv = document.getElementsByClassName("column-exp");
        var divtoadd = document.createElement("div");
        divtoadd.className = "exp-sumbited-div";
        //CREATING INSIDE CONTENT
        //SKILLS NAME
        var span1 = document.createElement("span");
        span1.className="skill-name";
        span1.innerHTML = arrayofskills[arrayofsavedskills[i]["id"]-1]
        span1.value=arrayofsavedskills[i]["id"]
        //YEARS OF EXPERIENCE
        var span2 = document.createElement("span");
        span2.className="experience";
        span2.innerHTML = `Years of Experience: ${arrayofsavedskills[i]["experience"]}`
        span2.value = arrayofsavedskills[i]["experience"]
        //DELETE BUTTON
        var deletebutton = document.createElement("button")
        deletebutton.className = "delete-button"
        //DELETE BUTTON ICON
        var icon = document.createElement("i")
        icon.className = "fa-solid fa-circle-minus"
        icon.style="color:#FE3B1F;font-size:28px;"
        //
        //APPENDING CHILDREN TO NEW ELEMENT
        deletebutton.appendChild(icon)
        divtoadd.appendChild(span1)
        divtoadd.appendChild(span2)
        divtoadd.appendChild(deletebutton)
        list.appendChild(divtoadd)
        maindiv[0].appendChild(list)
        //PUSHING SKILLS TO ARRAY
        var info = new Info(arrayofsavedskills[i]["id"],arrayofsavedskills[i]["experience"])
        arrayofexpInfo.push(info)
    }
    var deletebutton = document.querySelectorAll(".delete-button")
    deletebutton.forEach((del) =>{
        del.addEventListener("click",()=>{
            for(let i=0;i<arrayofexpInfo.length; i++){
                if(arrayofexpInfo[i]["id"]==del.parentElement.children[0].value && arrayofexpInfo[i]["experience"]==del.parentElement.children[1].value){
                    arrayofexpInfo.splice(i,1)
                    localStorage.setItem('skills',JSON.stringify(arrayofexpInfo));
                }
            del.parentElement.remove()
            }
            })
            })
}
//SAVE TO LOCALSTORAGE AND GO TO NEXT PAGE
    var rightbutton = document.getElementsByClassName("right-faced-button")
    rightbutton[0].addEventListener("click",function(){
    if(arrayofexpInfo.length < 1){
    writeerror(errorsarr["requiredskill"].div,errorsarr["requiredskill"].title)
    }else{   
    localStorage.setItem('skills',JSON.stringify(arrayofexpInfo));
    window.location.replace("../covid.html")
    }
})
