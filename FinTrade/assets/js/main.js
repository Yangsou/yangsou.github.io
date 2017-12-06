/**
 * @Author: Yangsou <wladek>
 * @Date:   2017-08-11T16:50:35+07:00
 * @Email:  namnguyentrung95@gmail.com
 * @Project: landingpage
 * @Last modified by:   wladek
 * @Last modified time: 2017-09-08T18:30:42+07:00
 * @License: MIT
 */

 var bootstrap = function(evt){
   if (evt.target.readyState === "interactive") { initLoader(); }
   else if (evt.target.readyState === "complete") {
     initApp();
   }
 }
 document.addEventListener('readystatechange', bootstrap, false);

function initLoader(){
  // _path.setAttribute("d", "M 0 80l 15 -15l 15 10l15 -30l15 21l15 -3l15 13l15 -40l15 33l15 -57l 15 20");
}

// window.onload = function(){
//   init();
// }

function initApp(){
  console.log('window init');
  var body = document.getElementsByTagName('body')[0];
  var pageLoading = document.getElementById('page-loading');
  var _path = document.getElementById('path-1');
  pageLoading.onload = function(){
    console.log('path loaded');
  }
  setTimeout( function(){
    body.classList.remove('over-hidden');
    body.removeChild(pageLoading);
  }, 1000);

  //active header when loaded
  activeHeaderWhenScroll();

  // slider initial
  // var index = 0;
  // var homeSliderItems = document.getElementsByClassName('slider_item');
  // Slider.sliderAutomatic(homeSliderItems, index);

  // controll effect btn
  var homeBtn = document.getElementsByClassName('home_intro_btn');
  window.addEventListener('mousedown', showEffect, false);

  // control slider screen shot
  // var slider3D = new Slider3D(document.getElementsByClassName('screen_item'));
  // slider3D.sliderScreen();
  var slider3dItems = document.getElementsByClassName('screen_item');
  var btnNext = document.getElementsByClassName('screen_btn-next')[0];
  var btnPrev = document.getElementsByClassName('screen_btn-prev')[0];

  btnNext.addEventListener('click', function(){
    Slider3D.handleNext(slider3dItems);
  });
  btnPrev.addEventListener('click', function(){
    Slider3D.handlePrev(slider3dItems);
  });


  lazyLoad();
  window.addEventListener('scroll', function(){
    activeHeaderWhenScroll();
    lazyLoad();
  });

  // handle click open or close right menu at mobile
  var btnRightMenuHeader = document.getElementsByClassName('header_toggle-menu')[0];
  var rightMenuHeader = document.getElementsByClassName('header_right')[0];
  window.addEventListener('click', function(e){
    toggleRightMenu(e, btnRightMenuHeader, rightMenuHeader);
  });
  // window.addEventListener('scroll', lazyLoad, false);
}

// active or unactive header when scroll
function activeHeaderWhenScroll(){
  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  var header = document.getElementsByClassName('header')[0];
  // console.log('scrollTop', scrollTop);
  if(scrollTop > 196){
    header.classList.add('active');
  }else{
    header.classList.remove('active');
  }
}

function showEffect(e){
  var element = getLazyEffectElement(e);
  if(element !== null){
    console.log('element', element);
    LazyEffect.show(e, element);
    element.addEventListener('mouseup', LazyEffect.hide, false);
    element.addEventListener('mouseleave', LazyEffect.hide, false);
  }
}

function getLazyEffectElement(e) {
  //  if (TouchHandler.allowEvent(e) === false) {
  //    return null;
  //  }

   var element = null;
   var target = e.target || e.srcElement;

   while (target.parentNode !== null) {
     if (!(target instanceof SVGElement) && target.className.indexOf('lazy-effect') !== -1) {
       element = target;
       break;
     }
     target = target.parentNode;
   }
   return element;
}

