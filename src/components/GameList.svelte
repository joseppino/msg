<script lang="ts">
  import { onMount } from "svelte";
  import { checkGameOwnership, getFriendsList, getOwnedGames } from "../lib/steamApiRequests";
  import toast from "svelte-french-toast";
  import { loading } from "../stores/loading";

  export let steamId: string;
  export let selectedGame: number = NaN;
  export let gameOwners: Object[] = [];
  let ownedGames: any[];
  let loadedGames: any[];
  $: if(ownedGames) { loadedGames = ownedGames.slice(0, bufferSize) };
  let bufferSize: number = 50;
  let unloadedGames: number = 0;

  onMount(() => {
    getOwnedGames(steamId)
      .then(res => {
        ownedGames = res.sort(comparePlaytimes).reverse();
        if(ownedGames.length < 50) {
          bufferSize = ownedGames.length;
        } else {
          unloadedGames = ownedGames.length - bufferSize;
        }
        
      })
      .catch(() => {
        toast.error("Could not access list of games for this profile");
      });
  });

  function comparePlaytimes(a: any, b: any) {
    if ( a.playtime_forever < b.playtime_forever ){
      return -1;
    }
    if ( a.playtime_forever > b.playtime_forever ){
      return 1;
    }
    return 0;
  }

  async function handleGameClick(game: any) {
    $loading.state = true;
    const steamFriends = await getFriendsList(steamId);
    const friendsWithGame = await checkGameOwnership(steamFriends, game.appid.toString());
    console.log(friendsWithGame);
    $loading.state = false;
  }
</script>

{#if !ownedGames}
  <p>Loading games...</p>
{:else} 
  <div class="game-list">
    {#each loadedGames as game}
      <img src={`https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
           alt={`Image for appid ${game.appid}`}
           on:click={() => handleGameClick(game)}
           on:keyup={() => selectedGame = game.appid}>
    {/each} 
    {#if unloadedGames > 0}
      <button on:click={() => { 
        if(bufferSize + 50 > ownedGames.length) {
          bufferSize += unloadedGames;
          unloadedGames = 0;
        } else {
          bufferSize += 50;
          unloadedGames -= 50;
        }
      }}
      >Load more games</button>
    {/if}
  </div>
{/if}


<style>

  .game-list {
    display: flex;
    flex-direction: column;
    height: inherit;
    align-items: center;
  }

  .game-list img {
    width: 140px;
  }

  .game-list img:hover {
    opacity: 75%;
    cursor: pointer;
  }

</style>