<template>
  <GatePresentation layerBgColor="bg-green-900" :images="[gateImage, presentationImage]" class="lg:clip-bottom-right">
    <template v-slot:gate>
      <FormOverlay
        class="bg-white bg-gradient-to-t from-white via-transparent to-white bg-opacity-80 border-2 border-gray-100 rounded-md md:mx-7"
        method="post"
        name="signup"
        title="Create an account"
        @submit.prevent="signup"
      >
        <div class="flex flex-col lg:grid grid-cols-2 lg:gap-3 space-y-4 lg:space-y-0">
          <div class="">
            <InputLabel labelFor="fname" label="First Name" />
            <Input
              ref="firstnameRef"
              v-model="user.firstname"
              :class="!validation.firstname ? validationErrorClass : ''"
              type="text"
              placeholder="First Name"
              id="fname"
            />
          </div>

          <div class="">
            <InputLabel labelFor="lname" label="Last Name" />
            <Input
              ref="lastnameRef"
              v-model="user.lastname"
              :class="!validation.lastname ? validationErrorClass : ''"
              type="text"
              placeholder="Last Name"
              id="lname"
            />
          </div>

          <div class="">
            <InputLabel labelFor="uname" label="Username" />
            <Input
              ref="usernameRef"
              v-model="user.username"
              :class="!validation.username ? validationErrorClass : ''"
              type="text"
              placeholder="Username"
              id="uname"
            />
          </div>

          <div class="">
            <InputLabel labelFor="pwd" label="Password" />
            <Input
              ref="passwordRef"
              v-model="user.password"
              :class="!validation.password ? validationErrorClass : ''"
              type="password"
              placeholder="Password"
              id="pwd"
            />
          </div>

          <div class="lg:col-span-2">
            <InputLabel labelFor="email" label="Email" />
            <Input
              ref="emailRef"
              v-model="user.email"
              :class="!validation.email ? validationErrorClass : ''"
              type="email"
              placeholder="Email"
              id="email"
            />
          </div>

          <div class="lg:col-span-2 flex items-center">
            <Checkbox
              ref="agreedRef"
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
              class="bg-black text-white font-semibold border-black shadow-lg focus:ring-2 focus:ring-black hover:opacity-90 transition-all duration-150"
              :style="{ borderColor: `black` }"
              value="Sign up"
            />
            <div class="text-sm mt-4">
              Already have an account?
              <router-link to="/login" class="text-green-700 font-semibold">Sign in</router-link>
            </div>
          </div>
        </div>
      </FormOverlay>
    </template>

    <template v-slot:presentation>
      <div class="absolute bottom-16 right-12 w-3/4 text-right text-lg space-y-4">
        <h1 class="text-7xl font-black text-white tracking-tight">Welcome to Heaven's Gate</h1>
        <p class="text-gray-200">
          Sign up to get started and gain access to the best authentication&mdash;and its brother,
          authorization&mdash;technology in the world
        </p>
      </div>
    </template>
  </GatePresentation>
</template>

<script lang="ts">
import { validateOrReject, ValidationError } from 'class-validator';
import FormOverlay from '../components/FormOverlay.vue';
import GatePresentation from '../components/GatePresentation.vue';
import Input from '../components/Input.vue';
import InputLabel from '../components/InputLabel.vue';
import Checkbox from '../components/Checkbox.vue';
import { CreateUserDto } from '../services/auth/dto';
import { AuthActionType, SignupActionPayload } from '../store/auth/types';
import { copyIntoObject, resetValidation } from '../utils';
import imageSrc from '../assets/signup.image.jpg';

interface SignupData {
  user: CreateUserDto & { agreed: boolean };
  validation: {
    username: boolean;
    firstname: boolean;
    lastname: boolean;
    email: boolean;
    password: boolean;
    agreed: boolean;
  };
  [x: string]: any;
}

export default {
  name: 'Signup',
  components: { FormOverlay, Input, InputLabel, Checkbox, GatePresentation },
  data(): SignupData {
    const image = { backgroundImage: `url(${imageSrc})`, backgroundRepeat: `no-repeat` };
    const gateImage = { ...image, backgroundSize: `auto` };
    const presentationImage = { ...image, backgroundSize: `100% 100%` };
    const user = { username: '', firstname: '', lastname: '', email: '', password: '', agreed: false };
    const validation = { username: true, firstname: true, lastname: true, email: true, password: true, agreed: true };
    const validationErrorClass = 'focus:ring-red-500';
    return { gateImage, presentationImage, user, validation, validationErrorClass };
  },

  methods: {
    async signup(_evt: any) {
      const user = copyIntoObject(this.$data.user, CreateUserDto);
      resetValidation(this.$data.validation);
      try {
        await validateOrReject(user);
        const parentRefs = this.$refs as any;
        this.$data.validation.agreed = this.$data.user.agreed;
        if (!this.$data.validation.agreed) return parentRefs.agreedRef.$refs.input.focus();
        await this.$store.dispatch<SignupActionPayload>({ type: AuthActionType.SIGNUP, payload: user });
        this.$router.push('/');
      } catch (e) {
        return this.handleValidationError(e);
      }
    },

    handleValidationError([e]: ValidationError[]) {
      type RefKey = `${typeof field}Ref`;
      const field = e.property as keyof SignupData['validation'];
      const refKey: RefKey = `${field}Ref` as RefKey;
      const parentRefs = this.$refs as any;
      const childRefs = parentRefs[refKey].$refs;
      this.$data.validation[field] = false;
      childRefs.input.focus();
    },
  },
};
</script>
