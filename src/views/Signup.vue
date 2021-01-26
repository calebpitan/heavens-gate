<template>
  <div class="lg:grid grid-cols-5">
    <div class="self-center lg:col-span-3 lg:rounded-l-md bg-white lg:m-20 py-7 clip-bottom-right">
      <FormOverlay
        class="border-2 border-gray-100 rounded-md md:mx-7"
        method="post"
        name="signup"
        title="Create an account"
        :onSubmit="signup"
      >
        <div class="flex flex-col lg:grid grid-cols-2 lg:gap-3 space-y-4 lg:space-y-0">
          <div class="">
            <InputLabel labelFor="fname" label="First Name" />
            <Input v-model="user.firstname" type="text" placeholder="First Name" id="fname" />
          </div>

          <div class="">
            <InputLabel labelFor="lname" label="Last Name" />
            <Input v-model="user.lastname" type="text" placeholder="Last Name" id="lname" />
          </div>

          <div class="">
            <InputLabel labelFor="uname" label="Username" />
            <Input v-model="user.username" type="text" placeholder="Username" id="uname" />
          </div>

          <div class="">
            <InputLabel labelFor="pwd" label="Password" />
            <Input v-model="user.password" type="password" placeholder="Password" id="pwd" />
          </div>

          <div class="lg:col-span-2">
            <InputLabel labelFor="email" label="Email" />
            <Input v-model="user.email" type="email" placeholder="Email" id="email" />
          </div>

          <div class="lg:col-span-2 flex items-center">
            <Checkbox
              v-model="user.agreed"
              :checked="user.agreed"
              :aria-checked="user.agreed"
              class="text-black"
              id="tnc"
            />
            <InputLabel
              class="not-sr-only ml-4"
              labelFor="tnc"
              label="I agree to the terms of use and privacy policy"
            />
          </div>

          <div class="lg:col-span-2">
            <Input
              type="submit"
              class="bg-black text-white font-semibold border-black focus:ring-2 focus:ring-black hover:opacity-90 transition-all duration-150"
              :style="{ borderColor: `black` }"
              value="Sign up"
            />
          </div>
        </div>
      </FormOverlay>
    </div>
    <div class="relative hidden lg:block lg:col-span-2 h-screen pr-4 py-4 clip-top-left">
      <div
        class="h-full w-full border-t-8 border-b-8 border-r-8 border-black rounded-r-2xl bg-auto brightness-50"
        :style="{
          background: `url(${imageSrc})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `100% 100%`,
        }"
      ></div>
      <div class="absolute bottom-16 right-12 w-3/4 text-right text-lg space-y-4">
        <h1 class="text-7xl font-bold text-white">Welcome to Heaven's Gate</h1>
        <p class="text-gray-200">
          We are here to serve your authentication system's basic need! <br />
          Sign up to get started and gain access to the best authentication&mdash;and its brother,
          authorization&mdash;technology in the world
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FormOverlay from '../components/FormOverlay.vue';
import Input from '../components/Input.vue';
import InputLabel from '../components/InputLabel.vue';
import Checkbox from '../components/Checkbox.vue';
import { CreateUserDto } from '../services/auth/dto';
import { AuthActionType, SignupActionPayload } from '../store/auth/types';
import imageSrc from '../assets/signup.image.jpg';

interface SignupData {
  user: CreateUserDto & { agreed: boolean };
  [x: string]: any;
}

export default {
  name: 'Signup',
  components: { FormOverlay, Input, InputLabel, Checkbox },
  data(): SignupData {
    return {
      user: { username: '', firstname: '', lastname: '', email: '', password: '', agreed: false },
      imageSrc,
    };
  },
  methods: {
    async signup(_evt: any) {
      const user: CreateUserDto = this.$data.user;
      await this.$store.dispatch<SignupActionPayload>({ type: AuthActionType.SIGNUP, payload: user });
      this.$router.push('/');
    },
  },
};
</script>

<style lang="postcss" scoped>
.brightness-50 {
  filter: brightness(50%);
}
.clip-top-left {
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
}
.clip-bottom-right {
  clip-path: polygon(0 0, 100% 0, 93% 100%, 0 100%);
}
</style>
