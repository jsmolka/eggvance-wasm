<template>
  <TableWrapper>
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
  </TableWrapper>
</template>

<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableWrapper,
} from '@/components/ui/table';

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
