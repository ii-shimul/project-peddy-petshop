// to store the id of the active button for sorting
let activeBtn = "";

// function for displaying pets

function displayPets(link, sort = false) {
	const petContainer = document.getElementById("pet-container");
	petContainer.innerHTML =
		'<div id="loading-spinner" class="col-span-3 h-48 flex items-center justify-center"><div class="loading loading-ball loading-lg"></div></div>';
	fetch(link)
		.then((res) => res.json())
		.then((Data) => {
			if (Data.pets) {
				setTimeout(() => {
					if (sort) {
						Data.pets = Data.pets.sort(
							(a, b) => (b.price || 0) - (a.price || 0)
						);
					}
					document.getElementById("loading-spinner").classList.add("hidden");
					Data.pets.forEach((pet) => {
						const petCard = document.createElement("div");
						petCard.innerHTML = `
            <div class="border-2 rounded-xl p-5">
            
                <img class="rounded-xl mb-5" src="${pet.image}" alt="">
                <h1 class="text-2xl font-bold mb-3">${
									pet.pet_name ? pet.pet_name : "Not available"
								}</h1>
                <div class="flex flex-col space-y-2 text-gray-600">
                  <div class="flex items-center">
                    <i class="fas fa-th mr-2"></i>
                    <span>Breed : ${
											pet.breed ? pet.breed : "Not available"
										}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span>Birth : ${
											pet.date_of_birth ? pet.date_of_birth : "Not available"
										}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-venus mr-2"></i>
                    <span>Gender : ${
											pet.gender ? pet.gender : "Not available"
										}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-dollar-sign mr-2"></i>
                    <span>Price : ${
											pet.price ? pet.price : "Not available"
										}$</span>
                  </div>
                </div>
                <hr class="my-4">
                <!-- * buttons -->
                <div class="flex justify-between">
                  <button id="liked-${
										pet.petId
									}" onclick="buttonDisable('liked-${
							pet.petId
						}'); likeBtn('liked-${pet.petId}')"
                    class="flex items-center justify-center border rounded-lg py-2 px-4 text-gray-500 hover:bg-gray-100">
                    <i class="fas fa-thumbs-up"></i>
                  </button>
                  <button id="adopt-${
										pet.petId
									}" onclick="startCountdown(); buttonDisable('adopt-${
							pet.petId
						}'); my_modal_5.showModal(); " class="btnAdopt border rounded-lg px-4 py-2 text-teal-600 font-bold hover:bg-gray-100">
                    Adopt
                  </button>
                  <button id="details-${
										pet.petId
									}" onclick="modalShow('details-${
							pet.petId
						}');" class="border rounded-lg px-4 py-2 text-teal-600 font-bold hover:bg-gray-100">
                    Details
                  </button>
                </div>
              </div>
          `;
						petContainer.append(petCard);
					});
				}, 2000);
			} else {
				setTimeout(() => {
					if (sort) {
						Data.data = Data.data.sort(
							(a, b) => (b.price || 0) - (a.price || 0)
						);
					}
					petContainer.innerHTML = "";
					if (Data.data.length === 0) {
						petContainer.innerHTML = `
          <div class="flex flex-col items-center justify-center bg-[#f8f8f8] h-full w-full col-span-3 py-24 rounded-lg max-sm:py-12 ">
            <img src="images/error.webp" alt="">
            <h1 class="font-extrabold text-4xl text-center max-sm:text-2xl">No pets available in this category ;(</h1>
            <p class="mb-6 mt-8 text-center opacity-70 max-sm:text-sm max-sm:mt-5 max-sm:w-[80%] max-2xl:w-[60%] 2xl:w-[60%]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a.</p>
          </div>
          `;
						return;
					}
					Data.data.forEach((pet) => {
						const petCard = document.createElement("div");
						petCard.innerHTML = `
          <div class="border-2 rounded-xl p-5">
                <img class="rounded-xl mb-5" src="${pet.image}" alt="">
                <h1 class="text-2xl font-bold mb-3">${
									pet.pet_name ? pet.pet_name : "Not available"
								}</h1>
                <div class="flex flex-col space-y-2 text-gray-600">
                  <div class="flex items-center">
                    <i class="fas fa-th mr-2"></i>
                    <span>Breed : ${
											pet.breed ? pet.breed : "Not available"
										}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span>Birth : ${
											pet.date_of_birth ? pet.date_of_birth : "Not available"
										}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-venus mr-2"></i>
                    <span>Gender : ${
											pet.gender ? pet.gender : "Not available"
										}</span>
                  </div>
                  <div class="flex items-center">
                    <i class="fas fa-dollar-sign mr-2"></i>
                    <span>Price : ${
											pet.price ? pet.price : "Not available"
										}$</span>
                  </div>
                </div>
                <hr class="my-4">
                <!-- * buttons -->
                <div class="flex justify-between">
                  <button id="liked-${
										pet.petId
									}" onclick="buttonDisable('liked-${
							pet.petId
						}'); likeBtn('liked-${pet.petId}')"
                    class="flex items-center justify-center border rounded-lg py-2 px-4 text-gray-500 hover:bg-gray-100">
                    <i class="fas fa-thumbs-up"></i>
                  </button>
                  <button id="adopt-${
										pet.petId
									}" onclick="startCountdown(); buttonDisable('adopt-${
							pet.petId
						}'); my_modal_5.showModal();" class="btnAdopt border rounded-lg px-4 py-2 text-teal-600 font-bold hover:bg-gray-100">
                    Adopt
                  </button>
                  <button id="details-${
										pet.petId
									}" onclick="modalShow('details-${
							pet.petId
						}');" class="border rounded-lg px-4 py-2 text-teal-600 font-bold hover:bg-gray-100">
                    Details
                  </button>
                </div>
              </div>
          `;
						petContainer.append(petCard);
					});
				}, 2000);
			}
		});
}

