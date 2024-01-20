const body = document.getElementById('body');
const main = document.createElement('main');
main.classList.add('main');
main.innerHTML =
    `
    <h1>Mobile Hunter</h1>
    <div id="input-search">
        <input id="search-field" type="text" placeholder=" Search any phone...">
        <button id="search-btn">Search</button>
        <h1 id="loader">Loading...</h1>
    </div>
`
body.appendChild(main);

const showAllBtnContainer = document.createElement('div');
showAllBtnContainer.classList.add('showAllBtn-container');
// showAllBtnContainer.style.display = 'none'
const showMoreBtn = document.createElement('button');
showMoreBtn.classList.add('show-all-btn');
showMoreBtn.innerText = 'Show More';
showMoreBtn.style.display = 'none'
showAllBtnContainer.appendChild(showMoreBtn);
body.appendChild(showAllBtnContainer);

let isLoader = false;

const getLoader = () => {
    if (isLoader) {
        document.querySelector('#loader').style.display = 'block';
    } else {
        document.querySelector('#loader').style.display = 'none';
    }
};

const displayPhoneApi = (phones, initialCount) => {
    const noFoundMsg = document.createElement('h1');
    noFoundMsg.classList.add('no-found-msg');
    noFoundMsg.style.display = 'none'
    noFoundMsg.innerText = 'Not Found Any Phone. Please another search!!'
    const previousNoFoundMsg = document.querySelector('.no-found-msg');
    if (previousNoFoundMsg) {
        previousNoFoundMsg.remove();
    }

    if (phones.data.length === 0) {
        noFoundMsg.style.display = 'block';
        console.log(noFoundMsg)
        showMoreBtn.style.display = 'none'
    } else {
        noFoundMsg.style.display = 'none';
    }

    const phoneContainer = document.createElement('div');
    phoneContainer.classList.add('phone-container');
    phones.data.slice(0, initialCount).forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('phone');
        phoneDiv.innerHTML = `
            <img class="phone-img" src=${phone.image} alt=""/>
            <div class="phone-info">
                <h2 class="name">${phone.phone_name}</h2>
                <h4 class="brand">${phone.brand}</h4>
                <h4>${phone.slug}</h4>
                <button class="detail-btn">Details</button>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    main.appendChild(noFoundMsg)
    main.appendChild(phoneContainer);
    showMoreBtn.addEventListener('click', () => {
        const previousContainer = document.querySelector('.phone-container')
        previousContainer.remove()
        displayPhoneApi(phones, phones.data.length)
        console.log(phones, phones.data.length)
        showMoreBtn.style.display = 'none'
    })
};

// main.addEventListener('click',(event)=>{
//     console.log(main)
//   const clickElement = event.target;
//   console.log(clickElement)
//   if(clickElement.classList.contains('detail-btn')){
//   const phoneName = clickElement.parentElement.querySelector('.name').innerText
//   // it is the one option to get the image from the html
// //const phoneImg = clickElement.parentElement.querySelector('.phone-img').getAttribute('src')
// // if first option is not working then we will use this second option
// // first retrieve phone-img by the use of id
// const phoneImgElement = document.querySelector('.phone-img')
// // then store it a variable name phoneImg and check tertiary condition if there is a phone-img id in the HTML then it has getAttribute('src') or null (: null)
// const phoneImg = phoneImgElement ? phoneImgElement.getAttribute('src') : null
//   console.log(phoneImg)
//   const phoneBrand = clickElement.parentElement.querySelector('.brand').innerText
//   const modalBody  =  document.querySelector('.modal-body')
//   modalBody.innerHTML =`

//         <img src=${phoneImg} alt=${phoneName}>
//             <div class="">
//                 <h2>${phoneName}</h2>
//                 <h4>${phoneBrand}</h4>
//             </div>

//   `
//   modal.style.display = 'block'
//   }

// })
main.addEventListener('click', (event) => {
    const clickElement = event.target;
    if (clickElement.classList.contains('detail-btn')) {
        const phoneContainer = clickElement.closest('.phone');
        const phoneName = phoneContainer.querySelector('.name').innerText;
        const phoneImgElement = phoneContainer.querySelector('.phone-img');
        const phoneImg = phoneImgElement ? phoneImgElement.getAttribute('src') : null;
        const phoneBrand = phoneContainer.querySelector('.brand').innerText;
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <img src="${phoneImg}" alt="${phoneName}">
            <div>
                <h2>${phoneName}</h2>
                <h4>${phoneBrand}</h4>
            </div>
        `;
        modal.style.display = 'block';
    }
});



const getPhoneFromApi = async () => {
    isLoader = true;
    getLoader();
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    isLoader = false;
    getLoader();
    if (data.data.length > 6) {
        showMoreBtn.style.display = 'block'
    }
    displayPhoneApi(data, 6);
};

getPhoneFromApi();

const searchBtn = document.querySelector('#search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        console.log(searchBtn);
        const searchField = document.querySelector('#search-field').value;
        console.log(searchField);
        isLoader = true;
        getLoader();
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField}`)
            .then(res => res.json())
            .then(data => {
                const previousContainer = document.querySelector('.phone-container')
                previousContainer.remove()
                isLoader = false;
                getLoader();
                if (data.data.length > 6) {
                    showMoreBtn.style.display = 'block'
                }
                displayPhoneApi(data, 6)

            });
    });
}

const searchField = document.querySelector('#search-field')
searchField.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        isLoader = true;
        getLoader()
        const searchValue = searchField.value;
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        const data = await res.json()
        const previousContainer = document.querySelector('.phone-container')
        previousContainer.remove()
        isLoader = false;
        getLoader()
        if (data.data.length > 6) {
            showMoreBtn.style.display = 'block'

        }
        displayPhoneApi(data, 6)
    }
})


const modal = document.createElement('div')
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
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'
})
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'
    }
})