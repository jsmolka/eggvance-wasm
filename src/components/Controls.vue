<template>
  <table class="table">
    <thead>
      <tr>
        <th>Emulator</th>
        <th>Keyboard</th>
        <th>Controller</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Up</td>
        <td>W</td>
        <td>Up</td>
      </tr>
      <tr>
        <td>Down</td>
        <td>S</td>
        <td>Down</td>
      </tr>
      <tr>
        <td>Left</td>
        <td>A</td>
        <td>Left</td>
      </tr>
      <tr>
        <td>Right</td>
        <td>D</td>
        <td>Right</td>
      </tr>
      <tr>
        <td>A</td>
        <td>U</td>
        <td>B</td>
      </tr>
      <tr>
        <td>B</td>
        <td>H</td>
        <td>A</td>
      </tr>
      <tr>
        <td>Start</td>
        <td>G</td>
        <td>Start</td>
      </tr>
      <tr>
        <td>Select</td>
        <td>F</td>
        <td>Back</td>
      </tr>
      <tr>
        <td>L</td>
        <td>Q</td>
        <td>L</td>
      </tr>
      <tr>
        <td>R</td>
        <td>I</td>
        <td>R</td>
      </tr>
      <tr>
        <td>Reset</td>
        <td>R</td>
        <td>-</td>
      </tr>
      <tr>
        <td>Change refresh rate</td>
        <td>1 to 6</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
.table {
  @apply text-left;

  th {
    @apply text-gray-1;
    @apply font-bold;
  }

  th,
  td {
    @apply px-2.5;
    @apply py-1.5;
    @apply border;
    @apply border-gray-6;
  }
}
</style>
