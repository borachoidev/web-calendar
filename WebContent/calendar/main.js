//달력 출력 변수
let today = new Date();
//오늘 년월
let currYear = today.getFullYear();
let currMonth = today.getMonth() + 1;
let currDay = today.getDate();
let myYear;
let myMonth;
let myWeek;
let myDay;
let weeks = ["S", "M", "T", "W", "T", "F", "S"];

myYear = currYear;
myMonth = currMonth;

$(myYAM).html(myMonth + "," + myYear);
localsave("default");
writeCalendar(myYear, myMonth);
//이벤트

// "<"(pre) button 클릭
$("span.prev").click(function () {
  myMonth--;
  if (myMonth == 0) {
    myMonth = 12;
    myYear--;
  }
  $(myYAM).html(myMonth + "," + myYear);
  writeCalendar(myYear, myMonth);
});

// ">"(next) button 클릭
$("span.next").click(function () {
  myMonth++;
  if (myMonth == 13) {
    myMonth = 1;
    myYear++;
  }

  $(myYAM).html(myMonth + "," + myYear);
  writeCalendar(myYear, myMonth);
});

// 년월 클릭 현재 달로 이동//
$("#myYAM").click(function () {
  myYear = currYear;
  myMonth = currMonth;
  $(myYAM).html(myMonth + "," + myYear);
  writeCalendar(myYear, myMonth);
});

//theme 설정//
$("button#theme").click(function () {
  $(".theme_set").removeClass("hidden");
});
$("button.themeclose").click(function () {
  $(".theme_set").addClass("hidden");
});

$("input[name='theme']").change(function () {
  let theme = $(this).val();
  localsave(theme);
  localApply();
  $(".theme_set").addClass("hidden");
  $("body").removeClass();
  $("body").addClass(theme);
});
function localsave(theme) {
  localStorage.setItem("theme", theme);
}
function localApply() {
  let ltheme = localStorage.theme;
  let filetype;
  if (ltheme != "star_sign") {
    filetype = ".gif";
  } else {
    filetype = ".png";
  }
  let src = "../theme/" + ltheme + "/" + myMonth + filetype;
  $(myYAM).html("<img src='" + src + "'>" + myYear);
}

//view All
$("#viewdata").click(function () {
  $(".schedule_m").removeClass("hidden");
  viewAll();
});
$(".viewclose").click(function () {
  $(".schedule_m").addClass("hidden");
});

$(".sort_defalut").click(function () {
  viewAll();
});

$(".sort_colors").click(function () {
  let color = $(this).css("background-color");
  sortColor(color);
});

$(".sort_preall").click(function () {
  viewpreAll();
});

//추가 버튼
$("#btn_add").click(function () {
  let colors = $(".add_colors .actived").css("background-color");
  let title = $("#add_title").val();
  let dates = $("#add_date").val();
  let memo = $("#add_memo").val();
  if (title == "") {
    title = "이름없는일정";
  }
  if (memo == "") {
    memo = "없음";
  }
  addData(colors, title, dates, memo);
  modalClose();
});

//수정버튼
$("#btn_up").click(function () {
  let num = $(".up_form").attr("num");
  let title = $("#up_title").val();
  let dates = $("#up_date").val();
  let colors = $(".up_colors .actived").css("background-color");
  let memo = $("#up_memo").val();
  if (title == "") {
    title = "이름없는일정";
  }
  if (memo == "") {
    memo = "없음";
  }
  updateData(num, title, dates, colors, memo);
  $(".update").addClass("hidden");
});

//삭제버튼
$("#btn_del").click(function () {
  let num = $(".up_form").attr("num");
  deleteData(num);
});

//모달창
$(document).on("click", "td span", function () {
  $(".add").removeClass("hidden");
  let mon = myMonth >= 10 ? myMonth : "0" + myMonth;
  let dday = $(this).text().length == 2 ? $(this).text() : "0" + $(this).text();
  $("#add_date").val(myYear + "-" + mon + "-" + dday);
  $(".add span.colors").eq(0).addClass("actived");
});
//수정불러오기
$(document).on("click", ".schedule", function () {
  $(".update").removeClass("hidden");
  let num = $(this).attr("num");
  readData(num);
});
//tooltip 스케줄 마우스 오버
$(document).on("mouseover", ".sch .schedule", function (e) {
  $(".tooltip").css({
    left: e.pageX - 10 + "px",
    top: e.pageY + 15 + "px",
  });
  $(".tooltip").removeClass("hidden");
  let title = $(this).attr("titles");

  $(".tooltip").html(title);
});

