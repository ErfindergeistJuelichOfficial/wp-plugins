<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

// we need this to load the parent styles
// https://developer.wordpress.org/themes/advanced-topics/child-themes/
function erfindergeistDiscordStyles()
{
  wp_enqueue_style(
    'discord-style',
    plugins_url( '/', __FILE__ ) . 'discord.css',
    array(),
    1.0
  );

  wp_enqueue_script(
    'discord-script',
    plugins_url( '/',  __FILE__ ) . 'discord.js',
    array('jquery'),
    1.3,
    true
  );
}

add_action('wp_enqueue_scripts', 'erfindergeistDiscordStyles');