// data fetching for all pets

displayPets("https://openapi.programming-hero.com/api/peddy/pets");

// button disable function for like and adopt button

function buttonDisable(id) {
	const btn = document.getElementById(id);
	btn.disabled = true;
	btn.classList.remove("hover:bg-gray-100");
	btn.classList.add("bg-gray-300", "cursor-not-allowed");
	if (id.split("-").includes("adopt")) {
		btn.innerText = "Adopted";
	}
}

// adding liked pets to the favorite pets section
function likeBtn(id) {
	const idSplit = id.split("-");
	fetch(`https://openapi.programming-hero.com/api/peddy/pet/${idSplit[1]}`)
		.then((res) => res.json())
		.then((pet) => {
			const favContainer = document.getElementById("fav-pets");
			const div = document.createElement("div");
			div.classList.add("p-4", "rounded-xl", "border-2", "max-md:p-2");
			div.innerHTML = `
      <img class="rounded-xl" src="${pet.petData.image}" alt="">
      `;
			favContainer.appendChild(div);
		});
}

// modal showing function with details when button details button clicked

function modalShow(id) {
	fetch(
		`https://openapi.programming-hero.com/api/peddy/pet/${id.split("-")[1]}`
	)
		.then((res) => res.json())
		.then((data) => {
			const pet = data.petData;
			const modal = document.getElementById("petDetails");
			modal.innerHTML = `
      <div class="modal-box w-[40%] max-w-5xl max-sm:w-[90%] max-md:w-[90%] max-lg:w-[70%]">
            <img class="rounded-xl border w-full" src="${pet.image}" alt="">
            <h3 class="text-3xl font-bold my-4">${
							pet.pet_name ? pet.pet_name : "Not available"
						}</h3>
            <div class = "grid grid-cols-2 gap-3 text-gray-500">
              <div class="flex items-center">
              <i class="fas fa-th mr-2"></i>
              <span>Breed : ${pet.breed ? pet.breed : "Not available"}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-calendar-alt mr-2"></i>
                <span>Birth : ${
									pet.date_of_birth ? pet.date_of_birth : "Not available"
								}</span>
                  </div>
                  <div class="flex items-center">
                  <i class="fas fa-venus mr-2"></i>
                  <span>Gender : ${
										pet.gender ? pet.gender : "Not available"
									}</span>
                    </div>
                    <div class="flex items-center">
                    <i class="fas fa-dollar-sign mr-2"></i>
                    <span>Price : ${
											pet.price ? pet.price : "Not available"
										}$</span>
              </div>
              <div class="flex items-center col-span-2">
                <i class="fa-solid fa-syringe mr-2"></i>
                <span>Vaccination Status : ${
									pet.vaccinated_status
										? pet.vaccinated_status
										: "Not available"
								}</span>
              </div>
            </div>
            <hr class="my-4">
            <div>
            <h1 class="text-xl font-bold mb-2">Detailed Information</h1>
              <p class="text-gray-500">
              ${pet.pet_details ? pet.pet_details : "Not available"}
              </p>
  
              </div>
              
            <div class="modal-action w-full">
            <form method="dialog" class="w-full">
                <button class="btn w-full bg-[#0E7A81] bg-opacity-20 text-[#0E7A81]">Close</button>
              </form>
            </div>
            </div>
            `;
		});

	petDetails.showModal();
}

