<template>
<div class="row">
    <div class="col-lg-6">
        <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link active" href="">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Single Sign in </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <div class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input type="text" v-model="data.firstName"
                    class="form-control" name="firstName" id="firstName" aria-describedby="helpFirstName" placeholder="First Name">
                  <small id="helpFirstName" class="form-text text-muted">If you have a middle you can add it here.</small>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input type="text" v-model="data.lastName"
                    class="form-control" name="lastName" id="lastName" aria-describedby="helpLastName" placeholder="Last Name">
                  <small id="helpLastName" class="form-text text-muted">Sir Name</small>
                </div>
                <div class="form-group">
                  <label for="Password">Password</label>
                  <input type="password" class="form-control" v-model="data.Password" name="Password" id="Password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="Birthdaay">Birthday</label>
                  <input type="date" v-model="data.Birthday"
                    class="form-control" name="Birthdaay" id="Birthday" aria-describedby="helpBirthday" placeholder="Your Birthday">
                  <small id="helpBirthday" class="form-text text-muted">Please include the year</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </div>
    </div>
    <div class="col-lg-6">
      <div class="card border-sucess" v-if="newUser">
        <div class="card-body">
          <h4 class="card-title"> Congrats! You've Registered!</h4>
          <p class="card-text">
            {{newUser.firstName}} {{newUser.lastName}}
          </p>
        </div>
      </div>
    </div>
</div>
    
</template>

<script>
import { Register } from "@/models/users";
import { Globals } from "@/models/api";
import toastr from 'toastr';
import 'toastr/build/toastr.css'

export default {
    data: () => ({
        data: {},
        newUser: null
    }),
    methods:{
        async submit() {
           try {
             const m = await Register(this.data);
             this.newUser = m;
             toastr.success("You've registered successfully!")         
           } catch (error) {
             Globals.errors.push(error);
             toastr.error(error.msg);             
           }
        }
    }
}
</script>

<style>

</style>
