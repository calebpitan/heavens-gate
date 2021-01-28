<template>
  <GatePresentation class="lg:clip-bottom-right" layerBgColor="bg-pink-900" :images="[gateImage, presentationImage]">
    <template v-slot:gate>
      <FormOverlay
        class="bg-white bg-gradient-to-t from-white via-transparent to-white bg-opacity-80 border-2 border-gray-100 rounded-md md:mx-7"
        name="signup"
        title="Sign in to your account"
        @submit.prevent="login"
      >
        <div class="flex flex-col space-y-7">
          <div class="">
            <InputLabel
              class="not-sr-only inline-block font-semibold mb-1"
              labelFor="uname"
              label="Username or Email"
            />
            <Input
              v-model="user.identifier.username"
              :class="!validation.identifier ? 'focus:ring-red-500' : ''"
              ref="identifierRef"
              type="text"
              placeholder="Username or Email"
              id="uname"
              autofocus
            />
          </div>

          <div class="">
            <InputLabel class="not-sr-only inline-block font-semibold mb-1" labelFor="pwd" label="Password" />
            <Input
              v-model="user.password"
              :class="!validation.password ? 'focus:ring-red-500' : ''"
              ref="passwordRef"
              type="password"
              placeholder="Password"
              id="pwd"
            />
          </div>

          <div class="lg:col-span-2">
            <Input
              type="submit"
              class="bg-black text-white font-semibold border-black shadow-2xl focus:ring-2 focus:ring-black hover:opacity-90 transition-all duration-150"
              :style="{ borderColor: `black` }"
              value="Sign In"
            />
            <div class="text-sm mt-4">
              Don't have an account? <router-link to="/signup" class="text-pink-700 font-semibold">Sign up</router-link>
            </div>
          </div>
        </div>
      </FormOverlay>
    </template>

    <template v-slot:presentation>
      <div class="absolute bottom-16 right-12 w-3/4 text-right text-lg space-y-4">
        <h1 class="text-7xl font-black text-white tracking-tight">Welcome back to Heaven's Gate</h1>
        <p class="text-gray-200">Sign in and gain access to a million tricks to building secure system applications</p>
      </div>
    </template>
  </GatePresentation>
</template>

<script lang="ts">
import { isEmail, validateOrReject, ValidationError } from 'class-validator';
import GatePresentation from '../components/GatePresentation.vue';
import FormOverlay from '../components/FormOverlay.vue';
import InputLabel from '../components/InputLabel.vue';
import Input from '../components/Input.vue';
import Checkbox from '../components/Checkbox.vue';
import { CredentialDto, Identifier } from '../services/auth/dto';
import { AuthActionType, LoginActionPayload } from '../store/auth/types';
import { copyIntoObject, resetValidation } from '../utils';
import imageSrc from '../assets/signin.image.jpg';

interface LoginData {
  user: CredentialDto;
  validation: { identifier: boolean; password: boolean };
  [x: string]: any;
}

const swapIdentifierIfIsEmail = (identifier: Identifier) => {
  if (isEmail(identifier.username)) {
    identifier.email = identifier.username;
    delete identifier.username;
  } else {
    delete identifier.email;
  }
};

export default {
  name: 'Login',
  components: { FormOverlay, Input, InputLabel, Checkbox, GatePresentation },
  data(): LoginData {
    const image = { backgroundImage: `url(${imageSrc})`, backgroundRepeat: `no-repeat` };
    const gateImage = { ...image, backgroundSize: `auto` };
    const presentationImage = { ...image, backgroundSize: `100% 100%` };
    const user = { identifier: { username: '', email: '' }, password: '' };
    const validation = { identifier: true, password: true };
    return { user, validation, gateImage, presentationImage };
  },

  methods: {
    async login(_evt: any) {
      const identifier = copyIntoObject(this.$data.user.identifier, Identifier);
      const user = copyIntoObject(this.$data.user, CredentialDto);
      user.identifier = identifier;
      swapIdentifierIfIsEmail(user.identifier);
      resetValidation(this.$data.validation);
      try {
        await validateOrReject(user);
        await this.$store.dispatch<LoginActionPayload>({ type: AuthActionType.LOGIN, payload: user });
        this.$router.push('/');
      } catch (e) {
        return this.handleValidationError(e);
      }
    },

    handleValidationError([e]: ValidationError[]) {
      type RefKey = `${typeof field}Ref`;
      const field = e.property as keyof LoginData['validation'];
      const refKey: RefKey = `${field}Ref` as RefKey;
      const parentRefs = this.$refs as any;
      const childRefs = parentRefs[refKey].$refs;
      this.$data.validation[field] = false;
      childRefs.input.focus();
    },
  },
};
</script>

<style lang="postcss" scoped>
.brightness-50 {
  filter: brightness(50%);
}
</style>
