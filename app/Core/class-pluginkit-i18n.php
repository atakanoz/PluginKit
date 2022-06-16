<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       authoruri.com
 * @since      1.0.0
 *
 * @package    PluginKit
 * @subpackage PluginKit/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    PluginKit
 * @subpackage PluginKit/includes
 * @author     authorname <authoeremail.com>
 */

namespace PluginKit\Core;

/**
 * Internalization
 */
class Internalization {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load() {

		load_plugin_textdomain(
			PLUGINKIT,
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
