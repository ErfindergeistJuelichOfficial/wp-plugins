(function( discord, $, undefined ) {

const iframeContainerClass = `egj-discord-iframe-container`;
const iFrameContainerId = `egjDiscordIframeContainer`;

const bubbleContainerId =  `egjDiscordBubbleContainer`; 

const privacyContainerId = `egjDiscordPrivacyContainer`;

const privacyButtonId = `egjDiscordPrivacyButton`; 

discord.privacyAccepted = false;
discord.privacyContainerCreated = false;

function getVW() {
   return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);;
}

function getVH() {
   return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);;
}

function getData() {
   console.log("egj discord getData");
   $.get( '/wp-json/erfindergeist/v1/discord')
      .done(function( data ) {
         render(data);   
      })
      .fail(function( jqxhr, textStatus, error ) {
         var err = textStatus + ", " + error;
         console.log( "Request Failed: " + err );
         renderError();
      });
}

function renderError() {
   console.log("egj discord renderError.");
   var htmlIframeString = `
      <div id="${iFrameContainerId}" class="${iframeContainerClass} egj-discord-fade-in">
         Error Loading data.
      </div>
   `;

   createDiv(htmlIframeString);

   const bubbleContainer = $( `#${bubbleContainerId}` ).first();
   const iFrameContainer = $( `#${iFrameContainerId}` ).first();

   const privacyCSSTop = bubbleContainer.position().top - iFrameContainer.height() - 10;
   iFrameContainer.css("top", privacyCSSTop);
   iFrameContainer.show();
}

function render(data) {
   console.log("egj discord render.");
   var htmlIframeString = `
      <div id="${iFrameContainerId}" class="${iframeContainerClass} egj-discord-fade-in">
         ${data}
      </div>
   `;

   createDiv(htmlIframeString);

   const bubbleContainer = $( `#${bubbleContainerId}` ).first();
   const iFrameContainer = $( `#${iFrameContainerId}` ).first();

   const privacyCSSTop = bubbleContainer.position().top - iFrameContainer.height() - 10;
   iFrameContainer.css("top", privacyCSSTop);
   iFrameContainer.show();
}

discord.toggleDiscord = function() {
   console.log("egj discord toggleDiscord")
   if(getVW() < 768 || getVH() < 900) {
      window.location.href = "/discord/";
      return;
   }

   const iFrameContainer = $( `#${iFrameContainerId}` ).first();

   if(!iFrameContainer.length){
      getData();
   }
   else  {
      if(iFrameContainer.is(":visible")) {
         iFrameContainer.hide();
      }
      else {
         iFrameContainer.show();
      }
   }

}

discord.showPrivacy = function() {
   const htmlPrivacyString = `
      <div id="${privacyContainerId}" class="egj-discord-privacy-container">
         <span style="background: white">Akzeptieren Sie unsere <a href="datenschutz/">Datenschutzerklärung</a>? </span>
         <div class="wp-block-button is-style-shadow w-100">
            <a id=${privacyButtonId} class="wp-block-button__link" >Akzeptieren</a>
         </div>
      </div>`;
   
   if(!discord.privacyContainerCreated) {
      createDiv(htmlPrivacyString);
      discord.privacyContainerCreated = true;
   }
 
   const privacyButton = $( `#${privacyButtonId}` ).first();

   privacyButton.click(() => {
      discord.privacyAccepted = true;
      privacyContainer.hide()
      discord.toggleDiscord();      
   });
   
   const bubbleContainer = $( `#${bubbleContainerId}` ).first();
   const privacyContainer = $( `#${privacyContainerId}` ).first();

   const privacyCSSTop = bubbleContainer.position().top - privacyContainer.height() - 10;
   privacyContainer.css("top", privacyCSSTop);
}

function createDiv(html) {
   var newDiv = document.createElement('div');
   $(newDiv).html(html);
   document.body.appendChild(newDiv);
}

discord.init = function() {
   
   var htmlBubbleString = `
      <div id="egjDiscordBubbleContainer" class="egj-discord-bubble-container">
         <div class="egj-discord-talk-bubble egj-discord-tri egj-discord-border">
            &nbsp;            
         </div>   
      </div>`;

   createDiv(htmlBubbleString);

   const container = document.getElementById("egjDiscordBubbleContainer");
   container.addEventListener('click', event => {
      if(!discord.privacyAccepted) {
         discord.showPrivacy();
      }
      else {
         discord.toggleDiscord();
      }
   });

}

}( window.discord = window.discord || {}, jQuery ));

discord.init();