const videoButton = document.querySelector('.button-video');
const imageButton = document.querySelector('.image-video');
const noteButton = document.querySelector('.note-video');
const taskButton = document.querySelector('.task-video');

const videoModal = document.querySelector('.video-modal');

videoButton.addEventListener('click', () => {
    videoModal.showModal()
})