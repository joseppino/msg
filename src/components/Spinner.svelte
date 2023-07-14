<script lang="ts">
  import { Moon } from "svelte-loading-spinners";
  import { loading } from "../stores/loading";
</script>

<div class="spinner-wrapper">
  <div class="spinner">
    <Moon size="60" color="#c7d5e0" unit="px" />
    <p>{$loading.message}</p>
  </div>
</div>

<style>
  .spinner-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(146, 146, 146, 0.168);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .spinner {
    display: flex;
    flex-direction: column;
  }
</style>