import throttle from 'lodash.throttle';

const KEY_FORM = "feedback-form-state";
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('input'),
}

refs.form.addEventListener('input', throttle(addLocalStorage, 500));
refs.form.addEventListener('submit', onFormSubmit);

function addLocalStorage(evt) {
    const data = {
        email: refs.input.value,
        message: refs.textarea.value,
      };
    localStorage.setItem(KEY_FORM, JSON.stringify(data));
}

function onFormSubmit(evt) {
    evt.preventDefault();
    const sendMessage = JSON.parse(localStorage.getItem(KEY_FORM));
    console.log('form submission:', sendMessage);
    evt.currentTarget.reset();
    localStorage.removeItem(KEY_FORM);
}

function populateTextArea(evt) {
    const savedMessage = JSON.parse(localStorage.getItem(KEY_FORM));
    if (savedMessage) {
        refs.textarea.value = savedMessage['message']
        refs.input.value = savedMessage['email']
    }
}
document.addEventListener("DOMContentLoaded", populateTextArea);