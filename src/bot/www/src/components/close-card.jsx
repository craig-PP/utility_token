import { useAccount } from '@micro-stacks/react';

export const CloseCard = () => {
  const { stxAddress } = useAccount();

  if (!stxAddress)
    return (
      <div className={'close-card'}>
        <h4> </h4>
      </div>
    );
  return (
    
    <div className={'close-card'}>
      <h4>Authorisation Complete - You may now close this window</h4>
    </div>
    
  );
};


