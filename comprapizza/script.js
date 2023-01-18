const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);
let modalqt;
let cart=[];
let modalkey = 0
pizzaJson.map((item,index)=>{
    let PizzaItem = c('.models .pizza-item').cloneNode(true);
    PizzaItem.setAttribute('data-key',index)
    c('.pizza-area').append(PizzaItem);
    PizzaItem.querySelector('.pizza-item--img img').src = item.img;
    PizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    PizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    PizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    PizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalqt=1;
        modalkey =key;
        c('.pizzaWindowArea').style.opacity=0;
        c('.pizzaWindowArea').style.display='flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity=1;

        },200);
        c('.pizzaBig img').src= pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML=pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML=pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML=`R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--qt').innerHTML=modalqt;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected')
            }
            size.querySelector('span').innerHTML=pizzaJson[key].sizes[sizeIndex];

        });
    });   
});

/*eventos do modal */

function CloseModal(){
    c('.pizzaWindowArea').style.opacity=0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display='none'},500);
}
cs('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click',CloseModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalqt>1){
        modalqt--;
        c('.pizzaInfo--qt').innerHTML=modalqt;
    }else{
        CloseModal();
    }
       
});
c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalqt++;
    c('.pizzaInfo--qt').innerHTML=modalqt;

});

cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected')
    })
});

c('.pizzaInfo--addButton').addEventListener('click',()=>{
        let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
        let identifier = pizzaJson[modalkey].id+'@'+size;
        let key = cart.findIndex((item)=>item.identifier == identifier)
        if (key > -1){
            cart[key].qt += modalqt;
        }else{ 
            cart.push({
                identifier,
                id:pizzaJson[modalkey].id,
                size,
                qt:modalqt
            });
        }
    updateCart();
    CloseModal();
});
c('.menu-openner').addEventListener('click',()=>{
    if(cart.length >0){
        c('aside').style.left='0';
    }

});
c('.menu-closer').addEventListener('click',()=>{
    c('aside').style.left='100vw';
});
function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;
    if(cart.length>0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        let subTotal = 0;
        let total = 0;
        let desconto = 0;
     
        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);
            subTotal+= pizzaItem.price * cart[i].qt;
            let cartItem = c('.models .cart--item').cloneNode(true);
            let pizzaSizeName;
            switch (cart[i].size){
             case 0:
                 pizzaSizeName = "P";
                 break;
            case 1 :
                pizzaSizeName = "M";
                break;
            case 2:
                pizzaSizeName = "G";
                break;
            }
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt>1){
                    cart[i].qt--;
                }else{
                    cart.splice(i ,1);
                }
                updateCart();
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            })
            c('.cart').append(cartItem);

        }
        desconto = subTotal * 0.1;
        total = subTotal - desconto;

        c('.subtotal span:last-child').innerHTML =`R$ ${subTotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    }
    else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}