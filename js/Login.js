const loginFrom=document.querySelector(".login-form");
const registerFrom=document.querySelector(".register-form");
const loginBtn=document.querySelector("#login");
const registerBtn=document.querySelector("#register");

loginBtn.addEventListener("click",function(){
    loginBtn.style.backgroundColor="#090c21";
    registerBtn.style.backgroundColor="rgba(255, 255, 255, 0.2)";
    loginFrom.style.left="50%";
    registerFrom.style.left="-50%";
    loginFrom.style.opacity=1;
    registerFrom.style.opacity=0;    
    document.querySelector(".col-1").style.borderRadius="0 30% 30% 0";
    
})
registerBtn.addEventListener("click",function(){
    registerBtn.style.backgroundColor="#090c21";
    loginBtn.style.backgroundColor="rgba(255, 255, 255, 0.2)";
    loginFrom.style.left="150%";
    registerFrom.style.left="50%";
    loginFrom.style.opacity=0;
    registerFrom.style.opacity=1;  
     document.querySelector(".col-1").style.borderRadius="0 20% 20% 0";  
})