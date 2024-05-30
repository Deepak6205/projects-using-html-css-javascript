let toastBox = document.getElementById("toastBox");
let successMsg = ' <i class="fa-solid fa-circle-check"></i> You nailed it good job bro';
let blunderMsg = ' <i class="fa-solid fa-circle-xmark"></i> what the fuck have u done nigga!!!';
let dumbAssMsg = ' <i class="fa-solid fa-circle-exclamation"></i> get the fuck out here jack Ass Bitch!!';

function showToast(msg){
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML=msg;
    toastBox.appendChild(toast);

    if(msg.includes('what')){
        toast.classList.add('error');
    }
    if(msg.includes('jack')){
        toast.classList.add('invalid');
    }
    setTimeout(()=>{
        toast.remove();
    },4000);
}