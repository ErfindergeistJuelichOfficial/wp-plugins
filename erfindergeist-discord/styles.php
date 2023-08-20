<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// we need this to load the parent styles
// https://developer.wordpress.org/themes/advanced-topics/child-themes/
function erfindergeist_discord_styles()
{
   wp_enqueue_style(
      'discord-style',
      // get_stylesheet_directory_uri() . '/styles/discord.css',
      plugins_url( '/', __FILE__ ) . 'discord.css',
      array(),
      1.0
   );

   wp_enqueue_script( 
      'discord-script',
      // get_stylesheet_directory_uri() . '/js/discord.js',
      plugins_url( '/',  __FILE__ ) . 'discord.js',
      array('jquery'),
      1.3,
      true
   );
}

add_action('wp_enqueue_scripts', 'erfindergeist_discord_styles');