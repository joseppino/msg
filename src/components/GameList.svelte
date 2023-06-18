<script lang="ts">
  import { onMount } from "svelte";
  import { getOwnedGames } from "../scripts/steamApiRequests";

  export let steamId: string;
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
</script>

{#if !ownedGames}
  <p>Loading games...</p>
{:else} 
  <div class="game-list">
    {#each loadedGames as game}
      <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_sm_120.jpg`} alt={`Image for appid ${game.appid}`}>
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
    height: 460px;
    width: 300px;
    overflow-y: scroll;
  }

  .game-list img {
    width: 120px;
  }

</style>