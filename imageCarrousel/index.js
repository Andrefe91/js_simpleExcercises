// Query Selections

const leftController = document.querySelector('#leftController');
const rightController = document.querySelector('#rightController');
const carrouselImages = document.querySelectorAll('.image');

// Event listeners

leftController.addEventListener('mousedown', () => moveCarrousel('left', carrouselImages));
rightController.addEventListener('mousedown', () => moveCarrousel('right', carrouselImages));

function moveCarrousel(direction, images) {
    let selected = 0;
    let imagesNumber = images.length;

    for (let index = 0; index < images.length; index++) {
        if (images[index].classList.contains('active')) {
            images[index].classList.remove('active');
            selected = index;
            break;
        }
    }

    switch (direction) {
        case "left":
            (selected -1) < 0 ? selected = imagesNumber : selected;
            images[selected - 1].classList.add('active');
            break;

        case "right":

            ((selected + 1) > (imagesNumber - 1)) ? selected = 0 : (selected = selected + 1);
            images[selected].classList.add('active');
            break;
    }
}
