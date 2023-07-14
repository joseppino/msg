<script lang="ts">
  import { fade } from 'svelte/transition';
  import ProfileCard from "../components/ProfileCard.svelte";
  import { getPlayerSummaries } from '../lib/steamApiRequests';
  import toast from "svelte-french-toast";
  import GameList from '../components/GameList.svelte';
  import Spinner from '../components/Spinner.svelte';
  import { loading } from '../stores/loading';
  import FriendList from '../components/FriendList.svelte';

  let steamId: string = "";
  let profileDetails: any = null;
  let gameOwners: Object[] = [];
  let searchByGame: boolean = false;
  let searchByFriend: boolean = false;
  let selectedGame: number = NaN;
  
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

{#if $loading.state}
  <Spinner />
{/if}
<h2>Mutual Steam Games</h2>
<h4>Find games in common with your Steam friends</h4>
<div class="steamIdInfo">
  <label for="steamId">Steam ID:</label>
  <input id="steamId" type="text" placeholder="e.g. 76561197960435530" bind:value={steamId}>
  <button on:click={async() => {
      if(validateSteamId()) {
        const playerSummaries = await getPlayerSummaries([steamId])
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
  <div class="profile-details" transition:fade>
    <ProfileCard profile={profileDetails} />
  </div>
    <button on:click={() => {
        searchByFriend = false;
        searchByGame = true;
      }}
      >Search by game</button>
    <button on:click={() => {
      searchByGame = false;
      searchByFriend = true;
    }}
      >Search by friend</button>
{/if}
<div class="cols">
  {#if searchByGame}
    <div class="left-col col">
      <GameList {steamId} bind:selectedGame={selectedGame} bind:gameOwners={gameOwners}/>
    </div>
    <div class="right-col col">
      {#if gameOwners.length > 0}
        <FriendList friendsWithGame={gameOwners} />
      {/if}
    </div>
  {:else if searchByFriend}
    
  {/if}
</div>


<style>
  .profile-details {
    display: flex;
    justify-content: center;
  }

  .cols {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .col {
    width: 140px;
    height: 325px;
    overflow-y: scroll;
    border: 1px solid #c7d5e0;
    margin: 10px;
  }

  input {
    width: 150px;
  }

</style>