$(document).on("mouseout", ".schedule", function () {
  $("div.tooltip").addClass("hidden");
});

$(".btn_close_up").click(function () {
  $(".update").addClass("hidden");
});

$(".btn_close").click(function () {
  modalClose();
});

//모달 컬러 선택
$(".colors").click(function () {
  $(this).addClass("actived");
  $(this).siblings().removeClass("actived");
});

//모달 닫기함수
function modalClose() {
  $(".colors").removeClass("actived");
  $("#add_title").val("");
  $("#add_date").val("");
  $("#add_memo").val("");
  $(".modal").addClass("hidden");
}
//달력 그리기 함수
function writeCalendar(year, month) {
  let tdtr = "";
  let mydate = new Date(year, month - 1, 1);
  myWeek = mydate.getDay();

  //월의 날자수 구하기
  switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
      myDay = 30;
      break;
    case 2:
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        myDay = 29;
      } else {
        myDay = 28;
      }
      break;
    default:
      myDay = 31;
      break;
  }

  //테이블 요일 출력
  tdtr += "<table class='cal'>";
  tdtr += "<thead><tr class='week'>";
  for (let i = 0; i < weeks.length; i++) {
    tdtr += "<td>" + weeks[i] + "</td>";
  }
  tdtr += "</tr>";
  tdtr += "</thead><tbody>";
  tdtr += "<tr>";
  for (let i = 0; i < myWeek; i++) {
    if (myWeek == 0) {
      break;
    }
    tdtr += "<td> </td>";
  }
  //날짜 넣기
  for (let i = 1; i <= myDay; i++) {
    myWeek++;

    tdtr +=
      "<td class='" +
      i +
      "'><span>" +
      i +
      "</span><div class='sch'></div></td>";

    if (myWeek % 7 == 0 && i != myDay) {
      tdtr += "</tr><tr>";
    }
    if (i == myDay) {
      tdtr += "</tr>";
    }
  }

  //출력
  tdtr += "</tbody></table>";
  $("#myCalendar").html(tdtr);
  printData();
  localApply();
}

