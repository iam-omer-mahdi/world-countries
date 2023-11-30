<template>
    <div v-if="props.type == 'country'" class="container mx-auto px-2 grid gap-4 py-8">
      <div class="flex">
        <div class="skeleton rounded-none w-full md:w-1/3 h-52 md:h-96"></div>
        <div class="skeleton rounded-none w-1/3 h-96 hidden md:flex"></div>
        <div class="skeleton rounded-none w-1/3 h-96 hidden md:flex"></div>
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="skeleton rounded-none w-full h-24 md:w-52 md:h-64"></div>
        <div class="space-y-3 w-full">
          <div class="skeleton rounded-none w-full h-6 md:h-8"></div>
          <div class="skeleton rounded-none w-full h-6 md:h-8"></div>
          <div class="skeleton rounded-none w-full h-6 md:h-8"></div>
          <div class="skeleton rounded-none w-full h-6 md:h-8"></div>
          <div class="skeleton rounded-none w-full h-6 md:h-8"></div>
          <div class="skeleton rounded-none w-full h-6 md:h-8"></div>
        </div>
      </div>
    </div>

    <section v-if="props.type == 'grid'" class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <!-- Box -->
        <template v-for="i in 9">
            <div class="flex flex-col gap-4">
                <div class="skeleton rounded-none h-32 w-full"></div>
                <div class="skeleton rounded-none h-4 w-28"></div>
                <div class="skeleton rounded-none h-4 w-full"></div>
                <div class="skeleton rounded-none h-4 w-full"></div>
            </div>
        </template>
    </section>
</template>


<script setup>
    const props = defineProps(['type'])
</script>