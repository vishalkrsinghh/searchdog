
// lists of all dogs   ---   https://dog.ceo/api/breeds/list/all
// for random image of african dog we can change african to boxer        ---   https://dog.ceo/api/breed/african/images/random


// styling  by jQuery

$("#img").css({
    "width": "250px",
    "height": "250px",
    "box-shadow": "2px 2px 10px 5px black",
    "color": "black",
    "font-weight": "bolder",
})
$("#display").css({
    "background-color": "grey",
    "width": "fit-content",
    "margin-top": "30px",
    "border": "1px solid red",
})
$(".input").css({
    "outline": "none",
    "text-align": "center",
    "margin-top": "50px",
    "height": "30px",
    "width": "15rem",
    "font-size": "1.2rem",
    "border": "1px solid grey",
    "box-shadow": "2px 2px 10px -2px black",
})
$("#dogName").css({
    "text-align": "center",
})
$("#main").css({
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
})
$(".sel").css({
    "display": "flex",
    "flex-direction": "column",
    "align-items": "center",
})
$("#selOpt").css({
    "margin-top": "0px",
})
$("#selOptSec").css({
    "margin-top": "0px",
})


// --------------- CODE FOR SELECT TAG ELEMENT  --------------------  //

let x = 0;   //  we use this because all the OPTIONS elements must append only once on clicking select element
let mainObjLength = 0;
let run = () => {
    let xhrRn = new XMLHttpRequest();
    x++;         //   for x==1;
    xhrRn.open("get", "https://dog.ceo/api/breeds/list/all", true);
    xhrRn.send();
    let data = "";
    let mainObj = ""

    // below line code is for deleting options of subbreed, because it increases on every search.
    let sub = document.getElementsByClassName("subBreed");
    for (let i = 0; i < sub.length; i++) {
        sub[i].style.display = "none";
    }
    //  below code is also correct

    // xhrRn.onreadystatechange=()=>{
    //     if(xhrRn.readyState==4 && xhrRn.status==200 && x==1){
    //         data=xhrRn.responseText;
    //             data=JSON.parse(data)
    //             mainObj=data.message

    //             for(let key in mainObj){

    //                 let option= document.createElement("option");
    //                 option.setAttribute("value", key);
    //                 option.innerText=`${key}`
    //                 select.append(option);
    //                 console.log(key);

    //             }
    //     }
    // }
    xhrRn.onload = () => {
        if (x == 1) {    // we use x here if x==1 then append all OPTIONS element other wise not Append 
            data = xhrRn.responseText;
            data = JSON.parse(data)
            mainObj = data.message

            for (let key in mainObj) {

                let option = document.createElement("option");
                option.setAttribute("value", key);
                option.innerText = `${key}`
                select.append(option);
                // console.log(key);

            }
        }
    }
    let selectVal = $("#selOpt").val();

    let subBreedxhrRn = new XMLHttpRequest();
    subBreedxhrRn.open("get", `https://dog.ceo/api/breed/${selectVal}/list`, true);
    subBreedxhrRn.send();
    subBreedxhrRn.onload = () => {
        data = subBreedxhrRn.responseText;
        data = JSON.parse(data)
        // console.log(data);
        mainObj = data.message
        // console.log(mainObj, mainObj.length);
        mainObjLength = mainObj.length;
        if (mainObj.length >= 1 && selectVal !== "select") {

            $("#sel").css({
                "display": "block",
            })
            $("#h3").css({
                "display": "block",
                "text-align":"center",
                "margin-top": "50px",
            })
            for (let key of mainObj) {

                let option = document.createElement("option");
                option.setAttribute("value", key);
                option.setAttribute("class", "subBreed");
                option.innerText = `${key}`
                select2.append(option);
                // console.log(key);

            }
        }
        else {
            $("#sel").css({
                "display": "none",
            })
            $("#h3").css({
                "display": "none",
            })
        }
    }
}
let select = document.getElementById("selOpt");
let select2 = document.getElementById("selOptSec");
select.addEventListener("click", run);


// --------------- CODE FOR FIND BUTTON  --------------------  //
let valu = "";
let valu2 = "";
let newVal = "";
let newVal2 = "";
let url = "";
let reltex = "";
let xhrReq = new XMLHttpRequest();



function xhrR() {
    // valu = $("#input").val().toLowerCase();    //  this is for typing input field value
    valu = $("#selOpt").val();                    //  this is for Select/option field value
    valu2 = $("#selOptSec").val();
    $("#dogName").text(` Dog Name :-  ${valu}`);
    newVal = valu;
    newVal2 = valu2;
    // console.log(valu, valu2);
    if (mainObjLength >= 1) {
        url = `https://dog.ceo/api/breed/${valu}/${valu2}/images/random`;
    }
    else {
        url = `https://dog.ceo/api/breed/${valu}/images/random`
    }
    xhrReq.open("get", url, true)
    xhrReq.send();
    xhrReq.onload = () => {
        reltex = xhrReq.responseText;
        $("#img").attr("src", JSON.parse(reltex).message)
        // console.log(responseText)
    }
    $("#img").removeAttr("src");
    // valu = $("#input").val("");                  //  this is for blank field value after search
    valu = $("#selOpt").val("select");              //  this is for blank Select/option value after search
    valu2 = $("#selOptSec").val("select");
    $("#sel").css({
        "display": "none",
    })
}
$("#inpSearch").click(xhrR);


// --------------- CODE FOR NEXT BUTTON  --------------------  //

$("#next").click(() => {
    let url = "";
    if (mainObjLength >= 1) {
        url = `https://dog.ceo/api/breed/${newVal}/${newVal2}/images/random`;
    }
    else {
        url = `https://dog.ceo/api/breed/${newVal}/images/random`;
    }
    xhrReq.open("get", url, true)
    xhrReq.send();
    xhrReq.onload = () => {
        reltex = xhrReq.responseText;
        $("#img").attr("src", JSON.parse(reltex).message);
    }
})