// data fetching for category buttons
fetch("https://openapi.programming-hero.com/api/peddy/categories")
	.then((res) => res.json())
	.then((data) => {
		const btnContainer = document.getElementById("btn-container");
		data.categories.forEach((category) => {
			const btn = document.createElement("button");
			btn.id = `btn-${category.category}`;
			btn.classList.add(
				"border",
				"w-full",
				"py-6",
				"flex",
				"justify-center",
				"items-center",
				"gap-4",
				"text-2xl",
				"font-bold",
				"rounded-2xl",
				"transition-all"
			);
			const img = document.createElement("img");
			img.src = category.category_icon;
			img.alt = `${category.category} icon`;
			const text = document.createTextNode(category.category);
			btn.appendChild(img);
			btn.appendChild(text);
			btn.addEventListener("click", () => {
				displayPets(
					`https://openapi.programming-hero.com/api/peddy/category/${category.category}`
				);
				btnStyleChange(btn.id);
			});
			btnContainer.appendChild(btn);
		});
	});

//  function for changing style of the button in focus

function btnStyleChange(btnId) {
	activeBtn = btnId; // its for the
	const btn = document.getElementById(btnId);
	const parent = btn.parentNode;
	const children = Array.from(parent.children);
	const siblings = children.filter((child) => btn !== child);
	btn.classList.add(
		"rounded-full",
		"border-2",
		"border-[#0e7981ca]",
		"bg-[#0E7A811A]"
	);
	siblings.forEach((sibling) => {
		sibling.classList.remove(
			"rounded-full",
			"border-3",
			"border-[#0e7981ca]",
			"bg-[#0E7A811A]"
		);
	});
}

// sort button listener
document.getElementById("sort-btn").addEventListener("click", function () {
	if (activeBtn) {
		const cate = activeBtn.split("-")[1].toLowerCase();
		const currentLink = `https://openapi.programming-hero.com/api/peddy/category/${cate}`;
		displayPets(`${currentLink}`, true);
	} else {
		displayPets("https://openapi.programming-hero.com/api/peddy/pets", true);
	}
});

// Function to start the countdown
function startCountdown() {
	let countdownTimer;
	const countdownElement = document.getElementById("countdown");
	let timeRemaining = 3;
	countdownTimer = setInterval(function () {
		if (timeRemaining < 2) {
			my_modal_5.close();
			timeRemaining = 3;
			countdownElement.style.setProperty("--value", timeRemaining);
			clearInterval(countdownTimer);
		} else {
			timeRemaining--;
			countdownElement.style.setProperty("--value", timeRemaining);
		}
	}, 1000);
}
