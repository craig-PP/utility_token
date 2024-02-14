begin
    ORDS.create_role(
        p_role_name => 'token_api_role' ); 
end;

begin
 
    ORDS.create_privilege(
        p_name          => 'token_api_priv',
        p_role_name     => 'token_api_role',
        p_label         => 'Token API Privilege',
        p_description   => 'Privilege to access the token API');
         
    ORDS.create_privilege_mapping(
        p_privilege_name => 'token_api_priv',
        p_pattern        => '/points/*');     
         
    commit;
 
end;

begin
 
  OAUTH.create_client(
    p_name            => 'pp_demo_client',
    p_grant_type      => 'client_credentials',
    p_owner           => 'Procrastinate Pixels',
    p_description     => 'A client for the Procrastinate Pixels demo application',
    p_support_email   => 'craig@procrastinatepixels.com',
    p_privilege_names => 'token_api_priv'
  );
 
  OAUTH.grant_client_role(
    p_client_name     => 'pp_demo_client',
    p_role_name       => 'token_api_role'
  );
 
  commit;
 
end;