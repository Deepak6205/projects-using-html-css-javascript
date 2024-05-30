const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallary");

let isImageGenerating = false;
const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject,index) => {
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");

        const downloadBtn = imgCard.querySelector(".downlad-btn");

        //set the image source to the AI-enerated image data

        const aiGeneratedImg = `data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;
        //when the image is loaded then remove the loading class. and set download attribute.

        imgElement.onload = () => {
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href",aiGeneratedImg);
            downloadBtn.setAttribute("download",`${new data().getTime()}.jpg`);
        }

    });
}
const button = document.querySelector(".generate-btn")
const generateAiImages = async (userPrompt,userImgQuantity) =>{
    try{
        //send a request to the OpenAI API to generate images based on user inputs.
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${KEY}`
            },
            body: JSON.stringify({
                prompt: userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });

        if(!response.ok) throw new Error("Failed to generate images ! Please try again.")
        const { data } = await response.json();
        updateImageCard(...data);

    } catch (error) {
        alert(error.message);
    } finally {
        isImageGenerating = false;
    }
}
// const productApi = async() => {
//     const data = await fetch("https://fakestoreapi.com/products/")
//     const response = await data.json();
//     console.log(response);
// } 
//button.addEventListener("click",() => productApi());
// const apiUrl = "https://fakestoreapi.com/products/";

// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//    });
const handleFormSubmission = (e) => {
    e.preventDefault();
    if(isImageGenerating) return;
    isImageGenerating = true;
    
    //  Get user input and image quantity values from the form
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    // Creating HTML markup for image cards with loading status.

    const imgCardMarkup = Array.from({length: userImgQuantity}, () =>
        `<div class="img-card loading">
        <img src="images/loader.svg" alt="image">
        <a href="#" class="download-btn">
            <img src="images/download.svg" alt="download icon">
        </a>
    </div>`
    ).join("");
    
    imageGallery.innerHTML = imgCardMarkup;
    generateAiImages(userPrompt,userImgQuantity);
}

generateForm.addEventListener("submit",handleFormSubmission);