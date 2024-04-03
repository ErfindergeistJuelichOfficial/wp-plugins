(function( discord, $, undefined ) {

function createDiv(html) {
  const newDiv = document.createElement('div');
  $(newDiv).html(html);
  document.body.appendChild(newDiv);
}

discord.init = function() {
  const htmlBubbleString = `
    <div id="egjDiscordBubbleContainer" class="egj-discord-bubble-container">
      <div class="egj-discord-talk-bubble egj-discord-tri egj-discord-border">
        &nbsp;            
      </div>   
    </div>`;

  createDiv(htmlBubbleString);

  const container = document.getElementById("egjDiscordBubbleContainer");
  container.addEventListener('click', event => {
    window.open("http://discord.erfindergeist.org", '_blank').focus();
  });

}

}( window.discord = window.discord || {}, jQuery ));

discord.init();