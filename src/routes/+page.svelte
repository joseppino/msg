<script lang="ts">
  import { fade } from 'svelte/transition';
  import ProfileCard from "../components/ProfileCard.svelte";
  import { getPlayerSummaries } from "../scripts/steamApiRequests";
  import toast from "svelte-french-toast";
  import GameList from '../components/GameList.svelte';

  let steamId: string = "";
  let profileDetails: any = null;
  let searched: boolean = false;
  
  function validateSteamId() {
    try {
      if((steamId.length === 17) && (typeof(parseInt(steamId)) === "number")) {
        return true;
      }
    } catch(e) {
      toast.error("Invalid Steam ID");
      return false;
    }
    toast.error("Invalid Steam ID");
    return false;
  }
  
</script>

<h1>Mutual Steam Games</h1>
<h3>Find games in common with your Steam friends</h3>
<div class="steamIdInfo">
  <label for="steamId">Steam ID:</label>
  <input id="steamId" type="text" placeholder="e.g. 76561197960435530" bind:value={steamId}>
  <button on:click={async() => {
      if(validateSteamId()) {
        const playerSummaries = await getPlayerSummaries([steamId]);
        if(playerSummaries[0].communityvisibilitystate === 3) {
          profileDetails = playerSummaries[0];
        } else {
          toast.error("Steam profile is not public");
        }
      }
    }}
  >Confirm</button>
</div>
{#if profileDetails}
  <div transition:fade>
    <ProfileCard profile={profileDetails} />
    <button on:click={() => searched = true}>Search by game</button>
    <button>Search by friend</button>
  </div>
{/if}
{#if searched}
  <div class="left-col col">
    <GameList {steamId}/>
  </div>
{/if}


<style>
  .col {
    width: 400px;
    height: 500px;
  }

  input {
    width: 150px;
  }

</style>
