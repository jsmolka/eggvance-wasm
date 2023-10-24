<template>
  <div class="flex flex-col items-center gap-4 w-full max-w-screen-xl p-4">
    <canvas id="canvas" class="w-full aspect-[3/2] pointer-events-none select-none" />
    <input hidden ref="inputGba" type="file" accept=".gba" @change="eggvance.loadGba()" />
    <input hidden ref="inputSav" type="file" accept=".sav" @change="eggvance.loadSav()" />
    <div class="flex gap-4">
      <Button :disabled="disabled" @click="inputGba.click()">Load ROM</Button>
      <Button :disabled="disabled" @click="inputSav.click()">Load save</Button>
      <Button :disabled="disabled" @click="eggvance.loadDemo()">Load demo</Button>
      <Button @click="controls = !controls">
        {{ controls ? 'Hide controls' : 'Show controls' }}
      </Button>
    </div>
    <Controls v-show="controls" class="w-full max-w-screen-sm" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Button, Controls } from './components';

const inputGba = ref();
const inputSav = ref();
const controls = ref(false);
const disabled = ref(false);
const eggvance = computed(() => window.Module);

const readFile = async (input) => {
  disabled.value = true;
  try {
    return await new Promise((resolve) => {
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
      const response = await fetch('./celeste.gba');
      if (!response.ok) {
        return;
      }

      const data = new Uint8Array(await response.arrayBuffer());
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
