<?php
/** Nashville Sheila theme setup. */
function nashville_sheila_setup() {
    add_theme_support('title-tag');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array('style', 'script'));
}
add_action('after_setup_theme', 'nashville_sheila_setup');
function nashville_sheila_styles() {
    wp_enqueue_style('nashville-sheila', get_stylesheet_uri(), array(), '1.0.0');
}
add_action('wp_enqueue_scripts', 'nashville_sheila_styles');

/** Resolve links for both standard and plain WordPress permalink settings. */
function nashville_sheila_page_url($slug) {
    if ($slug === 'index') return home_url('/');
    $page = get_page_by_path($slug);
    return $page ? get_permalink($page->ID) : home_url('/' . $slug . '/');
}
/** Create missing pages on theme activation; do not overwrite existing content. */
function nashville_sheila_create_pages() {
    $pages = array('buy'=>'Buying a Home','sell'=>'Selling Your Home','listings'=>'Property Listings','about'=>'About Sheila','contact'=>'Contact Sheila','search'=>'Search Homes','guides'=>'Buyer & Seller Guides');
    foreach ($pages as $slug => $title) {
        if (get_page_by_path($slug)) continue;
        $id = wp_insert_post(array('post_type'=>'page','post_status'=>'publish','post_title'=>$title,'post_name'=>$slug), true);
        if (!is_wp_error($id)) update_post_meta($id, '_wp_page_template', 'page-' . $slug . '.php');
    }
}
add_action('after_switch_theme', 'nashville_sheila_create_pages');
