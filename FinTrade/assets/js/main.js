/**
 * @Author: Yangsou <wladek>
 * @Date:   2017-08-11T16:50:35+07:00
 * @Email:  namnguyentrung95@gmail.com
 * @Project: landingpage
 * @Last modified by:   wladek
 * @Last modified time: 2017-08-30T01:25:46+07:00
 * @License: MIT
 */



window.onload = function(){
  init();
}

function init(){
  console.log('window init');
  //active header when loaded
  activeHeaderWhenScroll();

  // slider initial
  var index = 0;
  var slider = new Slider(document.getElementsByClassName('slider_item'));
  slider.sliderAutomatic();

  // controll effect btn
  var homeBtn = document.getElementsByClassName('home_intro_btn');
  window.addEventListener('mousedown', showEffect, false);

  // control slider screen shot
  var slider3D = new Slider3D(document.getElementsByClassName('screen_item'));
  slider3D.sliderScreen();

  window.addEventListener('scroll', function(){
    activeHeaderWhenScroll();
  });
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
    let element = this;
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
    let diff = Date.now() - Number(ripple.getAttribute('data-hold'));
    var delay = 350 - diff;
    if(delay < 0){
      delay = 0;
    }
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

function Slider(target){
  var $this = this,
      items = target,
      itemsLength = items.length;

  this.sliderAutomatic = function(index = 0){
    var prev = index - 1;
    if(prev < 0){
      prev = itemsLength - 1;
    }
    for(var i = 0; i < itemsLength; i++){
      items[i].style.zIndex = '1';
      items[i].classList.remove('prev');
      items[i].classList.remove('active');
    }
    if(index == itemsLength){
      index = 0;
      prev = itemsLength - 1;
    }
    items[prev].style.zIndex = 2;
    items[prev].classList.add('prev');
    items[index].style.zIndex = 3;
    items[index].classList.add('active');
    index++;

    setTimeout(function(){
      $this.sliderAutomatic(index);
    }, 5000);
  }

}

//
// slider screen shot
// var Slider3D  = {
//   index = 0,
//
// }
function Slider3D(target){
  var $this = this,
      items = target,
      itemsLength = items.length;

  this.index = 0;

  var btnNext = document.getElementsByClassName('screen_btn-next')[0];
  var btnPrev = document.getElementsByClassName('screen_btn-prev')[0];

  btnNext.addEventListener('click', function(){
    $this.index++;
    if($this.index == itemsLength - 2){
      $this.index = itemsLength - 3;
    }
    console.log('index', $this.index);
    $this.sliderScreen($this.index);
  });
  btnPrev.addEventListener('click', function(){
    $this.index--;
    if($this.index < 0){
      $this.index = 0;
    }
    console.log('index', $this.index);
    $this.sliderScreen($this.index);
  })

  this.sliderScreen = function(index = 0){
    var itemShowCount = 5;
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('class', 'screen_item');
    }
    console.log('idex', index, itemsLength);
    items[index].classList.add('screen_item-first');
    items[index+1].classList.add('screen_item-second');
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
