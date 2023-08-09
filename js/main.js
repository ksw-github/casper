$(function(){
  const secVisual = $("section.visual");
  const secBest = $("section.best");
  const secGuide = $("section.guide");
  const secEvent = $("section.event");

  // 모달창
  const mainModal = $(".popup .modal");
  const guideModal = $(".popup .guidePopup");

  const saveCh = JSON.parse(localStorage.getItem("checked")); //js정보로 가져오기

  if(saveCh){ //체크가 되어있는게 맞으면 팝업온을 지우고 아니면 킴
    $("body").removeClass("popupOn");
    mainModal.hide();
  } else { 
    $("body").addClass("popupOn");
    mainModal.show();
  }

  const video = guideModal.find("video").get(0);
  const ch = mainModal.find("#ch");

  let isCh = false;

  ch.on("change", function(){ //체크이벤트발생시 로컬스토리지에 트루펄스전달
    isCh = $(this).prop("checked");
    localStorage.setItem("checked", isCh);
  });
  mainModal.find(".close").on("click", function(){
    $("body").removeClass("popupOn");
    mainModal.hide();
  });
  // 슬라이드모달
  mainModal.find(".slider").slick({
    arrows: true,
    prevArrow: mainModal.find(".prevBtn"),
    nextArrow: mainModal.find(".nextBtn"),

    dots: true,
    appendDots: mainModal.find(".dots"),
    dotsClass: "customDots",
  });
  // 영상모달
  secGuide.find(".guideImg").on("click", function(){
    $("body").addClass("popupOn");
    guideModal.show();

    video.play();
    video.muted = false;
  });
  guideModal.find(".close").on("click", function(){
    $("body").removeClass("popupOn");
    guideModal.hide();

    video.pause();
    video.currentTime = 0;
  });
  guideModal.find(".sound").on("click", function(){
    if (video.muted === false) {
      video.muted = true;
      $(this).find("img").attr("src", "images/popup_icon_sound-on.png");
    } else {
      video.muted = false;
      $(this).find("img").attr("src", "images/popup_icon_mute.png");
    }
  });
  guideModal.find(".refresh").on("click", function(){
    video.currentTime = 0;
    video.play();
  });
  guideModal.find(".play").on("click", function(){
    if (video.paused) { //정지상태
      video.play();
      $(this).find("img").attr("src", "images/popup_icon_pause.png");
    } else {
      video.pause();
      $(this).find("img").attr("src", "images/popup_icon_play.png");
    }
  });
  guideModal.find(".full").on("click", function(){ //풀스크린
    video.requestFullscreen();
  });


  // 베스트상품슬라이드
  secBest.find(".slider").slick({
    centerMode: true,
    // veriavleWidth: true,
    centerPadding: "23%",

    arrows: true,
    prevArrow: secBest.find(".prevBtn"),
    nextArrow: secBest.find(".nextBtn"),

    dots: true,
    appendDots: secBest.find(".dotsWrap"),
    dotsClass: "customDots",

    responsive: [
      {
        breakpoint: 768,
      },{
        breakpoint: 480,
        settings: {
          centerMode: false,
          slideToShow: 1,
        }
      }
    ]

  });

  // 이벤트배너슬라이드
  secEvent.find(".slider").slick({
    dots: true,
    appendDots: secEvent.find(".dotsWrap"),
    dotsClass: "customDots",

    arrows: true,
    prevArrow: secEvent.find(".prevBtn"),
    nextArrow: secEvent.find(".nextBtn"),
  });

  // 플루팅메뉴 : 사이드퀵, 헤더
  const floatingTop = $(".floatingTop");
  const floatingBtm = $(".floatingBtm");

  let win = $(window);
  let winW = win.innerWidth();
  let scrollTop = 0; //렛을 쓰는 이유 스크롤하면 수치가 바뀌기때문.
  
  $(window).on("scroll", function(){
    scrollTop = $(this).scrollTop(); //스크롤 좌표를 px단위로 알려줌.
    scrollEvent();

    $(".pos").text(scrollTop);
  });

  $(window).on("resize", function(){
    winW = win.innerWidth();
    scrollEvent();
    hoverHeaderEvent();
  });

  scrollEvent();
  hoverHeaderEvent();

  function hoverHeaderEvent(){
    
    const header = $("header");

    if (winW > 768) {
      header.find("nav").css("display", "inline-block");
      header.on("mouseenter", function(){
        $(this).addClass("active");
      });
      header.on("mouseleave", function(){
        $(this).removeClass("active");
      });
    } else {
      header.find("nav").css("display", "none");
      header.off("mouseenter");
    }
  }

  function scrollEvent(){
    scrollHeaderEvent();
    if (winW > 768) {
      showFloatingMenu();
    } else {
      floatingTop.removeClass("on");
      floatingBtm.removeClass("on");
    }
  }

  function scrollHeaderEvent(){
    if (scrollTop > 200){
      $("header").addClass("on");
    } else {
      $("header").removeClass("on");
    }
  }

  function showFloatingMenu(){
    if (scrollTop > 1000) {
      floatingTop.addClass("on");
      floatingBtm.addClass("on");
    } else {
      floatingTop.removeClass("on");
      floatingBtm.removeClass("on");
    }
  }
  
  // $(window).innerWidth();
  // $(window).innerHeight();

  // 윈도우 스크린 사이즈가 변경될때 실행되는 이벤트



  // 윈도우에서 마우스를 이동하면 발생되는 이벤트
  // $(window).on("mousemove", function() {});

});
