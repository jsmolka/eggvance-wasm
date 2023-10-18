<template>
  <div class="flex justify-center items-center min-h-screen p-4">
    <div class="flex flex-col items-center gap-4 w-full max-w-screen-xl">
      <canvas id="canvas" class="w-full aspect-[3/2] pointer-events-none select-none" />
      <input hidden ref="inputGba" type="file" accept=".gba" @change="eggvance.loadGba()" />
      <input hidden ref="inputSav" type="file" accept=".sav" @change="eggvance.loadSav()" />
      <div class="flex gap-4">
        <button class="button" :class="{ disabled }" @click="inputGba.click()">Load ROM</button>
        <button class="button" :class="{ disabled }" @click="inputSav.click()">Load save</button>
        <button class="button" :class="{ disabled }" @click="eggvance.loadDemo()">Load demo</button>
        <button class="button" @click="controls = !controls">
          {{ controls ? 'Hide controls' : 'Show controls' }}
        </button>
      </div>
      <Controls v-show="controls" class="w-full max-w-screen-sm" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import Controls from './components/Controls.vue';

const inputGba = ref();
const inputSav = ref();
const controls = ref(false);
const disabled = ref(false);
const eggvance = computed(() => window.Module);

const readFile = async (input) => {
  disabled.value = true;
  try {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.readAsArrayBuffer(input.files[0]);
      input.value = '';
    });
  } finally {
    disabled.value = false;
  }
};

let fileId = 0;

const writeFile = (data, ext) => {
  const name = `${fileId++}.${ext}`;
  FS.writeFile(name, data);
  return name;
};

window.Module = {
  onRuntimeInitialized() {
    this.eggvanceSetBackground(0x242933);
  },

  async loadGba() {
    const data = await readFile(inputGba.value);
    const name = writeFile(data, 'gba');
    this.eggvanceLoadGba(name);
  },

  async loadSav() {
    const data = await readFile(inputSav.value);
    const name = writeFile(data, 'sav');
    this.eggvanceLoadSav(name);
  },

  async loadDemo() {
    disabled.value = true;
    try {
      const data = await new Promise((resolve) => {
        const request = new XMLHttpRequest();
        request.open('GET', '/celeste.gba');
        request.responseType = 'arraybuffer';
        request.onload = () => resolve(new Uint8Array(request.response));
        request.send();
      });

      const name = writeFile(data, 'gba');
      this.eggvanceLoadGba(name);
    } finally {
      disabled.value = false;
    }
  },
};

onMounted(() => {
  window.Module.canvas = document.getElementById('canvas');

  const script = document.createElement('script');
  script.src = '/eggvance.js';
  document.body.appendChild(script);
});
</script>

<style lang="scss" scoped>
.button {
  @apply px-2;
  @apply py-1;
  @apply bg-gray-4;
  @apply text-gray-2;
  @apply font-medium;
  @apply select-none;

  &:hover {
    @apply brightness-110;
  }
}
</style>
