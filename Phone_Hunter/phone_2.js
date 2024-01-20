const body = document.getElementById('body');
const main = document.createElement('main');
main.classList.add('main')
main.innerHTML = `
<h1 class="title">Mobile Hunter</h1>
<div class="field">
<input id="text-field" type="text" placeholder="Search any phone...">
<button id="search-btn">Search</button>
<h1 id="loader">Loader.....</h1>
</div>
`
body.appendChild(main)

let isLoading = false;
const getLoader = () => {
    if (isLoading) {
        document.querySelector('#loader').style.display = "block"
    }
    else {
        document.querySelector('#loader').style.display = "none"
    }
}

const getPhoneFromApi = async () => {
    isLoading = true;
    getLoader()
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json()
    isLoading = false;
    getLoader()
    if(data.data.length > 6){
        showMore.style.display = 'block'
    }
    displayPhoneData(data,6)
}
getPhoneFromApi()


const showAllContainer = document.createElement('div')
showAllContainer.classList.add('showAll-Container')
// showAllContainer.style.display = 'none'
const showMore = document.createElement('button')
showMore.classList.add('show-more')
showMore.innerText = "Show More"
showMore.style.display = 'none'
showAllContainer.appendChild(showMore)
body.appendChild(showAllContainer)

const displayPhoneData = (phones,initialCount) => {
    console.log(phones)
    const noFoundMsg = document.createElement('h1')
    noFoundMsg.classList.add('no-found-msg')
    noFoundMsg.innerText = 'No found any phone. Try another search'
     const previousNoFoundMsg = document.querySelector('.no-found-msg')
     if(previousNoFoundMsg){
        previousNoFoundMsg.remove()
     }
    if (phones.data.length === 0) {
        noFoundMsg.style.display = 'block'
        showMore.style.display = 'none'
    }
    else {
        noFoundMsg.style.display = 'none'
    }

    const phoneContainer = document.createElement('div')
    phoneContainer.classList.add('phone-container')
    phones.data.slice(0,initialCount).forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('phone')
        phoneDiv.innerHTML +=
            `  <img class="phn-img" src=${phone.image} alt="">
        <h2 class="phn-name">${phone.phone_name}</h2>
        <button class="button">Button</button>
        `
        phoneContainer.appendChild(phoneDiv)

    });
    main.appendChild(noFoundMsg)
    main.appendChild(phoneContainer)

    showMore.addEventListener('click',()=>{
       const previousContainer = document.querySelector('.phone-container')
       previousContainer.remove()
        displayPhoneData(phones, phones.data.length)
            showMore.style.display = 'none'
    })

}
main.addEventListener('click',(event)=>{
    const clickElement = event.target
    if(clickElement.classList.contains('button')){
        const phoneContainer = clickElement.closest('.phone')
        const phoneName = phoneContainer.querySelector('.phn-name').innerText;
        console.log(phoneName);
        const imageElement = phoneContainer.querySelector('.phn-img')
        const phnImg = imageElement ? imageElement.getAttribute('src') : null;
        const modalBody = document.querySelector('.modal-body')
        modalBody.innerHTML = `
        <img class="phn-img" src=${phnImg} alt="">
        <h2 class="phn-name">${phoneName}</h2>
        <button class="button">Button</button>
        `
        modal.style.display = 'block'
    }

})
const searchBtn = document.querySelector('#search-btn')
if (searchBtn) {
    console.log(searchBtn)
    searchBtn.addEventListener('click', () => {
        const searchField = document.querySelector('#text-field').value
        console.log(searchField)
        isLoading = true;
        getLoader()
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField}`)
            .then(res => res.json())
            .then(data => {
                const previousContainer = document.querySelector('.phone-container')
                previousContainer.remove()
                    isLoading = false;
                    getLoader()
                    if(data.data.length> 6){
                        showMore.style.display = 'block'
                    }
                    displayPhoneData(data,6)
            })
    })
}


 const searchField = document.querySelector('#text-field');
 searchField.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        isLoading = false
        getLoader()
     const searchValue = searchField.value;
     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
     .then(res=>res.json())
     .then(data=>{
       const phoneContainer= document.querySelector('.phone-container')
       if(phoneContainer){
        phoneContainer.remove()
       }
       if(data.data.length > 6){
          searchBtn.style.display = 'block'
       }
       isLoading = false
       getLoader()
      displayPhoneData(data,6)
  
     })
      
    }
 })

const modal  = document.createElement('div')
modal.classList.add('modal-container')
modal.innerHTML = `
<div class="modal">
    <div class="modal-header">
        <span class="close-btn">&times;</span>
    </div>
    <div class="modal-body">
        
    </div>
</div>
`
body.appendChild(modal)

const closeBtn = document.querySelector('.modal .close-btn')
closeBtn.addEventListener('click',()=>{
    modal.style.display = 'none'
})
window.addEventListener('click',(event)=>{
if(event.target === modal){
    modal.style.display = 'none'
}
})
// const body = document.getElementById('body');
// const main = document.createElement('main');
// main.classList.add('main')
// main.innerHTML = `
//   <h1 class="title">Mobile Hunter</h1>
//   <div class="field">
//     <input id="text-field" type="text" placeholder="Search any phone...">
//     <button id="search-btn">Search</button>
//     <h1 id="loader">Loader.....</h1>
//   </div>
// `
// body.appendChild(main)

// let isLoading = false;
// const getLoader = () => {
//     if (isLoading) {
//         document.querySelector('#loader').style.display = "block"
//     } else {
//         document.querySelector('#loader').style.display = "none"
//     }
// }

// let phones = {}; // Initialize phones object

// const getPhoneFromApi = async () => {
//     isLoading = true;
//     getLoader()
//     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
//     phones = await res.json()

//     isLoading = false;
//     getLoader()

//     if (phones.data.length > 6) {
//         showMore.style.display = 'block'
//     }
//     displayPhoneData(phones,6)
// }

// getPhoneFromApi()

// const showAllContainer = document.createElement('div')
// showAllContainer.classList.add('showAll-Container')

// const showMore = document.createElement('button')
// showMore.classList.add('show-more')
// showMore.innerText = "Show More"
// showMore.style.display = 'none'
// showAllContainer.appendChild(showMore)
// body.appendChild(showAllContainer)

// const displayPhoneData = (phones, initialCount) => {
//     console.log(phones)
//     const noFoundMsg = document.createElement('h1')
//     noFoundMsg.classList.add('no-found-msg')
//     noFoundMsg.innerText = 'No found any phone. Try another search'
//     console.log(noFoundMsg)
//     if (phones.data.length === 0) {
//         console.log(phones.length)
//         noFoundMsg.style.display = 'block'
//     } else {
//         noFoundMsg.style.display = 'none'
//     }

//     const phoneContainer = document.createElement('div')
//     phoneContainer.classList.add('phone-container')
//     phones.data.slice(0, initialCount).forEach(phone => {
//         const phoneDiv = document.createElement('div')
//         phoneDiv.classList.add('phone')
//         phoneDiv.innerHTML +=
//             `  <img src=${phone.image} alt="">
//     <h2>${phone.phone_name}</h2>
//     <button>Button</button>
//     `
//         phoneContainer.appendChild(phoneDiv)
//     });
//     main.appendChild(noFoundMsg)
//     main.appendChild(phoneContainer)
// }

// showMore.addEventListener('click', () => {
//     const phoneContainer = document.querySelector('.phone-container');
//     phoneContainer.remove();
//     displayPhoneData(phones, phones.data.length);
//     console.log('phone', phones, 'total',phones.data.length)

//     showMore.style.display = 'none';
    
// });



// const searchBtn = document.querySelector('#search-btn')
// if (searchBtn) {
//     console.log(searchBtn)
//     searchBtn.addEventListener('click', () => {
//         const searchField = document.querySelector('#text-field').value
//         console.log(searchField)
//         isLoading = true;
//         getLoader()
//         fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField}`)
//             .then(res => res.json())
//             .then(data => {
//                 const phoneContainer = document.querySelector('.phone-container');
//                 phoneContainer.remove();
//                 isLoading = false;
//                 getLoader()
//                 if (data.data.length > 6) {
//                     showMore.style.display = 'block'
//                 }
//                 displayPhoneData(data,6)
//             })
//     })
// }
