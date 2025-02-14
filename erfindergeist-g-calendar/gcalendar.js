(function (gCalendar, $, undefined) {
  const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  function getGermanDateString(date) {
    const event = new Date(date);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    return event.toLocaleDateString("de-DE", options);
  }

  function getGermanTimeString(date) {
    const event = new Date(date);

    return event.toLocaleTimeString("de-De", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getGermanWeekDayShortString(date) {
    const event = new Date(date);
    const options = {
      weekday: "short",
    };

    return event.toLocaleDateString("de-DE", options);
  }

  function getData(renderType) {
    $.getJSON("/wp-json/erfindergeist/v1/gcalendar")
      .done(function (json) {
        switch (renderType) {
          case "gcalendarList":
            renderNormal(json);
            break;
          case "gcalendarListShort":
            renderShort(json);
            break;
        }
      })
      .fail(function (jqxhr, textStatus, error) {
        const err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
        renderError(renderType);
      });
  }

  function renderError(renderType) {
    const html = `
      <div class="wp-block-coblocks-column__inner has-no-padding has-no-margin">
         Error Loading data.
      </div>
   `;
    $(`#${renderType}`).html(html);
  }

  function transform(data) {
    const newItems = data.items.map((item) => {
      const patern = /#[a-zA-Z0-9äüö]*/g;
      const tags = item.description.match(patern);

      return {
        summary: item.summary ?? "",
        description: item.description ?? "",
        location: item.location ?? "",
        startDate: item.start?.dateTime
          ? getGermanDateString(item.start.dateTime)
          : "",
        startTime: item.start?.dateTime
          ? getGermanTimeString(item.start.dateTime)
          : "",
        endDate: item.end?.dateTime
          ? getGermanDateString(item.end.dateTime)
          : "",
        endTime: item.end?.dateTime
          ? getGermanTimeString(item.end.dateTime)
          : "",
        weekDayShort: item.start.dateTime
          ? getGermanWeekDayShortString(item.start.dateTime)
          : "",
        tags:
          tags && Array.isArray(tags) && tags.length > 0
            ? tags.map((tag) => tag.substring(1))
            : [],
      };
    });

    const newData = {
      items: newItems,
    };

    return newData;
  }

  function renderShort(data) {
    if (data?.items && Array.isArray(data.items) && data.items?.length > 0) {
      let html = `<div class="wp-block-coblocks-column__inner has-no-padding has-no-margin">`;
      for (let i = 0; i < data.items.length; i++) {
        const ele = data.items[i];

        let startDate = "";
        let endDate = "";
        let startTime = "";
        let endTime = "";

        if (ele?.start?.dateTime && ele?.end.dateTime) {
          startDate = new Date(ele.start.dateTime).toLocaleDateString();
          endDate = new Date(ele.end.dateTime).toLocaleDateString();
          startTime = new Date(ele.start.dateTime)
            .toLocaleTimeString()
            .slice(0, -3);
          endTime = new Date(ele.end.dateTime)
            .toLocaleTimeString()
            .slice(0, -3);
        }

        let dateFormated = "";

        if (startDate === endDate) {
          dateFormated = `[${
            days[new Date(ele.start.dateTime).getDay()]
          }, ${startDate}, ${startTime} - ${endTime}]`;
        } else {
          dateFormated = `[${startDate}, ${startTime} - ${endDate}, ${endTime}]`;
        }

        html += `<p>`;
        html += `${dateFormated} <br>`;
        html += ele.summary ? `${ele.summary} <br>` : "";
        html += ele.description ? `${ele.description}` : "";
        html += `</p>`;
        html += i + 1 !== data.items.length ? `<hr>` : "";
      }

      html += `</div>`;
      $("#gcalendarListShort").html(html);
    }
  }

  function renderNormal(data) {
    const calenderTemplate = `
      <div class="wp-block-coblocks-column__inner has-no-padding has-no-margin container">
      {{#each items}}
        <div class="row">
          <div class="col">{{weekDayShort}}</div>
          <div class="col">{{summary}}, {{description}}, {{location}}{{startDate}}, {{startTime}}, 
           {{endDate}}, {{endTime}}, {{weekDayShort}}

            <div>
            {{#each tags as | tag |}}
              <span class="badge text-bg-primary">{{tag}}</span>
            {{/each}}
            </div>
          </div>
        </div>
      {{/each}}
      </div>
    `;

    //tags
    // #offeneWerkstatt
    // #repaircafe

    const template = Handlebars.compile(calenderTemplate);

    $("#gcalendarList").html(template(transform(data)));
  }

  gCalendar.init = function () {
    if (document.getElementById("gcalendarList")) {
      getData("gcalendarList");
    }

    if (document.getElementById("gcalendarListShort")) {
      getData("gcalendarListShort");
    }
  };
})((window.gCalendar = window.gCalendar || {}), jQuery);

jQuery(document).ready(function () {
  gCalendar.init();
});

// created: "2022-03-17T11:43:50.000Z"
// creator:
// email: "erfindergeistjuelich@gmail.com"
// [[Prototype]]: Object
// description: "Öffentliches Treffen, kleine Mitgliederversammlung, bei dem allgemeine Punkte besprochen werden. \n\nDie Veranstaltung, ist manchmal auch Online, über Discord (https://discord.com/invite/ye5bfzEd7D) könnt ihr uns schreiben, falls ihr mehr wissen wollt. "
// end:
// dateTime: "2022-03-19T14:00:00+01:00"
// timeZone: "Europe/Berlin"
// [[Prototype]]: Object
// etag: "\"3295034861140000\""
// eventType: "default"
// htmlLink: "https://www.google.com/calendar/event?eid=MDVkZzU2c2xoNjZpNWVhYmwzMDBsa2UxaXQgMDdpb2k1bjk0YWk1Mmk4NjJhZ2JoMTN0Z2NAZw"
// iCalUID: "05dg56slh66i5eabl300lke1it@google.com"
// id: "05dg56slh66i5eabl300lke1it"
// kind: "calendar#event"
// location: "Roncallihaus, Stiftsherrenstraße 19, 52428 Jülich, Deutschland"
// organizer:
// displayName: "EGJ Veranstaltungen "
// email: "07ioi5n94ai52i862agbh13tgc@group.calendar.google.com"
// self: true
// [[Prototype]]: Object
// sequence: 0
// start:
// dateTime: "2022-03-19T13:00:00+01:00"
// timeZone: "Europe/Berlin"
// [[Prototype]]: Object
// status: "confirmed"
// summary: "Plenum "
// updated: "2022-03-17T11:43:50.570Z"
