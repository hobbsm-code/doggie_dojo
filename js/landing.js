document
    .getElementById('registerBtn')
    .addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'form.html';
    });

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openModalBtn = document.querySelector('#signInBtn');
const closeModalBtn = document.querySelector('.btn-close');

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

openModalBtn.addEventListener('click', openModal);
