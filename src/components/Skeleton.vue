<template>
    <section class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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