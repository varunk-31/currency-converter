const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let dropdowns = document.querySelectorAll(".dropDown select");
let btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")


for(let select of dropdowns){
 for(let code in countryList ){
    let newOptions = document.createElement("option");
    newOptions.innerText= code;
    newOptions.value = code;
if(select.name =="from" && code=="USD"){
  newOptions.selected = "selected"
}
else if(select.name =="to" && code=="INR"){
  newOptions.selected = "selected"
}

   select.append(newOptions);
   

 }
 select.addEventListener("change" , (evt)=>{
  changeFlag(evt.target)
  })


}

function changeFlag(element){

  let curcode = element.value;
  let countryCode =   countryList[curcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;


}

btn.addEventListener("click" ,  ( evt)=>{
  evt.preventDefault();
  updateAmount();
  

})

const updateAmount = async(evt)=>{
  let amount = document.querySelector(".amount input");
  let amtvalue = amount.value
  
  if(amtvalue ==  "" || amtvalue<1){
    amount.value = 1;
    amtvalue = 1;

  }
  console.log(amtvalue);
  console.log(fromCurr.value.toLowerCase() , toCurr.value.toLowerCase())

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
  const response = await fetch(URL);
  const data = await response.json();
 let rate = data[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];
 let finalAmount = amtvalue*rate;
 console.log(finalAmount);
 
document.querySelector(".text").innerHTML = `${amtvalue}${fromCurr.value} = ${finalAmount}${toCurr.value}`
}


window.addEventListener("load" , ()=>{
  updateAmount();
  
})

