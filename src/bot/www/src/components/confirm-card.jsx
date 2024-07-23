import { useAccount } from '@micro-stacks/react';
import queryString from 'query-string';

export const ConfirmCard = () => {
  const { stxAddress } = useAccount();
  const urlParams = queryString.parse(window.location.search);
  const discordId = urlParams.authid;

  if (!stxAddress)
    return (
      <div className={'confirm-card'}>
        <h4>Awaiting Discord Connection</h4>
      </div>
    );
  return (
    <div className={'confirm-card'}>
      <h4>{'Discord ID Registered'}</h4>
    </div>
  );
};
