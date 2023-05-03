const form = document.getElementById("form");

form.addEventListener("submit",addItems)
function addItems(e){
    e.preventDefault();
    const price = document.getElementById("selling-price");
    const product = document.getElementById("product");
    const category = document.getElementById("category");
    const ItemDetails ={
        price: price.value,
        product: product.value,
        category: category.value
    }
  
    const endPointUrl = "https://crudcrud.com/api/b3d17efceb814c1189fdc6ecd59a0ddb/products"

    axios.post(endPointUrl, ItemDetails).then((res)=>{
    showUserOnScreen(res.data)
    }).catch(err=>console.log(err))
  }

  window.addEventListener("DOMContentLoaded",()=>{

    axios.get("https://crudcrud.com/api/b3d17efceb814c1189fdc6ecd59a0ddb/products").then((res)=>{
       for(let i=0;i<res.data.length;i++){
        showUserOnScreen(res.data[i])
       }
    }).catch(err=>{
      console.log(err)
    })
  })



  const electronics = document.getElementById("electronics");
  const foodItems = document.getElementById("foodItems");
  const skincare = document.getElementById("skincare");
 
  function showUserOnScreen(productDetails){

    const li = document.createElement("li");
    const priceTextNode = document.createTextNode(`${productDetails.price} - `);
    const productTextNode = document.createTextNode(productDetails.product);
    const categoryTextNode = document.createTextNode(` - ${productDetails.category} `);
    li.append(priceTextNode, productTextNode, categoryTextNode);

    const delButton = document.createElement("button");
    const delButtonNode = document.createTextNode("Delete Order");
    delButton.appendChild(delButtonNode);

    li.append(delButton);

    if(productDetails.category ==='Electronics'){
        electronics.appendChild(li);
    }
    else if(productDetails.category ==='food'){
        foodItems.appendChild(li)
    }
    else {
        skincare.appendChild(li)
    }

    delButton.addEventListener("click",()=>{
      axios.delete(`https://crudcrud.com/api/b3d17efceb814c1189fdc6ecd59a0ddb/products/${productDetails._id}`).then(()=>{
        li.remove()
      }).catch(err => console.log(err))
    })
  }  