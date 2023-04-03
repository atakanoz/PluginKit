<?php
/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              authoruri.com
 * @since             1.0.0
 * @package           PluginKit
 *
 * @wordpress-plugin
 * Plugin Name:       PluginKit
 * Plugin URI:        pluginkit.com
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            authorname
 * Author URI:        authoruri.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       pluginkit
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Global Definitions.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PLUGINKIT', 'pluginkit' );
define( 'PLUGINKIT_NAME', 'PluginKit' );
define( 'PLUGINKIT_VERSION', '1.0.0' );
define( 'PLUGINKIT_FILE', __FILE__ );
define( 'PLUGINKIT_PLUGIN_DIR', trailingslashit( dirname( PLUGINKIT_FILE ) ) );
define( 'PLUGINKIT_PLUGIN_URL', trailingslashit( plugin_dir_url( PLUGINKIT_FILE ) ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-pluginkit-activator.php
 */
function activate_pluginkit() {

	require_once PLUGINKIT_PLUGIN_DIR . 'includes/core/class-pluginkit-activator.php';

	$activate = new PluginKit\Activator();

	$activate->run();

}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-pluginkit-deactivator.php
 */
function deactivate_pluginkit() {

	require_once PLUGINKIT_PLUGIN_DIR . 'includes/core/class-pluginkit-deactivator.php';

	$deactivate = new PluginKit\Deactivator();

	$deactivate->run();

}

register_activation_hook( __FILE__, 'activate_pluginkit' );
register_deactivation_hook( __FILE__, 'deactivate_pluginkit' );

// require_once PLUGINKIT_PLUGIN_DIR . 'resources/admin/config.php';

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require PLUGINKIT_PLUGIN_DIR . 'includes/class-pluginkit.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function pluginkit_init() {
	PluginKit\Core::instance();
}

add_action( 'plugins_loaded', 'pluginkit_init' );
