<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


// CUSTOM APIS
https://egj.vreezy.de/wp-json/erfindergeist/v2/discord
add_action('rest_api_init', function () {
   register_rest_route('erfindergeist/v1', '/discord', array(
      'methods'  => 'GET',
      'callback' => 'discord'
   ));
});


function discord($request)
{
   $erfindergeist_discord_iframe_html_opt_name = 'erfindergeist_discord_iframe_html';
   
   if(!get_option( $erfindergeist_discord_iframe_html_opt_name ) ) {
      return new WP_Error('rest_custom_error', 'Error finding option', array('status' => 400));
   }

   $erfindergeist_discord_iframe_html_opt_value = stripslashes(get_option( $erfindergeist_discord_iframe_html_opt_name ));

   $response = new WP_REST_Response($erfindergeist_discord_iframe_html_opt_value); 
   $response->set_status(200);

   return $response;

}