const form = document.getElementById('form');
const inputArr = Array.from(form)
const validInputArr = [];

inputArr.forEach((el) => {
    if (el.hasAttribute("data-reg")) {
        el.setAttribute("is-valid", "0")
        validInputArr.push(el);
    }
})

function inputHandler({target}) {
    if (target.hasAttributes("data-reg")) {
        inputCheck(target)
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute("data-reg");
    const reg = new RegExp(inputReg)
    if (reg.test(inputValue)) {
        el.style.borderColor = '#3F4363'
        el.style.color = "white"
        el.setAttribute("is-valid", "1")
    } else {
        el.style.borderColor = '#ce1b1b'
        el.style.color = "#ce1b1b"
        el.setAttribute("is-valid", "0")
    }
}

form.addEventListener("input", inputHandler)

const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', (e) => {

    e.preventDefault();
    const isAllValid = [];
    validInputArr.forEach((el) => {
        isAllValid.push(el.getAttribute("is-valid"))
    })
    const isValid = isAllValid.reduce((acc, current) => {
        return acc & current;
    })
    if (!Boolean(Number(isValid))) {
        isAllValid.map((el, index) => {
            if (el === '0') {
                return inputArr[index].style.borderColor = 'red'
            } else {
                return inputArr[index].style.borderColor = '#3F4363'
            }
        })
    } else {

        clear_form();
        submitBtn.innerText = 'Successful!'
        submitBtn.style.backgroundColor = 'green'
        submitBtn.style.borderColor = 'green'
        setTimeout(() => {
            submitBtn.innerText = 'Send'
            submitBtn.style.backgroundColor = '#3F4363'
            submitBtn.style.borderColor = '#3F4363'
        }, 10000)
    }
})

const clear_form = () => {
    for (let i = 0; i < Array.from(form).length; i++) {
        Array.from(form)[i].value = ''
    }
}
