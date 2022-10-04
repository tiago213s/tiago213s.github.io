// document.addEventListener("DOMContentLoaded", () => {
//     let questions = document.querySelectorAll(".faq_boxes");
//     // console.log(questions)

//     questions.forEach(function (question) {
//         question.addEventListener("click", handleClick);
//     });
// });

// function handleClick (event) {
//     console.log(event.target)
// }

let q1 = document.getElementById("q1")
function toggle1 () {

    if(q1){
        var display = q1.style.display
        
        if(display == "inline-block"){
            q1.style.display = "none"
        } else {
            q1.style.display = "inline-block"
        }

    }
}

let q2 = document.getElementById("q2")
function toggle2 () {

    if(q2){
        var display = q2.style.display
        
        if(display == "inline-block"){
            q2.style.display = "none"
        } else {
            q2.style.display = "inline-block"
        }

    }
}

let q3 = document.getElementById("q3")
function toggle3 () {

    if(q3){
        var display = q3.style.display
        
        if(display == "inline-block"){
            q3.style.display = "none"
        } else {
            q3.style.display = "inline-block"
        }

    }
}

let q4 = document.getElementById("q4")
function toggle4 () {

    if(q4){
        var display = q4.style.display
        
        if(display == "inline-block"){
            q4.style.display = "none"
        } else {
            q4.style.display = "inline-block"
        }

    }
}
