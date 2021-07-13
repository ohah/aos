"use strict"; //엄격모드
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.AOS = factory();
  }
})(this, function () {
  //로컬(지역함수) 선언
  const AOScallback = (entries) => {
    //옵저버 콜백함수 정의
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("보일때", entry.target.dataset.animate);
        entry.target.style.animationName = entry.target.dataset.animate;
        entry.target.style.animationDuration = entry.target.dataset.duration;
        entry.target.style.removeProperty('visibility');
      } else {
        console.log("안보일떄", entry.target.dataset.animate);
        entry.target.style.animationName = "none";
        entry.target.style.visibility = "hidden";
        entry.target.style.animationDuration = "0s";
      }
    });
  };
  const checkVisible = (elm) => {
    //클래식(스크롤이벤 감지) 함수 정의
    const viewportHeight = window.innerHeight,
      scrollY = window.scrollY,
      y = elm.offsetTop,
      elementHeight = elm.clientHeight;
    return y < viewportHeight + scrollY && y > scrollY - elementHeight;
  };
  const AOS = function (element, option = "classic") {
    //객체 선언
    if (option === "modern") {
      this.modern(element);
    } else {
      this.classic(element);
    }
  };
  AOS.prototype = {}; //프로토타입 선언
  AOS.prototype.modern = function (element) {
    //IE X
    this.observer = new IntersectionObserver(AOScallback, {
      "threshold": 0.7,
      rootMargin: '10px',
    });
    const items = document.querySelectorAll(element);
    items.forEach((item) => {
      this.observer.observe(item);
    });
  };
  AOS.prototype.classic = function (element) {
    //IE O
    const items = document.querySelectorAll(element);
    window.addEventListener("scroll", (e) => {
      items.forEach((item) => {
        if (checkVisible(item)) {
          item.style.animationName = item.dataset.animate;
          item.style.animationDuration = item.dataset.duration;
          item.style.removeProperty('visibility');
        } else {
          item.style.animationName = "none";
          item.style.visibility = "hidden";
          item.style.animationDuration = "0s";
        }
      });
    });
  };
  return AOS; //객체 리턴
});

(function () {
  //시작시 자동 실행
  // const Ani = new AOS('.AOS', "modern");
  const Ani = new AOS(".AOS", "");
})();
