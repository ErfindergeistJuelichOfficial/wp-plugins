<?php
/**
 * Plugin Name: Erfindergeist Discord
 * Description: Discord Button for Erfindergeist Jülich e.V.
 * Author: Lars 'vreezy' Eschweiler
 * Author URI: https://www.vreezy.de
 * Version: 1.0.0
 * Text Domain: erfindergeist
 * Domain Path: /languages
 * Tested up to: 6.0
 *
 *
 * @package Erfindergeist-Discord
 */

 // Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

require_once 'styles.php';

function myPluginMenu() {
  // Empty or crash
}

add_action( 'admin_menu', 'myPluginMenu' );
