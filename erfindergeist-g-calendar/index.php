<?php
/**
 * Plugin Name: Erfindergeist
 * Description: Some Admin Settings onlfy for Erfindergeist Hülich
 * Author: Lars vreezy Eschweiler
 * Author URI: https://www.vreezy.de
 * Version: 1.0.0
 * Text Domain: erfindergeist
 * Domain Path: /languages
 * Tested up to: 6.0
 *
 *
 * @package Erfindergeist
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

include 'styles.php';
include 'apis.php';

/** Step 2 (from text above). */
add_action( 'admin_menu', 'my_plugin_menu' );

/** Step 1. */
function my_plugin_menu() {
   add_menu_page('Erfindergeist Options', 'Erfindergeist', 'manage_options', 'erfindergeist', 'erfindergeist_plugin_options');

   add_submenu_page( 'erfindergeist', 'Discord', 'Discord', 'manage_options', 'erfindergeist-discord-submenu-handle', 'discord_settings_page');
   add_submenu_page( 'erfindergeist', 'Google Calendar', 'Google Calendar', 'manage_options', 'erfindergeist-g-calendar-submenu-handle', 'g_calendar_settings_page');


	// add_options_page( 'Erfindergeist Options', 'Erfindergeist', 'manage_options', 'erfindergeist', 'mt_settings_page' );
}

/** Step 3. */
function erfindergeist_plugin_options() {

   //must check that the user has the required capability 
	if ( !current_user_can( 'manage_options' ) )  {
		wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
	}
	echo '<div class="wrap">';
	echo '<h2>Erfindergeist</h2>';
   echo '<p>Use Submenus for Options</p>';
	echo '</div>';
}


// mt_settings_page() displays the page content for the Test Settings submenu
function g_calendar_settings_page() {

    //must check that the user has the required capability 
    if (!current_user_can('manage_options'))
    {
      wp_die( __('You do not have sufficient permissions to access this page.') );
    }

    // variables for the field and option names 
    $hidden_field_name = 'mt_submit_hidden';

    $apikey_opt_name = 'g_Calendar_apikey';
    $google_calendar_id_opt_name = 'g_Calendar_id';

    $apikey_field_name = 'apikey';
    $google_calendar_id_field_name = 'gcid';

    // Read in existing option value from database
    $apikey_opt_val = get_option( $apikey_opt_name );
    $google_calendar_id_opt_val = get_option( $google_calendar_id_opt_name );

    // See if the user has posted us some information
    // If they did, this hidden field will be set to 'Y'
    if( isset($_POST[ $hidden_field_name ]) && $_POST[ $hidden_field_name ] == 'Y' ) {
        // Read their posted value
        $apikey_opt_val = $_POST[ $apikey_field_name ];
        $google_calendar_id_opt_val = $_POST[ $google_calendar_id_field_name ];

        // Save the posted value in the database
        update_option( $apikey_opt_name, $apikey_opt_val );
        update_option( $google_calendar_id_opt_name, $google_calendar_id_opt_val );

        // Put a "settings saved" message on the screen

?>
<div class="updated"><p><strong><?php _e('settings saved.', 'menu-test' ); ?></strong></p></div>
<?php

    }

    // Now display the settings editing screen

    echo '<div class="wrap">';

    // header

    echo "<h2>" . __( 'Erfindergeist Google Calendar Settings', 'menu-test' ) . "</h2>";

    // settings form
    
    ?>

<form name="form1" method="post" action="">
<input type="hidden" name="<?php echo $hidden_field_name; ?>" value="Y">

<p><?php _e("Apikey:", 'menu-test' ); ?> 
<input type="text" name="<?php echo $apikey_field_name; ?>" value="<?php echo $apikey_opt_val; ?>" size="40">
find the apikey in the <a href="https://console.cloud.google.com/apis/api/calendar-json.googleapis.com" target="_blank" rel="nooper">google console</a>.
</p><hr />

<p><?php _e("google calendar id:", 'menu-test' ); ?> 
<input type="text" name="<?php echo $google_calendar_id_field_name; ?>" value="<?php echo $google_calendar_id_opt_val; ?>" size="60">
</p><hr />

<p class="submit">
<input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e('Save Changes') ?>" />
</p>

</form>
</div>

<?php
 
}



// mt_settings_page() displays the page content for the Test Settings submenu
function discord_settings_page() {

   //must check that the user has the required capability 
   if (!current_user_can('manage_options'))
   {
     wp_die( __('You do not have sufficient permissions to access this page.') );
   }

   // variables for the field and option names 
   $hidden_field_name = 'mt_submit_hidden';

   $erfindergeist_discord_iframe_html_opt_name = 'erfindergeist_discord_iframe_html';
   
   $erfindergeist_discord_iframe_html_field_name = 'iframeHTML';
   

   // Read in existing option value from database
   $erfindergeist_discord_iframe_html_opt_val = get_option( $erfindergeist_discord_iframe_html_opt_name );

   // See if the user has posted us some information
   // If they did, this hidden field will be set to 'Y'
   if( isset($_POST[ $hidden_field_name ]) && $_POST[ $hidden_field_name ] == 'Y' ) {
       // Read their posted value
       $erfindergeist_discord_iframe_html_opt_val = $_POST[ $erfindergeist_discord_iframe_html_field_name ];
       
       // Save the posted value in the database
       update_option( $erfindergeist_discord_iframe_html_opt_name, $erfindergeist_discord_iframe_html_opt_val );
       

       // Put a "settings saved" message on the screen

?>
<div class="updated"><p><strong><?php _e('settings saved.', 'menu-discord' ); ?></strong></p></div>
<?php

   }

   // Now display the settings editing screen

   echo '<div class="wrap">';

   // header

   echo "<h2>" . __( 'Erfindergeist Discord Settings', 'menu-discord' ) . "</h2>";

   // settings form
   
   ?>

<form name="form1" method="post" action="">
<input type="hidden" name="<?php echo $hidden_field_name; ?>" value="Y">

<p><?php _e("iFrame HTML:", 'menu-discord' ); ?> 

<textarea id="text" name="<?php echo $erfindergeist_discord_iframe_html_field_name; ?>" rows="12" cols="50"><?php echo stripslashes($erfindergeist_discord_iframe_html_opt_val); ?></textarea>

</p><hr />

<p class="submit">
<input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e('Save Changes') ?>" />
</p>

</form>
</div>

<?php

}