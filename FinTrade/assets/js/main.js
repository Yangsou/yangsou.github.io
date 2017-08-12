/**
 * @Author: Yangsou <wladek>
 * @Date:   2017-08-11T16:50:35+07:00
 * @Email:  namnguyentrung95@gmail.com
 * @Project: landingpage
 * @Last modified by:   wladek
 * @Last modified time: 2017-08-12T12:35:07+07:00
 * @License: MIT
 */



window.onload = function(){
  init();
}

function init(){
  console.log('window init');
  var index = 0;
  var slider = new Slider(document.getElementsByClassName('slider_item'));
  slider.sliderAutomatic();
  var homeBtn = document.getElementsByClassName('home_intro_btn');
  for(var i = 0; i < homeBtn.length; i++){
    console.log(homeBtn[i].classList);
    homeBtn[i].addEventListener('click', function(){
      var _this = this;
      _this.classList.add('active');
      setTimeout(function(){
        _this.classList.remove('active');
      }, 650);
    })
  }

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
