<script lang="ts">
  export let profile: any;
</script>

<div class="profile-card">
  <img src={profile.avatarmedium} alt="Profile Avatar">
  <h3>{profile.personaname}</h3>
</div>

<style>

  .profile-card {
    display: flex;
    flex-direction: row;
    border: 1px solid #c7d5e0;
    width: 300px;
  }

</style>