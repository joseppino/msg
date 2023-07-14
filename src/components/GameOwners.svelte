<script lang="ts">
  import { onMount } from "svelte";

  export let gameOwners: Object[] = [];

  onMount(() => {
    
  })
</script>

{#if !gameOwners}
  <p>Loading friends...</p>
{:else}
  <div class="friend-list">
    {#each gameOwners as friend}

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