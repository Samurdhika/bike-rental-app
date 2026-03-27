const apiURL = "https://corsproxy.io/?https://www.cc.puv.fi/~hmh/fed/fedApi/bikes";

const container = document.getElementById("bikeContainer");

const modal = document.getElementById("bikeModal");
const modalImg = document.getElementById("modalImg");
const modalModel = document.getElementById("modalModel");
const modalManuf = document.getElementById("modalManuf");
const modalGear = document.getElementById("modalGear");
const modalDetails = document.getElementById("modalDetails");
const modalSize = document.getElementById("modalSize");

const closeBtn = document.querySelector(".close");


// LOAD ALL BIKES
fetch(apiURL)
.then(response => response.json())
.then(data => {

console.log("API DATA:", data);

data.forEach(bike => {

const card = document.createElement("div");
card.classList.add("bike-card");

card.innerHTML = `
<img src="${bike.img_url}" alt="${bike.model}">
<h3>${bike.model}</h3>
<button class="rent-btn">Rent Bike</button>
`;

// OPEN MODAL WHEN CARD CLICKED
card.onclick = () => openModal(bike.id);

// RENT BUTTON
const rentBtn = card.querySelector(".rent-btn");

rentBtn.onclick = (e) => {

e.stopPropagation(); // stop modal opening

// GO TO RENT PAGE WITH BIKE ID
window.location.href = "rent.html?id=" + bike.id;

};

container.appendChild(card);

});

})
.catch(error => console.error("API ERROR:", error));




// OPEN MODAL WITH BIKE DETAILS
function openModal(id){

fetch("https://corsproxy.io/?https://www.cc.puv.fi/~hmh/fed/fedApi/bikes?id=" + id)

.then(response => response.json())

.then(bike => {

modal.style.display = "flex";

modalImg.src = bike.img_url;
modalModel.innerText = bike.model;
modalManuf.innerText = "Manufacturer: " + bike.manuf;
modalGear.innerText = "Gears: " + bike.gear + " (" + bike.gear_manuf + ")";
modalDetails.innerText = bike.details;
modalSize.innerText = "Wheel size: " + bike.size;

});

}



// CLOSE MODAL
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = function(event){
if(event.target == modal){
modal.style.display = "none";
}
}