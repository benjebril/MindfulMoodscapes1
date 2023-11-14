let themeButton = document.getElementById("theme-button");
let body = document.body;

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

let count = 3;

const signNowButton = document.getElementById("sign-now-button");

const addSignature = () => {
  const name = document.getElementById("name").value;
  const hometown = document.getElementById("hometown").value;

  const newSignature = document.createElement("p");

  newSignature.textContent = `🖊️ ${name} from ${hometown} supports this.`;

  const signaturesSection = document.querySelector(".signatures");

  signaturesSection.appendChild(newSignature);

  const oldCounter = document.getElementById("counter");
  if (oldCounter) {
    oldCounter.remove();
  }
  count += 1;

  const newCounter = document.createElement("p");
  newCounter.id = "counter";
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
  signaturesSection.appendChild(newCounter);
}

const validateForm = () => {
  let containsErrors = false;

  let petitionInputs = document.getElementById("sign-petition").elements;

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');

      const email = document.getElementById('email');
      if (!email.value.includes('.com')) {
        containsErrors = true;
        email.classList.add('error');
      } else {
        email.classList.remove('error');
      }
    }
  }

  if (containsErrors === false) {
    let person = {
      name: petitionInputs.name.value,
      hometown: petitionInputs.hometown.value,
      email: petitionInputs.email.value
    };
    addSignature(person);
    toggleModal(person);
    petitionInputs[i].value = "";
    containsErrors = false;
  }
}

signNowButton.addEventListener("click", validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
};

let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

window.addEventListener('scroll', reveal);

const reduceMotion = () => {
  animation.revealDistance = 0;
  animation.transitionDelay = '0s';

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDelay = animation.transitionDelay;
  }
}

let reduceMotionButton = document.getElementById('reduce-motion');
reduceMotionButton.addEventListener('click', reduceMotion);

let modalImage = document.getElementById('modal-text-container');
let intervalId;

const scaleImage = () => {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
};

intervalId = setInterval(scaleImage, 500);

const toggleModal = (person) => {
  let modal = document.getElementById('thanks-modal');
  let modalContent = document.getElementById('thanks-modal-content');

  modal.style.display = 'flex';
  modalContent.textContent = `Thank you, ${person.name}, for signing the petition and supporting this cause.`;

  let closeModalButton = document.getElementById('close-modal-button');


  const closeModal = () => {
    let modal = document.getElementById('thanks-modal');

    modal.style.display = 'none';
  };
  closeModalButton.addEventListener('click', closeModal);

  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);
  }, 4000);
};

function toggleQuote(button) {
  let emotion = button.parentElement.dataset.emotion;
  let quoteElement = document.getElementById(`${emotion}-quote`);
  quoteElement.style.display = (quoteElement.style.display === 'none') ? 'block' : 'none';
}