var LazyEffect = {
  duration: 770,
  timingFunction: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',

  show: function(e, element){
    var eventPosition = {
      x: e.pageX,
      y: e.pageY
    };
    var relativeX = eventPosition.x - element.offsetLeft;
    var relativeY = eventPosition.y - element.offsetTop;
    // console.log('elementPosition', element.offsetTop, eventPosition.y);
    var scale = 'scale(' + element.clientWidth / 100 * 20 + ')';

    var ripple = document.createElement('div');
    ripple.classList.add('lazy-ripple');
    element.appendChild(ripple);
    var rippleStyle = {
      position: 'absolute',
      top: relativeY + 'px',
      left: relativeX + 'px',
      width: '20px',
      height: '20px',
      'border-radius': '50%',
      opacity: '0',
      'transition-property': 'transform, opacity, -webkit-transform'
    };
    ripple.style.transition = 'none !important';
    ripple.setAttribute('style', convertStyle(rippleStyle));
    ripple.setAttribute('data-hold', Date.now());
    ripple.setAttribute('data-scale', scale);
    ripple.setAttribute('data-x', relativeX);
    ripple.setAttribute('data-y', relativeY);

    rippleStyle['-webkit-transition-duration'] = LazyEffect.duration + 'ms';
    // rippleStyle['-moz-transition-duration'] = '650ms';
    // rippleStyle['-o-transition-duration'] = '650ms';
    // rippleStyle['transition-duration'] = '650ms';
    rippleStyle['-webkit-transition-timing-function'] = LazyEffect.timingFunction;
    rippleStyle.opacity = '1';
    rippleStyle.transform = scale;
    setTimeout(function(){
      ripple.setAttribute('style', convertStyle(rippleStyle));
    }, 0);
  },
  hide: function(){
    // console.log('hide', Date.now());
    var element = this;
    var ripple = null;
    var ripples = document.getElementsByClassName('lazy-ripple');
    if(ripples.length > 0){
      ripple = ripples[ripples.length - 1];
    }else{
      return false;
    }
    var relativeX = ripple.getAttribute('data-x');
    var relativeY = ripple.getAttribute('data-y');
    var scale = ripple.getAttribute('data-scale');
    var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 300 - diff;
    if(delay < 0){
      delay = 0;
    }
    // console.log('delay', delay);
    setTimeout(function(){
      var style = {
        'top': relativeY + 'px',
        'left': relativeX + 'px',
        'opacity': '0',

        // Duration
        '-webkit-transition-duration': LazyEffect.duration + 'ms',
        '-moz-transition-duration': LazyEffect.duration + 'ms',
        '-o-transition-duration': LazyEffect.duration + 'ms',
        'transition-duration': LazyEffect.duration + 'ms',
        '-webkit-transform': scale,
        '-moz-transform': scale,
        '-ms-transform': scale,
        '-o-transform': scale,
        'transform': scale
      };
      ripple.setAttribute('style', convertStyle(style));
      setTimeout(function(){
        // console.log(ripples[0]);
        try {
          element.removeChild(ripples[0]);
        } catch (e) {
            return false;
        }
      }, LazyEffect.duration);

    }, delay);
  }
}

function convertStyle(obj) {
    var style = '';
    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }
    return style;
}

var Slider = {
  index: 0,

  sliderAutomatic: function(items){
    var itemsLength = items.length;
    var prev = Slider.index - 1;
    // console.log('index', prev);
    if(prev < 0){
      prev = itemsLength - 1;
    }
    for(var i = 0; i < itemsLength; i++){
      items[i].style.zIndex = '1';
      items[i].classList.remove('prev');
      items[i].classList.remove('active');
    }
    if(Slider.index == itemsLength){
      Slider.index = 0;
      prev = itemsLength - 1;
    }
    items[prev].style.zIndex = 2;
    items[prev].classList.add('prev');
    items[Slider.index].style.zIndex = 3;
    items[Slider.index].classList.add('active');
    Slider.index++;

    setTimeout(function(){
      Slider.sliderAutomatic(items);
    }, 5000);
  }
}

var Slider3D = {
  index: 0,
  handleNext: function(items){
    var itemsLength = items.length;
    Slider3D.index++;
    if(Slider3D.index == itemsLength - 2){
      Slider3D.index = itemsLength - 3;
    }
    // console.log('index', $this.index);
    Slider3D.sliderScreen(items);
  },

  handlePrev: function(items){
    Slider3D.index--;
    if(Slider3D.index < -2){
      Slider3D.index = -2;
    }
    Slider3D.sliderScreen(items);
  },

  sliderScreen: function(items){
    var itemShowCount = 5;
    var itemsLength = items.length;
    var index = Slider3D.index;
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('class', 'screen_item');
    }
    console.log('idex', index, itemsLength);
    if(items[index]){
      items[index].classList.add('screen_item-first');
    }
    if(items[index+1]){
      items[index+1].classList.add('screen_item-second');
    }
    items[index+2].classList.add('screen_item-third');
    if(items[index+3]){
      items[index+3].classList.add('screen_item-fourth');
    }
    if(items[index+4]){
      items[index+4].classList.add('screen_item-fifth');
    }
    // setTimeout(function(){
    //   $this.sliderScreen(index);
    // }, 2000);
  }
}


// control click on button to toggling, and outside button to unactive
function toggleRightMenu(event, element, secondElement){
  // console.log('click', element);
  var _main = document.getElementsByTagName('main')[0];
  var _body = document.getElementsByTagName('body')[0];
  var _header = document.getElementsByClassName('header')[0];

  if(element.contains(event.target)){
    element.classList.toggle("active");
    secondElement.classList.toggle('active');
    _main.classList.toggle('show-right-menu');
    _body.classList.toggle('show-right-menu');
    _header.classList.toggle('show-right-menu');
  }else{
    // console.log('click outside');
    if(element.classList.contains('active')){
      element.classList.remove('active');
      secondElement.classList.remove('active');
      _main.classList.remove('show-right-menu');
      _body.classList.remove('show-right-menu');
      _header.classList.remove('show-right-menu');
    }
  }
}


// lazy load when scroll
function lazyLoad(){
  var element = document.getElementsByClassName('lazy-load');
  // alert('element');

  for (var i = 0; i < element.length; i++){
    var elementPosition = element[i].getBoundingClientRect();
    // alert(elementPosition.top);
    if(elementPosition.top < window.innerHeight / 1.5
      && elementPosition.top + element[i].clientHeight >= window.innerHeight / 2
    ){
      element[i].classList.add('active');
    }

  }
}
