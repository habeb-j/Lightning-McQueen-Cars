var carDetails = {
  "CR-001": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 0,
    color: "أبيض",
  },
  "CR-002": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 15000,
    color: "أسود",
  },
  "CR-003": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 0,
    color: "فضي",
  },
  "CR-004": {
    fuel: "بنزين",
    trans: "عادي",
    seats: 4,
    odo: 30000,
    color: "أحمر",
  },
  "CR-005": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 5000,
    color: "رمادي",
  },
  "CR-006": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 20000,
    color: "أزرق",
  },
  "CR-007": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 10000,
    color: "أبيض",
  },
  "CR-008": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 0,
    color: "أحمر",
  },
  "CR-009": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 7,
    odo: 5000,
    color: "أسود",
  },
  "CR-010": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 0,
    color: "فضي",
  },
  "CR-011": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 40000,
    color: "رمادي",
  },
  "CR-012": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 7,
    odo: 15000,
    color: "أزرق",
  },
  "CR-013": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 60000,
    color: "أبيض",
  },
  "CR-014": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 10000,
    color: "أسود",
  },
  "CR-015": {
    fuel: "بنزين",
    trans: "أوتوماتيك",
    seats: 5,
    odo: 25000,
    color: "فضي",
  },
};

$(document).ready(function () {
  $(".show-details").change(function () {
    var id = $(this).val();
    var modelName = $(this).closest("tr").find("td").eq(1).text();

    if ($(this).is(":checked")) {
      var data = carDetails[id];
      var html =
        "<div id='detail-box-" +
        id +
        "' class='detail-text'>" +
        "<img src='images/" +
        modelName +
        ".png' alt='" +
        modelName +
        "' style='width: 150px; float: left; margin-left: 15px;' />" +
        "<strong>السيارة " +
        modelName +
        ":</strong> نوع الوقود: " +
        data.fuel +
        " | ناقل الحركة: " +
        data.trans +
        " | عدد المقاعد: " +
        data.seats +
        " | عداد الكيلومترات: " +
        data.odo +
        " | اللون: " +
        data.color +
        "<div style='clear: both;'></div></div>";
      $("#details-area").append(html);
    } else {
      $("#detail-box-" + id).remove();
    }
  });

  $(".select-car").change(function () {
    if ($(this).is(":checked")) {
      $(this).closest("tr").css("background-color", "#e0f7fa");
    } else {
      $(this).closest("tr").css("background-color", "white");
    }

    var selectedCars = $(".select-car:checked").length;
    $("#car-counter").text(selectedCars + " سيارة مختارة");

    if (selectedCars > 0) {
      $("#continueBtn").removeAttr("disabled");
    } else {
      $("#continueBtn").attr("disabled", "disabled");
      $("#form-area").html("");
    }
  });

  $("#continueBtn").click(function () {
    var selectedCars = $(".select-car:checked");

    if (selectedCars.length === 0) {
      alert("الرجاء اختيار سيارة واحدة على الأقل.");
      return;
    }

    var formHtml = `
            <form id="rentForm" action="" method="get">
                <fieldset>
                    <legend>معلومات مقدم الطلب</legend>
                    <label for="fullName">الاسم الكامل (أحرف عربية فقط):</label>
                    <input type="text" id="fullName" name="fullName" />
                    <label for="nationalID">الرقم الوطني (11 خانة):</label>
                    <input type="text" id="nationalID" name="nationalID" />
                    <label for="startDate">تاريخ بداية التأجير:</label>
                    <input type="date" id="startDate" name="startDate" />
                    <label for="endDate">تاريخ نهاية التأجير:</label>
                    <input type="date" id="endDate" name="endDate" />
                    <label for="mobile">رقم الموبايل (اختياري):</label>
                    <input type="text" id="mobile" name="mobile" />
                    <label for="email">البريد الإلكتروني (اختياري):</label>
                    <input type="text" id="email" name="email" />
                    <button type="submit" id="submitBtn">إرسال الطلب</button>
                </fieldset>
            </form>
        `;

    $("#form-area").html(formHtml);
    window.scrollTo(0, document.body.scrollHeight);

    $("#rentForm").submit(function (event) {
      event.preventDefault();

      var fullName = $("#fullName").val();
      var nationalID = $("#nationalID").val();
      var startDate = $("#startDate").val();
      var endDate = $("#endDate").val();
      var mobile = $("#mobile").val();
      var email = $("#email").val();

      if (fullName.search(/^[\u0600-\u06FF\s]+$/) !== 0) {
        alert("الرجاء إدخال اسم صحيح (أحرف عربية فقط).");
        return;
      }
      if (
        nationalID.search(
          /^(01|02|03|04|05|06|07|08|09|10|11|12|13|14)\d{9}$/,
        ) !== 0
      ) {
        alert("الرجاء إدخال رقم وطني صحيح (11 خانة ويبدأ برمز المحافظة).");
        return;
      }
      if (
        startDate.search(/^\d{4}-\d{2}-\d{2}$/) !== 0 ||
        endDate.search(/^\d{4}-\d{2}-\d{2}$/) !== 0
      ) {
        alert("الرجاء إدخال التواريخ بالصيغة الصحيحة (yyyy-mm-dd).");
        return;
      }

      var start = new Date(startDate);
      var end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        alert("التواريخ المدخلة غير صالحة.");
        return;
      }
      if (end <= start) {
        alert("تاريخ النهاية يجب أن يكون لاحقاً لتاريخ البداية.");
        return;
      }

      if (
        mobile !== "" &&
        mobile.search(/^(093|094|095|096|098|099)\d{7}$/) !== 0
      ) {
        alert("الرجاء إدخال رقم موبايل صحيح.");
        return;
      }
      if (email !== "" && email.search(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== 0) {
        alert("الرجاء إدخال بريد إلكتروني صحيح.");
        return;
      }

      var timeDiff = end.getTime() - start.getTime();
      var days = Math.ceil(timeDiff / (1000 * 3600 * 24));

      var totalCost = 0;
      var message = "السيارات المختارة:\n";

      $(".select-car:checked").each(function () {
        var model = $(this).attr("data-model");
        var price = parseFloat($(this).attr("data-price"));
        var carCost = days * price;
        totalCost += carCost;
        message +=
          "- " +
          model +
          " (عدد الأيام: " +
          days +
          ") - التكلفة: " +
          carCost +
          " ل.س\n";
      });

      if (days > 10) {
        totalCost = totalCost * 0.95;
        message += "\nتم تطبيق خصم 5% لتجاوز مدة التأجير 10 أيام.\n";
      }

      message += "\nالمبلغ الإجمالي: " + totalCost.toFixed(2) + " ل.س";

      alert(message);
      $("#form-area").html("");
      $("#details-area").html("");
      $(".select-car").prop("checked", false);
      $(".cars-table tbody tr").css("background-color", "white");
      $("#car-counter").text("0 سيارة مختارة");
      $("#continueBtn").attr("disabled", "disabled");
      window.scrollTo(0, 0);
    });
  });
});
