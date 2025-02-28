let password_input = document.getElementById("input_Field");
let messageDisplay = document.getElementById("Message_display");



function fetchCommonPasswords(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            if(Math.random()<0.5){
                resolve(["11223344","qwertyui","iloveyou"]);
            }
            else{
                reject("Fetch data from the server failed.")
            }
        },1)
    })
}


//Code for validating the password input.

password_input.addEventListener("keydown", async function(event) {
    if(event.key === "Enter") {
        while(messageDisplay.firstChild){
            messageDisplay.removeChild(messageDisplay.firstChild);
        }

        const CommonPasswords = await fetchCommonPasswords();
        
        let Capital = /[A-Z]/.test(password_input.value);
        let Small = /[a-z]/.test(password_input.value);
        let Number = /[0-9]/.test(password_input.value);
        let Special=/[^A-Za-z0-9\s]/.test(password_input.value);


        try {
            if (CommonPasswords.includes(password_input.value)) {
                throw new Error("The password cannto be a common one.")
            }

            if(password_input.value.length < 8) {
                throw new Error("The password must be at least 8 characters long.");
            }
            if(!Capital) {
                throw new Error("The password must contain at least one capital letter.");
            }
            if(!Small) {
                throw new Error("The password must contain at least one lowercase letter.");
            }
            if(!Number) {
                throw new Error("The password must contain at least one number.");
            }
            if(!Special){
                throw new Error("The password must contain at least one Special character.")
            }
            let Display=document.createElement("p");
            Display.textContent = "The password passes all the required validation checks. Well done.";
            Display.style.color = "green";
            messageDisplay.appendChild(Display)

        } catch(error) {
            let Display=document.createElement("p");
            messageDisplay.textContent = error.message;
            messageDisplay.style.color = "red";
            messageDisplay.appendChild(Display);
        }
    }
});

//Code for the eye icon changing dynamically.

let eye=document.getElementById("eye");
eye.addEventListener("click",function(event){
    if(password_input.type==="text"){
        password_input.type="password";
        eye.src="eye.png"
    }
    else if(password_input.type==="password"){
        password_input.type="text";
        eye.src="view.png"
    }
})

