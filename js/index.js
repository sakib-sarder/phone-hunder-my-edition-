const loadData = (searchValue, dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
        .then(res => res.json())
        .then(data =>displayData(data.data, dataLimit))
}

const displayData = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phones-container');
    // display 10 only
    const showAll = document.getElementById('btn-show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, dataLimit);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // no message found
    const noPhoneMsg = document.getElementById('no-found-msg');
    if (phones.length == 0 ) {
        noPhoneMsg.classList.remove('d-none')
    }
    else {
        noPhoneMsg.classList.add('d-none')
    }
    
    phoneContainer.innerHTML = '';
    phones.forEach(phone => {
        // console.log(phone);
        const {image, phone_name} = phone;
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('col');
        phoneCard.innerHTML = `
        <div class="card p-4">
        <img src="${image}" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a natural
            lead....
          </p>
        </div>
        <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#phoneDetails">Details</button>
      </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })

    // stop spinner
    toggelSpinner(false);
}

document.getElementById('search-value').addEventListener('keypress', function (e) {
    if (e.key === "Enter") {
        displayBySearch(10)
    }
})

const displayBySearch = (dataLimit) => {
    toggelSpinner(true)
    const searchValue = document.getElementById('search-value').value;
    loadData(searchValue, dataLimit);
}

const toggelSpinner = isLoading => {
    const spinnerDiv = document.getElementById('spinner');
    if (isLoading) {
        spinnerDiv.classList.remove('d-none');
    }
    else {
        spinnerDiv.classList.add('d-none');
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    displayBySearch();
})


const loadPhoneDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data))
}

const displayPhoneDetails = phone => {
    console.log(phone.data.releaseDate
        );
    const modalTitle = document.getElementById('phoneDetailsLabel');
    modalTitle.innerText = phone.data.name;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <img src="${phone.data.image}">
        <p>Release Date: ${phone.data.releaseDate ? phone.data.releaseDate : "No Release Date Found"}</p>
    `;

}


loadData('apple');
