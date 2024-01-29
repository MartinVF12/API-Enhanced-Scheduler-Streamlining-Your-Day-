$(document).ready(function () {
    $(".saveBtn").on("click", function () {
        var hour = $(this).parent().attr("data-hour");
        var text = $(this).siblings(".description").val();
        localStorage.setItem(hour, text);
    });


    function updateTimeBlocks() {
        var currentHour = dayjs().hour();

        $(".time-block").each(function () {
            var timeBlockHour = parseInt($(this).attr("data-hour"));

            if (timeBlockHour < currentHour) {
                $(this).addClass("past").removeClass("present future");
            } else if (timeBlockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    }

    function loadEvents() {
        $(".time-block").each(function () {
            var timeBlockHour = $(this).attr("data-hour");
            var savedEvent = localStorage.getItem(timeBlockHour);

            if (savedEvent) {

                $(this).find(".description").val(savedEvent);
            }
        });
    }

    updateTimeBlocks();

    setInterval(updateTimeBlocks, 60000);


    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
    loadEvents();
});



//cambios