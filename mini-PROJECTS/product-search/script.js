let products = {
    data:[{
        productName: "Regular white T-shirt",
        category: 'Top-wear',
        price: "300",
        image:'images/t-shirt.webp'
    },
    {
        productName: "beige short skirt",
        category: 'Bottom-wear',
        price: "350",
        image:'images/skirt.webp'
    },
    {
        productName: "Sporty smart watch",
        category: 'watch',
        price: "999",
        image:'images/watch.jpg'
    },
    {
        productName: "Basic Knitted top",
        category: 'Top-wear',
        price: "250",
        image:'images/top.jpg'
    },
    {
        productName: "Black Leather Jacket",
        category: 'Jacket',
        price: "1299",
        image:'images/bj.jpg'
    },
    {
        productName: "Stylish Pink Trouser",
        category: 'Bottom-wear',
        price: "399",
        image:'images/pink.jpg'
    },
    {
        productName: "Brown Leather Jacket",
        category: 'Jacket',
        price: "1499",
        image:'images/brj.jpg'
    },
    {
        productName: "comfy gray pant",
        category: 'Bottom-wear',
        price: "1499",
        image:'images/grayp.jpg'
    }
]
}

for(let i of products.data){
    //create Card
    let card = document.createElement('div');
    //card should have category and should stay hidden initially.
    card.classList.add('card',i.category,'hide');
    //image div
    let imageContainer = document.createElement("div");
    imageContainer.classList.add('image-container');
    //img tag
    let image = document.createElement('img');
    image.setAttribute('src',i.image);
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    //container
    let container = document.createElement('div');
    container.classList.add("container");
    //product name
    let name = document.createElement('h5');
    name.classList.add('product-name');
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name);
    //price
    let price = document.createElement("h6");
    price.innerText = '₹ ' + i.price;

    container.appendChild(price);
    card.appendChild(container);
    document.getElementById("products").appendChild(card);
    
}
// parameter passed from button.(parameter should be same as category)
function filterProduct(value){
    //button class
    let buttons = document.querySelectorAll('.button-value');
    buttons.forEach((button)=>{
        //check if value equals innerText
        if(value.toUpperCase() == button.innerText.toUpperCase()){
            button.classList.add('active');
        }else{
            button.classList.remove('active');
        }
    })

    //select all cards
    let elements = document.querySelectorAll('.card');
    elements.forEach((element)=>{
        //display all cards on 'all' nutton click
        if(value == 'all'){
            element.classList.remove('hide');
        }else{
            //check if elements contains category class
            if(element.classList.contains(value)){
                //display element based on category.
                element.classList.remove('hide');
            }else{
                //hide other elements
                element.classList.add('hide');
            }
        }
    })
}

//search button click
document.getElementById('search').
addEventListener("click",()=>{
    //initilization
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll('.card');
    //loop through all elements
    elements.forEach((element,index)=>{
        // check if the text includes the search value
        if(element.innerText.includes(searchInput.toUpperCase())){
            //display matching cards
            cards[index].classList.remove('hide');
        }else{
            //hide others
            cards[index].classList.add('hide');
        }
    })
})

//initially display all product.
window.onload = ()=>{
    filterProduct('all');
}