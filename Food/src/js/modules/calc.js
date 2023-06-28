function calc(){
    const result = document.querySelector('.calculating__result span');
    let height, weight, age, sex, active;
    
        if (localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }
    
        if (localStorage.getItem('active')) {
            active = localStorage.getItem('active');
        } else {
            active = 1.375;
            localStorage.setItem('active', 1.375);
        }
    
    function initDefaultParameter(selector){
        const elements = document.querySelectorAll(selector);

        elements.forEach(el=>{
            el.classList.remove('calculating__choose-item_active');
            if(localStorage.getItem('sex') === el.getAttribute('id')){
                el.classList.add('calculating__choose-item_active');
                sex = localStorage.getItem('sex');
            }
            if(localStorage.getItem('active') === el.getAttribute('data-active')){
                el.classList.add('calculating__choose-item_active');
                active = localStorage.getItem('active');
            }
        })
    }

    initDefaultParameter('#gender div');
    initDefaultParameter('.calculating__choose_big div');

    function calcCal(){
        if (!sex||!height||!weight||!age||!active){
            result.textContent = '______';
        } else{
            if (sex == 'female'){
                result.textContent = Math.round(active * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)));
            }else{
                result.textContent = Math.round(active * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)));
            }
        }
    }

    calcCal();

    function getStaticElement(parentsSelector){
        const elements = document.querySelectorAll(`${parentsSelector} div`);

        elements.forEach(element=>{
            element.addEventListener('click', (e)=>{
                if (e.target.getAttribute('data-active')){
                    active = +e.target.getAttribute('data-active');
                    localStorage.setItem('active', active);
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                elements.forEach(element=>{
                    element.classList.remove('calculating__choose-item_active');
                })
                e.target.classList.add('calculating__choose-item_active');

                calcCal();
            })
        })
    }

    getStaticElement('#gender');
    getStaticElement('.calculating__choose_big');

    function getInputFields(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', ()=>{

            if (input.value.match(/\D/)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value
                    break;
            }
            calcCal();
        })
    }

    getInputFields('#height');
    getInputFields('#weight');
    getInputFields('#age');
}

export default calc;