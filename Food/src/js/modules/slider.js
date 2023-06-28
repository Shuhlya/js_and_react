function slider({sliderS, slidesS, nextS, prevS, totalS, currentS, slidesWrapperS, slidesFieldsS}){
    //Slider

    const slides = document.querySelectorAll(slidesS),
        slider = document.querySelector(sliderS),
        next = document.querySelector(nextS),
        prev = document.querySelector(prevS),
        total = document.querySelector(totalS),
        current = document.querySelector(currentS),
        slidesWrapper = document.querySelector(slidesWrapperS),
        slidesFields = document.querySelector(slidesFieldsS),
        width = window.getComputedStyle(slidesWrapper).width;
    let sliderIndex = 1,
        offset = 0;

    if (slides.length < 10){
        total.textContent =`0${slides.length}`;
        current.textContent = `0${sliderIndex}`;
    } else{
        total.textContent = slides.length;
        current.textContent = sliderIndex;
    }

    slidesFields.style.width = `${100 * slides.length}%`;
    slidesFields.style.display = `flex`;
    slidesFields.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide=>{
        slide.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for(let i=0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if(i == 0) dot.style.opacity = 1;

        indicators.append(dot);
        
    }

    const dots = document.querySelectorAll('.dot');

    function setDotsOpacity(){
        dots.forEach((item, index)=>{
            item.style.opacity = '0.5';
            if(index == sliderIndex-1) item.style.opacity = '1';
        })
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', ()=>{
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        }else{
            offset += deleteNotDigits(width);
        }

        slidesFields.style.transform = `translateX(-${offset}px)`

        if (sliderIndex == slides.length){
            sliderIndex = 1;
        } else{
            sliderIndex++;
        }

        if(slides.length < 10){
            current.textContent = `0${sliderIndex}`;
        } else{
            current.textContent = sliderIndex;
        }

        setDotsOpacity();

    });


    prev.addEventListener('click', ()=>{
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        }else{
            offset -= deleteNotDigits(width);
        }

        slidesFields.style.transform = `translateX(-${offset}px)`

        if (sliderIndex == 1){
            sliderIndex = slides.length;
        } else{
            sliderIndex--;
        }

        if(slides.length < 10){
            current.textContent = `0${sliderIndex}`;
        } else{
            current.textContent = sliderIndex;
        }
        
        setDotsOpacity();

    });

    dots.forEach(dot=>{
        dot.addEventListener('click', (e)=>{
            const slideTo = e.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidesFields.style.transform = `translateX(-${offset}px)`
            dot.style.opacity = '1';

            setDotsOpacity();
        })
    })
    // showSlides(sliderIndex);

    // function showSlides(n){
    //     if (n > slides.length) sliderIndex = 1;
    //     if (n < 1) sliderIndex = slides.length;

    //     slides.forEach(item=>item.classList.add('hide')); 

    //     slides[sliderIndex-1].classList.remove('hide');

    //     current.textContent = (sliderIndex > 9)? sliderIndex: `0${sliderIndex}`;

    // };

    // function plusSlider(n){
    //     showSlides(sliderIndex += n);
    // }

    // next.addEventListener('click', ()=>{
    //     plusSlider(1);
    // })
    // prev.addEventListener('click', ()=>{
    //     plusSlider(-1);
    // })
}

export default slider;