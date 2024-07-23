import queryString from "query-string";
const urlParams = queryString.parse(window.location.search);


export const DiscordCard = () => {

    return (
      <div className={'discord-card'} >
      <img src={urlParams.avatar} width={75} height={75}/>
      <h2>{urlParams.username}</h2>
      </div>
    
  );
};


