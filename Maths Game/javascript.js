//if we click on the start button
var playing=false
var score
var action, timeremaining
var correctAns;
document.getElementById("st_but").onclick=function(){
    //if we are playing
    if(playing==true){
        location.reload();  //reload page
    }
    else{ 
        playing=true
        
        //if we are not playing
        score=0   //set score to 0
        document.getElementById("score_value").innerHTML=score;
        //show countdown box
        show("time");
        timeremaining=60
        document.getElementById("time_rem_value").innerHTML=timeremaining;
        //hide game over box
       hide("game_over");

        //change button to reset
        document.getElementById("st_but").innerHTML="Reset Game";
        //start countdown
        start_countdown();

        generate_qa();   //generate g&a
        
    }
}

    for(var j=1;j<5;j++){
        document.getElementById("box"+j).onclick=function(){
            //if we ar playing
            if(playing==true){//if box has correct ans
                if(this.innerHTML==correctAns){
                    //score incremnt
                    score++;
                    document.getElementById("score_value").innerHTML=score;
                   
                    hide("wrong");
                    show("correct");
                    setTimeout(function(){
                        hide("correct");
                    },1000);
                    //generat q&a
                    generate_qa();
                    
                }
                else{
                    
                    hide("correct");
                    show("wrong");
                    setTimeout(function(){
                        hide("wrong");
                    },1000);
                    document.getElementById("choices").style.backgroundColor="crimson";
                    //generat q&a
                   
                }
            }
        }
    }
   




function start_countdown(){
   action=setInterval(function(){
    timeremaining-=1            //reduce time by 1 sec in loops
    document.getElementById("time_rem_value").innerHTML=timeremaining;
  

   if(timeremaining==0){  //game over
       stop_countdown();  
       show("game_over");
       document.getElementById("game_over").innerHTML="<p>Game over!</p><p>Your score is " +score+ "</p>";
       hide("time")
       hide("correct");
       hide("wrong")
    
       playing=false;
       document.getElementById("st_but").innerHTML="Start Game";

   }
},1000);
}
function stop_countdown(){
    clearInterval(action)   
}
//hide element
function hide(Id){
    document.getElementById(Id).style.display="none";
}
//show element
function show(Id){
    document.getElementById(Id).style.display="block";
}
//generate g&a
function generate_qa(){
    var x=1+(Math.round(9*Math.random()));   //a digit b/w 1 to 10
    var y=1+(Math.round)(9*Math.random());
    correctAns=x*y;

    document.getElementById("question").innerHTML=x+" x "+y;   

    var correctPosition= 1+(Math.round(3*Math.random()));  //generate a random box 

    document.getElementById("box"+correctPosition).innerHTML=correctAns;   //fill onebox with correct ans

    //fill other boxes with wrong ans
    var answers=[correctAns]

    for(var i=1;i<5;i++){
        if(i!=correctPosition){
            var  wrongAns;
            do{
             wrongAns=1+(Math.round(9*Math.random()))*1+(Math.round(9*Math.random()));
        
        }while(answers.indexOf(wrongAns)>-1)
        document.getElementById("box"+i).innerHTML=wrongAns;
        answers.push(wrongAns);
    }
    }

}