(function( gCalendar, $, undefined ) {

var days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

function getData(renderType) {
  
   $.getJSON( '/wp-json/erfindergeist/v1/gcalendar')
      .done(function( json ) {
         switch(renderType) {
            case 'gcalendarList':
               renderNormal(json);
               break;
            case 'gcalendarListShort':
               renderShort(json);
               break;
         } 
      })
      .fail(function( jqxhr, textStatus, error ) {
         var err = textStatus + ", " + error;
         console.log( "Request Failed: " + err );
         renderError(renderType);
      });
      
}

function renderError(renderType) {
   var html = `
      <div class="wp-block-coblocks-column__inner has-no-padding has-no-margin">
         Error Loading data.
      </div>
   `
   $(`#${renderType}`).html(html);
}

function renderShort(data) {
   if(data && data.items && Array.isArray(data.items) && data.items.length > 0) {
      
      var html = `<div class="wp-block-coblocks-column__inner has-no-padding has-no-margin">`;
      for(i = 0; i < data.items.length; i++) {
         
         const ele = data.items[i];

         var startDate = "";
         var endDate = "";
         var startTime  = "";
         var endTime = "";

         if(ele?.start?.dateTime && ele?.end.dateTime) {
            startDate = new Date(ele.start.dateTime).toLocaleDateString();
            endDate = new Date(ele.end.dateTime).toLocaleDateString();
            var startTime = new Date(ele.start.dateTime).toLocaleTimeString().slice(0, -3);
            var endTime = new Date(ele.end.dateTime).toLocaleTimeString().slice(0, -3);
         }
     
         var dateFormated = "";

         if(startDate === endDate) {
            dateFormated = `[${days[new Date(ele.start.dateTime).getDay()]}, ${startDate}, ${startTime} - ${endTime}]`;
         }
         else {
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
      $('#gcalendarListShort').html(html);
   }
}

function renderNormal(data) {
   if(data && data.items && Array.isArray(data.items) && data.items.length > 0) {

      var html = `<div class="wp-block-coblocks-column__inner has-no-padding has-no-margin">`; 
      for(i = 0; i < data.items.length; i++) {

         const ele = data.items[i];
 
         html += `<p>${i + 1} - ${ele.summary} <br>`;
         html += ele.description ? `${ele.description} <br>` : "";
         html += ele.start.dateTime ? `Start: ${new Date(ele.start.dateTime).toLocaleDateString()} ${new Date(ele.start.dateTime).toLocaleTimeString().slice(0, -3)}<br>` : "";
         html += ele.end.dateTime ?  `Ende: ${new Date(ele.end.dateTime).toLocaleDateString()} ${new Date(ele.end.dateTime).toLocaleTimeString().slice(0, -3)}<br>` : "";
         html += "</p><br>";       
         
      }

      html += `</div>`;
      $('#gcalendarList').html(html);
   }
}

gCalendar.init = function() {
   if(document.getElementById('gcalendarList')) {
      getData('gcalendarList');
   };

   if(document.getElementById('gcalendarListShort')) {
      getData('gcalendarListShort');
   }
}

}( window.gCalendar = window.gCalendar || {}, jQuery ));

jQuery( document ).ready(function() {
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