//데이터 추가함수
function addData(colors, title, dates, memo) {
  $.ajax({
    type: "post",
    data: {
      colors: colors,
      title: title,
      dates: dates,
      memo: memo,
    },
    url: "../calendar/datajsp/addData.jsp",
    dataType: "html",
    success: function () {
      modalClose();
      printData();
    },
  });
}
//데이터 출력함수
function printData() {
  $.ajax({
    type: "post",
    url: "../calendar/datajsp/printData.jsp",
    dataType: "xml",
    success: function (data) {
      let sch = "";
      $(".sch").empty();
      $(data)
        .find("cal")
        .each(function (i, element) {
          let item = $(element);
          let num = item.attr("num");
          let title =
            item.find("title").text() == null
              ? "일정"
              : item.find("title").text();
          let colors = item.find("colors").text();
          let date = item.find("dates").text().toString();
          let dateY = date.substring(0, 4);
          let dateM = date.substring(5, 7);
          let dateD = date[8] == 0 ? date[9] : date.substring(8, date.length);
          if (myYear == dateY && myMonth == dateM) {
            sch =
              "<div class='schedule scheduleicon' style='background-color:" +
              colors +
              "; color:" +
              colors +
              ";' titles='" +
              title +
              "' num='" +
              num +
              "'></div>";
            let cell = "." + dateD + " .sch";

            $(cell).append(sch);
          }
        });
    },
  });
}
//데이터 읽기함수
function readData(num) {
  $.ajax({
    type: "get",
    url: "../calendar/datajsp/getData.jsp",
    dataType: "json",
    data: { num: num },
    success: function (data) {
      $(".up_form").attr("num", data.num);
      $("#up_title").val(data.title);
      $("#up_date").val(data.dates);
      $("#up_memo").val(data.memo);
      let color = ".up_colors span[name='" + data.colors + "']";
      $(color).addClass("actived");
      $(color).siblings().removeClass("actived");
    },
  });
}
//데이터 수정함수
function updateData(num, title, dates, colors, memo) {
  $.ajax({
    type: "post",
    url: "../calendar/datajsp/updateData.jsp",
    dataType: "html",
    data: {
      num: num,
      title: title,
      dates: dates,
      colors: colors,
      memo: memo,
    },
    success: function (data) {
      printData();
      viewAll();
    },
  });
}
//데이터 삭제함수
function deleteData(num) {
  $.ajax({
    type: "get",
    url: "../calendar/datajsp/deleteData.jsp",
    dataType: "html",
    data: { num: num },
    success: function () {
      printData();
      viewAll();
      modalClose();
    },
  });
}
// 일정보기 함수
function viewAll() {
  $.ajax({
    type: "post",
    url: "../calendar/datajsp/printData.jsp",
    dataType: "xml",
    success: function (data) {
      let p = "";
      $(".all_sch").empty();
      $(data)
        .find("cal")
        .each(function (i, element) {
          let item = $(element);
          let num = item.attr("num");
          let title = item.find("title").text();
          let colors = item.find("colors").text();
          let memo = item.find("memo").text();
          let dates = item.find("dates").text().toString();
          let dateY = parseInt(dates.substring(0, 4));
          let dateM = parseInt(dates.substring(5, 7));
          let dateD = parseInt(
            dates[8] == 0 ? dates[9] : dates.substring(8, dates.length)
          );
          let dday = new Date();
          dday.setFullYear(dateY, dateM - 1, dateD);
          if (today.getTime() < dday.getTime()) {
            for (i = 0; i < item.length; i++) {
              p += "<div class='schedule' num='" + num + "'>";
              p +=
                "<span class='scheduleicon' style='background-color:" +
                colors +
                "'></span>";
              p += "<span>" + dates + "</span>";
              p += "<span style='font-size:1.2em';>" + title + "</span>";
              p += "<span style='color:#575757;'>" + memo + "</span>";
              p += "</div>";
            }
          }
        });

      $(".all_sch").append(p);
    },
  });
}
//이전 일정보기함수
function viewpreAll() {
  $.ajax({
    type: "post",
    url: "../calendar/datajsp/printData.jsp",
    dataType: "xml",
    success: function (data) {
      let p = "";
      $(".all_sch").empty();
      $(data)
        .find("cal")
        .each(function (i, element) {
          let item = $(element);
          let num = item.attr("num");
          let title = item.find("title").text();
          let colors = item.find("colors").text();
          let memo = item.find("memo").text();
          let dates = item.find("dates").text().toString();
          let dateY = parseInt(dates.substring(0, 4));
          let dateM = parseInt(dates.substring(5, 7));
          let dateD = parseInt(
            dates[8] == 0 ? dates[9] : dates.substring(8, dates.length)
          );

          for (i = 0; i < item.length; i++) {
            p += "<div class='schedule' num='" + num + "'>";
            p +=
              "<span class='scheduleicon' style='background-color:" +
              colors +
              "'></span>";
            p += "<span>" + dates + "</span>";
            p += "<span style='font-size:1.2em';>" + title + "</span>";
            p += "<span style='color:#575757;'>" + memo + "</span>";
            p += "</div>";
          }
        });

      $(".all_sch").append(p);
    },
  });
}
//색상 정렬함수
function sortColor(color) {
  $.ajax({
    type: "post",
    url: "../calendar/datajsp/colorSortData.jsp",
    dataType: "xml",
    data: {
      colors: color,
    },
    success: function (data) {
      let p = "";
      $(".all_sch").empty();
      let nullcheck = $(data).find("cal").text();
      if (nullcheck == "") {
        p = "<span>일정 없음</span>";
        $(".all_sch").append(p);
      } else {
        $(data)
          .find("cal")
          .each(function (i, element) {
            let item = $(element);
            let num = item.attr("num");
            let title = item.find("title").text();
            let colors = item.find("colors").text();
            let memo = item.find("memo").text();
            let dates = item.find("dates").text().toString();
            let dateY = dates.substring(0, 4);
            let dateM = dates.substring(5, 7);
            let dateD =
              dates[8] == 0 ? dates[9] : dates.substring(8, dates.length);
            let dday = new Date();
            dday.setFullYear(dateY, dateM - 1, dateD);
            if (today.getTime() < dday.getTime()) {
              for (i = 0; i < item.length; i++) {
                p += "<div class='schedule' num='" + num + "'>";
                p +=
                  "<span class='scheduleicon' style='background-color:" +
                  colors +
                  "'></span>";
                p += "<span>" + dates + "</span>";
                p += "<span style='font-size:1.2em';>" + title + "</span>";
                p += "<span style='color:#575757;'>" + memo + "</span>";
                p += "</div>";
              }
            }
          });
        $(".all_sch").append(p);
      }
    },
  });
}
