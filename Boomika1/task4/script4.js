    const loadBtn = document.getElementById("loadBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const myDogBtn = document.getElementById("myDogBtn");
    const copyBtn = document.getElementById("copyBtn");
    const status = document.getElementById("status");
    const dogImage = document.getElementById("dogImage");

    const API_URL = "https://dog.ceo/api/breeds/image/random";

    const MY_DOGS = [
          "https://www.shutterstock.com/image-photo/beautiful-golden-retriever-cute-puppy-600nw-2526542701.jpg",
          "https://media.istockphoto.com/id/638918244/photo/valentines-dog-in-love.jpg?s=612x612&w=0&k=20&c=t8-BJp1UaJhJDhF09Z4r_I6bVGdt8ZiI5dMxFKidpbU=",
          "https://cdn-fastly.petguide.com/media/2022/02/28/8265323/new-puppy-checklist-what-you-need-before-you-bring-him-home.jpg",
          "https://www.thesprucepets.com/thmb/ntESqTtGM2Hxo_xLt_LkZuU8jsQ=/1183x0/filters:no_upscale():strip_icc()/dog-on-bed-56f3efd53df78ce5f8416e46.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvWXr30lZzwdvlw4-g-cIoeXd3KXDYOmz0bCmm8xrshb8sBviT2RcQMgxs-ObXpHGTk2I&usqp=CAU",
          "https://hips.hearstapps.com/hmg-prod/images/funny-dog-captions-1563456605.jpg",
          "https://heronscrossing.vet/wp-content/uploads/Golden-Retriever-1024x683.jpg",
        ];

     let currentDogIndex = 0;
    
    window.onload = () => {
      const savedDog = localStorage.getItem("dogImage");
      if (savedDog) {
        dogImage.src = savedDog;
        status.textContent = "Loaded last image from cache ✅";
      }
    };

    async function fetchDog() {
      try {
        status.textContent = "Loading.....";
        dogImage.src = "";

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        if (!data.message) throw new Error("Invalid response");

        dogImage.src = data.message;
        status.textContent = "Here’s a cute random dog!!!!";

        
        localStorage.setItem("dogImage", data.message);
      } catch (err) {
        status.textContent = "Error loading dog. Please click Refresh.";
      }
    }

    
      function showMyDog() {
      dogImage.src = MY_DOGS[currentDogIndex];
      status.textContent = "This is my dog!!!!";

      localStorage.setItem("dogImage", MY_DOGS[currentDogIndex]);

      currentDogIndex = (currentDogIndex + 1) % MY_DOGS.length;
    }

    
    function copyImageURL() {
      if (!dogImage.src) {
        alert(" No image to copy!!");
        return;
      }
      navigator.clipboard.writeText(dogImage.src)
        .then(() => {
          alert("Successfully!!Image URL copied to clipboard!!!");
        })
        .catch(err => {
          alert("Failed to copy!!!: " + err);
        });
    }

    loadBtn.addEventListener("click", fetchDog);
    refreshBtn.addEventListener("click", fetchDog);
    myDogBtn.addEventListener("click", showMyDog);
    copyBtn.addEventListener("click", copyImageURL);

