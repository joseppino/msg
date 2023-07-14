<script lang="ts">
  import { onMount } from "svelte";

  export let friends: any[] = [];
  export let friendsWithGame: any[] = [];

</script>

{#if !friends && !friendsWithGame}
  <p>Loading friends...</p>
{:else}
  <div class="friend-list">
    {#each friendsWithGame as friend}
      
    {/each} 
    
  </div>
{/if}


<style>

  .friend-list {
    display: flex;
    flex-direction: column;
    height: inherit;
    align-items: center;
  }

</style>