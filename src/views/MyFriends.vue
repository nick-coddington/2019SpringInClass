<template>
<div>
    <h1 v-if="Globals.user">{{Globals.user.name}} Friends Page</h1>
    <ul>
        <li v-for="friend in friends" :key="friend.id">{{friend.FirstName}} </li>
        <li>Friend 2</li>
        <li>Friend 3</li>
        <li>Friend 4</li>
        <li>Friend 5</li>
    </ul>
</div>
</template>

<script>
import { Globals } from '@/models/api';
import { GetFriends } from "../models/users.js";

export default {
    data: () => ({
        Globals: Globals,
        friends: []
    }),
    async mounted() {
        this.friends = await GetFriends();
    }
}
</script>

<style>

</style>
