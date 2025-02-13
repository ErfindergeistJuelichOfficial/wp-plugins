<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

// CUSTOM APIS
// https://egj.vreezy.de/wp-json/erfindergeist/v1/gcalendar
add_action('rest_api_init', function () {
  register_rest_route('erfindergeist/v1', '/gcalendar', array(
    'methods'  => 'GET',
    'callback' => 'gcalendar'
  ));
});

function gcalendar($request)
{

  $apikey_opt_name = 'g_Calendar_apikey';
  $google_calendar_id_opt_name = 'g_Calendar_id';
  $cache_container_name = 'g_Calendar_cache_container';
  $cache_timestamp_name = 'g_Calendar_timestamp';

  $dateTime = new DateTime();

  
  if(isset($cache_date_name) && isset($cache_container_name))
  {
    $old_timestamp = get_option($cache_timestamp_name);
    $current_timestamp = date_timestamp_get($dateTime);

    if($current_timestamp - $old_timestamp > 1000)
    {
      
    }
    
    

  }
  else
  {
    if(!get_option( $apikey_opt_name ) && !get_option(  $google_calendar_id_opt_name )) {
      return new WP_Error('rest_custom_error', 'Apikey is not set', array('status' => 400));
    }
  
  
     
    $currentDate = $dateTime->format(DateTimeInterface::RFC3339);
     
    // google api dislike +00:00. replace with Z
    $currentDate = str_replace("+00:00", "Z", $currentDate);
    
    $gCalendarApiKey = get_option( $apikey_opt_name );
    $gCalendarId = get_option( $google_calendar_id_opt_name );
    $url = 'https://www.googleapis.com/calendar/v3/calendars/'.$gCalendarId.'/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=' . $currentDate . '&key='.$gCalendarApiKey;
     
    $content = file_get_contents($url);
   
    update_option($cache_container_name, json_encode($content));
    update_option($cache_date_name, date_timestamp_get($dateTime));

   
   
  }

  $response = new WP_REST_Response(json_decode($content, true)); 
  $response->set_status(200);
  return $response;
}
