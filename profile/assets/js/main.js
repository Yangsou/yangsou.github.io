var bootstrap = function(evt){
  if (evt.target.readyState === "interactive") { initLoader(); }
  else if (evt.target.readyState === "complete") {
    initApp();
  }
}
document.addEventListener('readystatechange', bootstrap, false);
function initLoader() {
  console.log('web loading');
}

function initApp(){
  console.log('web readyState');
  // window.addEventListener('click', showEffect, false);
  // handleCloseSection();
  // document.getElementsByClassName('menu__btn')
}
function onClickMenu(_this) {
  const id = _this.getAttribute('data-id');
  console.log(id)
  const pages = document.getElementsByClassName('page'),
    nextPage = document.getElementById(id),
    menus = document.getElementsByClassName('menu__btn');
  for (let index = 0; index < pages.length; index++) {
    const element = pages[index],
      menu = menus[index];
    element.classList.add('hidden');
    menu.classList.remove('active');
  }
  nextPage.classList.remove('hidden');
  _this.classList.add('active');
}
function downloadCV() {
  console.log('NGUYEN-TRUNG-NAM')
  window.open('./assets/NGUYEN-TRUNG-NAM.pdf')
}

function showEffect(e){
  var element = getLazyEffectElement(e);
  if(element !== null){
    LazyEffect.show(e, element);
    console.log('element', element);
  }
}

function getLazyEffectElement(e){
  var element = null;
  var target = e.target || e.srcElement;
  while ( target.parentNode !== null ) {
    if (!(target instanceof SVGElement) && target.className.indexOf('primary_item') !== -1) {
      element = target;
      break;
    }
    target = target.parentNode;
  }
  return element;
}

var LazyEffect = {
  isLoading: false,
  duration: 1370,
  timingFunction: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',

  show: function(e, element){
    var eventPosition = {
      x: e.pageX,
      y: e.pageY
    };
    var relativeX = eventPosition.x - element.offsetLeft;
    var relativeY = eventPosition.y - element.offsetTop;
    var _windowWidth = window.innerWidth;
    var scaleX = _windowWidth / 4;
    // if( scaleX > 0.5 )
    var scaleY = window.innerHeight / 4;
    var _scale = scaleX > scaleY ? scaleX : scaleY;
    console.log(scaleX, scaleY);
    var scale = 'scale(' + _scale + ')';
    var body = document.getElementsByTagName('body')[0];
    var ripple = document.createElement('div');
    var targetText = element.getAttribute('data-section');
    // var targetSection = ('#' + targetSectionText).toString();
    var targetSection = document.getElementById(targetText);

    ripple.classList.add('lazy-ripple');
    body.appendChild(ripple);
    var rippleStyle = {
      position: 'fixed',
      // top: relativeY + 'px',
      // left: relativeX + 'px',
      top: eventPosition.y + 'px',
      left: eventPosition.x + 'px',
      // transform: 'translate(-50%, 50%) scale(0.1, .1)',
      '-webkit-transform': 'translate(-50%, -50%)',
      width: '10px',
      height: '10px',
      'border-radius': '50%',
      // background: 'rgba(255,255,255, .96)',
      'background-image': 'linear-gradient(to bottom, #222222, #203b4c, #005b64, #007852, #6b8d1f)',
      'transition-delay': '10ms',
      '-webkit-transition-delay': '10ms'
    };
    ripple.setAttribute('style', convertStyle(rippleStyle));

    rippleStyle['transition-duration'] = LazyEffect.duration + 'ms';
    rippleStyle['-webkit-transition-duration'] = LazyEffect.duration + 'ms';
    rippleStyle['-webkit-transition-timing-function'] = LazyEffect.timingFunction;
    rippleStyle['transition-timing-function'] = LazyEffect.timingFunction;
    rippleStyle.transform = 'translate(-50%, 50%) ' + scale;
    rippleStyle['-webkit-transform'] = 'translate(-50%, 50%) ' + scale;
    setTimeout( function(){
      ripple.setAttribute('style', convertStyle(rippleStyle));
      setTimeout( function(){
        targetSection.classList.add('active');
      }, LazyEffect.duration - 770);
    }, 10);

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

function handleCloseSection() {
  var btnClose = document.getElementById('btn-close-section');
  btnClose.addEventListener('click', function(){
    var rippleElement = document.getElementsByClassName('lazy-ripple')[0];
    var currentSection = document.querySelectorAll('.section.active');
    for( var i = 0; i < currentSection.length; i++ ){
      console.log(currentSection[i]);
      currentSection[i].classList.add('fade-out');
    }
    rippleElement.style.transform = 'translate(-50%, 50%) scale(0)';
    setTimeout( function(){
      currentSection[0].classList.remove('active');
      currentSection[0].classList.remove('fade-out');
      rippleElement.remove();
    }, 1050);
  })
}
