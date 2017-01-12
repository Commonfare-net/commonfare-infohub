<?php

$databases = array();
$config_directories = array();
$settings['hash_salt'] = 'aXL-fq4hPT_tZXQSJL0lVxwVAU3ETQGwOGh09YzogJq236ythr6h1pZNHisvqZWqWJuNlFOFxA';
$settings['update_free_access'] = FALSE;
$settings['container_yamls'][] = __DIR__ . '/services.yml';
$settings['trusted_host_patterns'] = array(
  '^commonfare\.eu$',
  '^.+\.commonfare\.eu$',
  '^commonfare\.eu$',
  '^.+\.commonfare\.eu$',
  '^drupalvm\.dev$',
  '^localhost$',
  '^192.168.32.246$',
  '^www.commonfare.ddns.net$',
);
$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];
$databases['default']['default'] = array (
  'database' => 'drupal',
  'username' => 'drupal',
  'password' => 'drupal',
  'prefix' => '',
  'host' => 'mariadb',
  'port' => '',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
);
$settings['install_profile'] = 'standard';
$config_directories['sync'] = 'sites/default/files/config_eAk2M2pW6Pe7EWjbOHmtOYX2NB7rPzkBr6yDi_67tVO_954aQ_h5Wdje-5TO0U4XKF4BK3QKQg/sync';
