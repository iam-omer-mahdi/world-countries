<template>
    <section class="container mx-auto px-2 min-h-screen py-10">
        <div class="mockup-browser border bg-base-300">
            <div class="mockup-browser-toolbar">
                <div class="input"></div>
            </div>
            <div class="text-xl flex flex-col items-center justify-center px-4 py-16 bg-base-200 h-96">
                <span class="text-5xl mb-4">Error 404</span>
                <p class="text-center">The page you are looking for is not found, go back <RouterLink to="/" class="px-1 hover:underline text-primary">home</RouterLink></p>
            </div>
        </div>
    </section>
</template>