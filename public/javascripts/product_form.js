/* eslint-env browser */
const removeImageCheckbox = document.querySelector('#remove_image');
const imageInput = document.querySelector('#product_image');

if (removeImageCheckbox) {
  removeImageCheckbox.addEventListener('change', function () {
    if (this.checked) imageInput.disabled = true;
    else imageInput.disabled = false;
  });
}
