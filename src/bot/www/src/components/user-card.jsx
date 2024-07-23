import { useAccount } from '@micro-stacks/react';
import queryString from "query-string";

export const UserCard = () => {
  const { stxAddress } = useAccount();
  const urlParams = queryString.parse(window.location.search);
  const discordId = urlParams.authid;
  


  if (!stxAddress)
    return (
      <div className={'user-card'}>
        <h3>Awaiting STX connection</h3>
      </div>
    );
  return (
    
    <div className={'user-card'}>
      <h4>{'STX ID: Registered'}</h4>
    </div>
    
  );
};


