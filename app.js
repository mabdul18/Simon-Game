let gameSeq= [];
let userSeq =[];
let body =  document.querySelector("body");
let btns = ["yellow","red","purple","green"];
let started = false;
let level = 0;
 console.log("Welcome To SIMON Game");
//accessing h2 to display the levels

let h2 = document.querySelector("h2");
//step 1 : pressing any key in keboard to start thegame
document.addEventListener("keypress",function(){
   if(started == false){
    console.log("Game Is Started");
    started = true; //once one key is pressed game gets starts. after that if u press any key in keboard it wont work


    levelUp();
   }
});

//step2: A random button should flash and level should increase.

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250); //250 that is one fourth of 1sec(1000ms)
};
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250); //250 that is one fourth of 1sec(1000ms)
};

/*basically what happens above is when game flashes the button white comes
user flashed the button green comes - for understanding */

function levelUp() {
    userSeq = []; //once leveled up to reset the userSeq to empty as the user should click pattern from first
    level++;
    h2.innerText = `level ${level}`;
    
    //choose ramdom btn to flash

    let randIndx = Math.floor(Math.random()*4); //that is from 0 to 3 index range.
    console.log(randIndx);
    let randColor =  btns[randIndx]; //if randIdx generated is 0 btns[0] , here in btns[0] there    is yellow, so yellow will be saved in randColor
    let randBtn = document.querySelector(`.${randColor}`); // here writting inside `.` as per eg .yellow , basically accesing the element with class .yellow in query selector
    console.log("for understanding random button selection to start game:")
    console.log(`the ranom index is : ${randIndx}`);
    console.log(`the randm color is : ${randColor}`);
    console.log("the random button selected from document is:")
    console.log(randBtn);//since it is an div element , we can' t write [`the random button is : ${randBtn}`] it will come as [the random button is : [object HTMLDivElement]]
    //step4: pushing random color in game sequence
    gameSeq.push(randColor);
    console.log("the gameSeq is :");
    console.log(gameSeq);
    gameFlash(randBtn); 
}

//step5: checkimg gameseq and userSeq

function checkAns(idx){
    console.log("current level: ", level); //this curr level length is size of both gameSeq and userSeq
    
    if(userSeq[idx]== gameSeq[idx]){ //this line game generated color and user pressed color is compared to be equal
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000); //adding 1sec delay to levelUPp to nxt level, bcs in case same color flash two times user can't see that 
        }
    }else{
        h2.innerHTML = `Gamve over! Your score was : ${level} <br> Press any key to start game again`;
        //final step: to reset the game once the game is over
    
        bgFlash();
        reset(); //this function given in last

    }
}

function bgFlash(){
    body.classList.add("bgcolor");
        setTimeout(function(){
            body.classList.remove("bgcolor");
        },250);
}

/*now a random button is flashed , now to continue the game same btn has to be pressed again,
then another btn flashes , again user has to continue the sequence from firsts.If
wrongly pressed game ends*/

//step3; adding event listeners
//button pressed by the user
function btnPress(){
    console.log(this); //this gives btn which is pressed , i.e) click is triggered by which btn
    let btn = this;
    userFlash(btn); //when user click the btn also we need the btn to flash

    //step4: when user press the button, it should be added in the gameSeq
    userColor =btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("the userSeq is:");
    console.log(userSeq);
    console.log(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
     btn.addEventListener("click",btnPress); //here we have given click event listener - for this purpose only we gave type:"button" for all divs
     //btnPress is callback, the above btnPres() is called
}

function reset(){
    started = false; // again giving value false to the started
    gameSeq =[];
    userSeq = [];
    level = 0;
}

