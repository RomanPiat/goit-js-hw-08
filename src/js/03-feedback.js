import throttle from 'lodash.throttle';

const KEY_FORM = "feedback-form-state"
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('input'),
}

refs.form.addEventListener('input', throttle(addEvent, 1000));
refs.form.addEventListener('submit', onFormSubmit);

populateTextArea();

function addEvent(evt) {
    formData [evt.target.name] = evt.target.value;
    localStorage.setItem(KEY_FORM, JSON.stringify(formData));
}

 function onTextAreaInput(evt) {
    const textArea = evt.currentTarget.value;
    localStorage.setItem(KEY_FORM, textArea)
} 

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log('form submission')
    evt.currentTarget.reset()
    localStorage.removeItem(KEY_FORM)
}

function populateTextArea(evt) {
    const savedMessage = JSON.parse(localStorage.getItem(KEY_FORM));
    if (savedMessage) {
        refs.textarea.value = savedMessage['message']
        refs.input.value = savedMessage['email']
    }
}
document.addEventListener("DOMContentLoaded", populateTextArea)