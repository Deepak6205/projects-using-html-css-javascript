let icon = document.getElementById("icon");
let backImage = document.getElementsByClassName("back-img")[0];
let mainImage = document.getElementsByClassName("main-img")[0];
icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "assets/sun.png";
        backImage.src = ""
        mainImage.src = "assets/dog.png";
    }else{
        icon.src = "assets/moon.png"
        backImage.src = "assets/flower.png"
        mainImage.src = "assets/girl.png";
    }
}