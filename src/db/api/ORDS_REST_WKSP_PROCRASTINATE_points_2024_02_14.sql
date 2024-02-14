

BEGIN
  ORDS.ENABLE_SCHEMA(
      p_enabled             => TRUE,
      p_schema              => 'WKSP_PROCRASTINATE',
      p_url_mapping_type    => 'BASE_PATH',
      p_url_mapping_pattern => 'procrastinate',
      p_auto_rest_auth      => FALSE);
    
  ORDS.DEFINE_MODULE(
      p_module_name    => 'points',
      p_base_path      => '/points/',
      p_items_per_page => 0,
      p_status         => 'PUBLISHED',
      p_comments       => NULL);

  ORDS.DEFINE_TEMPLATE(
      p_module_name    => 'points',
      p_pattern        => 'current',
      p_priority       => 0,
      p_etag_type      => 'HASH',
      p_etag_query     => NULL,
      p_comments       => NULL);

  ORDS.DEFINE_HANDLER(
      p_module_name    => 'points',
      p_pattern        => 'current',
      p_method         => 'GET',
      p_source_type    => 'json/collection',
      p_mimes_allowed  => NULL,
      p_comments       => NULL,
      p_source         => 
'SELECT w.address as Wallet_Address,
       p.project_id,
       pr.name as Project_Name,
       SUM(p.points) as Total_Points
FROM points p
JOIN wallet w ON p.wallet_id = w.id
JOIN project pr ON p.project_id = pr.id
WHERE w.address = :wallet
and pr.name = :project
GROUP BY w.address, p.project_id, pr.name
ORDER BY p.project_id
');

  ORDS.DEFINE_PARAMETER(
      p_module_name        => 'points',
      p_pattern            => 'current',
      p_method             => 'GET',
      p_name               => 'project',
      p_bind_variable_name => 'project',
      p_source_type        => 'HEADER',
      p_param_type         => 'STRING',
      p_access_method      => 'IN',
      p_comments           => NULL);

  ORDS.DEFINE_PARAMETER(
      p_module_name        => 'points',
      p_pattern            => 'current',
      p_method             => 'GET',
      p_name               => 'wallet',
      p_bind_variable_name => 'wallet',
      p_source_type        => 'HEADER',
      p_param_type         => 'STRING',
      p_access_method      => 'IN',
      p_comments           => NULL);

    
        
COMMIT;

END;