<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

// we need this to load the parent styles
// https://developer.wordpress.org/themes/advanced-topics/child-themes/
function erfindergeist_styles()
{
  wp_enqueue_style(
    'loading-shimmer-style',
    plugins_url( '/', __FILE__ ) . 'loading-shimmer.css',
    array(),
    1.0
  );

  wp_enqueue_script(
    'gcalendar-script',
    plugins_url( '/', __FILE__ ) . 'gcalendar.js',
    array('jquery'),
    1.3,
    true
  );
}

add_action('wp_enqueue_scripts', 'erfindergeist_styles');
