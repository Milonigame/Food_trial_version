window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

    const deadline = '2024-06-11';

    function getTimeRemaining(endtime) {
        let days,seconds,minutes,hours;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if(t<=0){
            days=0;
            hours=0;
            minutes=0;
            seconds=0;
        }else{
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) ); 
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // Modal
    const modalTrigger=document.querySelectorAll('[data-modal]'),
          modal=document.querySelector('.modal'),
          modalCloseBtn=document.querySelector('[data-close]');


    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        //   modal.classList.toggle('show');
        document.body.style.overflow='hidden';
        clearInterval(modalTimerId);
        }

    modalTrigger.forEach(btn=>{
       btn.addEventListener('click', openModal);
           
          
    });
    

      function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        // modal.classList.toggle('show');
        document.body.style.overflow='';
      }

     modalCloseBtn.addEventListener('click', closeModal);
     
      

      modal.addEventListener('click', (e)=>{
         if (e.target===modal){
          closeModal();

         }

      });

      document.addEventListener('keydown', (e)=>{
        if (e.code ==='ControlLeft'&& modal.classList.contains('show')){
        closeModal();
    }
      });

      const modalTimerId = setTimeout(openModal,5000);

      function showModalByScroll(){
        if (window.pageYOffset+document.documentElement.clientHeight>=document.
            documentElement.scrollHeight-1){
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
        }
      }
      window.addEventListener('scroll', showModalByScroll);

    //Используем классы для карточек

    class MenuCard{
        constructor(src, alt, title, descr, price,parentSelector,...classes){
            this.src=src;
            this.alt=alt;
            this.title=title;
            this.descr= descr;
            this.price=price;
            this.classes=classes;
            this.parent=document.querySelector(parentSelector);
            this.transfer=27;
            this.changeToRUB();
        
        }

        changeToRUB(){
            this.price=+this.price*this.transfer;
        }
        render(){
            const element=document.createElement('div');
            if (this.classes.length===0){
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else{
                this.classes.forEach(className=>element.classList.add(className));
            }
            
            element.innerHTML=`
            <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>`;
            this.parent.append(element);
        }
    }

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container '


).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu .container '
   


).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    16,
    '.menu .container '


).render();

//Forms
const forms=document.querySelectorAll('form');//получение всех форм

const message={
loading: 'Загрузка',
successs:'Спасибо! Мы скоро свяжемся с вами',
failure:'Что-то пошло не так...'
};

forms.forEach(item=>{
 postData(item);
});


function postData(form){//функция отвечающая за постинг данных(эта функция будет принимать в себя какую-то форму(аргумент))
    form.addEventListener('submit', (e)=>{//будет срабатывать каждый раз когда будем пытаться отправить какую-то форму
        e.preventDefault();//чтобы отменить стандартное поведение браузера

        const statusMessage=document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent=message.loading;
        form.append(statusMessage);

        const request=new XMLHttpRequest();
        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'multipart/form-data');
        const formData=new FormData(form);

        request.send(formData);
        request.addEventListener('load',()=>{

            if (request.status===200){
                console.log(request.response);
                statusMessage.textContent=message.successs;
            }else{
                statusMessage.textContent=message.failure;
            }
        });
    });
}





});

function getSum(a, b) {
    function sum() {
        console.log(this.a);
        return a + b;
    }
 
    console.log(sum());
}
 
getSum(4, 5);



const urlObj = {
    protocol: 'https',
    domain: 'mysite.com'
}
 
function showCurrentURL() {
    const extractCurrDomain = () => {
        return this.domain;
    }
    const extractCurrProtocol = () => {
        return this.protocol;
    }
 
    console.log(`${extractCurrProtocol()}://${extractCurrDomain()}`)
}
 
const url = showCurrentURL.bind(urlObj);
 
console.log(url);

