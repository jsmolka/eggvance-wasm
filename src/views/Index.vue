<template>
  <Form class="items-center w-full max-w-screen-xl p-4">
    <canvas id="canvas" class="w-full aspect-[3/2] pointer-events-none select-none" />
    <div class="grid grid-cols-2 sm:flex sm:flex-row gap-4">
      <Button variant="secondary" :disabled="disabled" @click="loadRom">Load ROM</Button>
      <Button variant="secondary" :disabled="disabled" @click="loadSave">Load save</Button>
      <Button variant="secondary" :disabled="disabled" @click="loadDemo">Load demo</Button>
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="secondary">Show controls</Button>
        </DialogTrigger>
        <DialogContent class="w-full">
          <DialogHeader>
            <DialogTitle>Controls</DialogTitle>
            <DialogDescription v-show="false">Emulator controls</DialogDescription>
          </DialogHeader>
          <Controls />
          <DialogFooter>
            <DialogClose as-child>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </Form>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { colors } from '@/utils/colors';
import { readAsArrayBuffer, selectFile } from '@/utils/filesystem';
import Controls from '@/views/Controls.vue';
import _ from 'lodash';
import { computed, onMounted, ref } from 'vue';

const disabled = ref(false);
const eggvance = computed(() => window.Module);

const readAsByteArray = async (file) => {
  return new Uint8Array(await readAsArrayBuffer(file));
};

const write = (data, extension) => {
  const name = `${_.uniqueId()}.${extension}`;
  FS.writeFile(name, data);
  return name;
};

const loadRom = async () => {
  const file = await selectFile('gba');

  disabled.value = true;
  try {
    const data = await readAsByteArray(file);
    const name = write(data, 'gba');
    eggvance.value.eggvanceLoadGba(name);
  } finally {
    disabled.value = false;
  }
};

const loadSave = async () => {
  const file = await selectFile('sav');

  disabled.value = true;
  try {
    const data = await readAsByteArray(file);
    const name = write(data, 'sav');
    eggvance.value.eggvanceLoadSav(name);
  } finally {
    disabled.value = false;
  }
};

const loadDemo = async () => {
  disabled.value = true;
  try {
    const response = await fetch('/celeste.gba');
    if (!response.ok) {
      return;
    }

    const data = new Uint8Array(await response.arrayBuffer());
    const name = write(data, 'gba');
    eggvance.value.eggvanceLoadGba(name);
  } finally {
    disabled.value = false;
  }
};

onMounted(() => {
  window.Module = {
    canvas: document.getElementById('canvas'),

    onRuntimeInitialized() {
      this.eggvanceSetBackground(colors.shade8.int);
    },
  };

  const script = document.createElement('script');
  script.src = '/eggvance.js';
  document.body.appendChild(script);
});
</script>
