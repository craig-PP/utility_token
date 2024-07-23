import { useState } from 'react';
import guestLogo from './assets/favicon.png';
import './App.css';
import * as MicroStacks from '@micro-stacks/react';
import { WalletConnectButton } from './components/wallet-connect-button.jsx';
import { UserCard } from './components/user-card.jsx';
import { ConfirmCard } from './components/confirm-card.jsx';
import { CloseCard } from './components/close-card.jsx';
import { DiscordCard } from './components/discord-card.jsx';
import queryString from 'query-string';

function Contents() {
  const urlParams = queryString.parse(window.location.search);
  return (
    <>
      <div class="logo"></div>

      <h1>STX Auth</h1>

      <div class="card">
        <DiscordCard />
        <UserCard />
        <ConfirmCard />
        <CloseCard />
        <WalletConnectButton />
        <p
          style={{
            display: 'block',
            marginTop: '40px',
          }}
        ></p>
      </div>
    </>
  );
}

export default function App() {
  return (
    <MicroStacks.ClientProvider
      appName={'STX Auth'}
      appIconUrl={guestLogo}
    >
      <Contents />
    </MicroStacks.ClientProvider>
  );
}
