import { useAuth } from '@micro-stacks/react';

export const WalletConnectButton = () => {
  const { openAuthRequest, isRequestPending, signOut, isSignedIn } = useAuth();
  const label = isRequestPending ? 'Loading...' : isSignedIn ? 'Sign out' : 'Click to Connect STX and Discord';
  return (
    <button
      onClick={() => {
        if (isSignedIn) void signOut();
        else void openAuthRequest({onFinish: (values) => {
          console.log(values);
          const urlParams = new URLSearchParams(window.location.search);
      
          // POST request using fetch with set headers
          const requestOptions = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ authId: urlParams.get('authid'), stx: values.addresses.mainnet })
          };
          fetch(window.location.origin, requestOptions).then(finished => {
            window.location.href = window.location.search + 'success.html';
          });
        }});
      }}
    >
      {label}
    </button>
  );
};
