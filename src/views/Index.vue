<template>
  <div class="flex flex-col items-center w-full max-w-screen-xl gap-4 p-4">
    <canvas id="canvas" class="w-full aspect-[3/2] pointer-events-none select-none" />
    <div class="grid grid-cols-2 sm:flex sm:flex-row gap-4">
      <Button variant="secondary" @click="loadRom">Load ROM</Button>
      <Button variant="secondary" @click="loadSave">Load save</Button>
      <Button variant="secondary" @click="loadDemo">Load demo</Button>
      <Dialog v-slot="{ close }">
        <DialogTrigger as-child>
          <Button variant="secondary">Show controls</Button>
        </DialogTrigger>
        <DialogContent class="w-full">
          <DialogHeader>
            <DialogTitle>Controls</DialogTitle>
            <DialogDescription v-show="false">Emulator controls</DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emulator</TableHead>
                <TableHead>Keyboard</TableHead>
                <TableHead>Controller</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="{ emulator, keyboard, controller } in controls">
                <TableCell>{{ emulator }}</TableCell>
                <TableCell>{{ keyboard }}</TableCell>
                <TableCell>{{ controller }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <DialogFooter>
            <Button variant="secondary" @click="close">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { readAsArrayBuffer, selectFile } from '@/utils/filesystem';
import _ from 'lodash';
import { computed, onMounted } from 'vue';

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
  const data = await readAsByteArray(file);
  const name = write(data, 'gba');
  eggvance.value.eggvanceLoadGba(name);
};

const loadSave = async () => {
  const file = await selectFile('sav');
  const data = await readAsByteArray(file);
  const name = write(data, 'sav');
  eggvance.value.eggvanceLoadSav(name);
};

const loadDemo = async () => {
  const response = await fetch('/celeste.gba');
  if (!response.ok) {
    return;
  }

  const data = new Uint8Array(await response.arrayBuffer());
  const name = write(data, 'gba');
  eggvance.value.eggvanceLoadGba(name);
};

onMounted(() => {
  window.Module = {
    canvas: document.getElementById('canvas'),

    onRuntimeInitialized() {
      this.eggvanceSetBackground(0x242933);
    },
  };

  const script = document.createElement('script');
  script.src = '/eggvance.js';
  document.body.appendChild(script);
});

const controls = [
  { emulator: 'Up', keyboard: 'W', controller: 'Up' },
  { emulator: 'Down', keyboard: 'S', controller: 'Down' },
  { emulator: 'Left', keyboard: 'A', controller: 'Left' },
  { emulator: 'Right', keyboard: 'D', controller: 'Right' },
  { emulator: 'A', keyboard: 'U', controller: 'B' },
  { emulator: 'B', keyboard: 'H', controller: 'A' },
  { emulator: 'Start', keyboard: 'G', controller: 'Start' },
  { emulator: 'Select', keyboard: 'F', controller: 'Back' },
  { emulator: 'L', keyboard: 'Q', controller: 'L' },
  { emulator: 'R', keyboard: 'I', controller: 'R' },
  { emulator: 'Reset', keyboard: 'R', controller: '-' },
  { emulator: 'Change refresh rate', keyboard: '1 to 6', controller: '-' },
];
</script>
