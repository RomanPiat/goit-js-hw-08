import throttle from 'lodash.throttle';

const KEY_FORM = "feedback-form-state"
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('input'),
}

//refs.textarea.addEventListener('input', throttle(onTextAreaInput, 1000));
refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', e => {
    formData [e.target.name] = e.target.value;
    localStorage.setItem(KEY_FORM, JSON.stringify(formData));
})

populateTextArea();

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