<template>
  <div id="app" :class="theme">
    <div id="nav">
      <router-link to="/" class="brand" tag="a"
        ><i class="fa fa-globe"></i> World Countries</router-link
      >
      <div>
        <button v-if="theme === ''" @click="theme = 'dark'">
          <i class="fa fa-moon"></i> Dark Mode
        </button>
        <button v-if="theme === 'dark'" @click="theme = ''">
          <i class="fa fa-sun"></i> Light Mode
        </button>
      </div>
    </div>

    <main>
      <router-view />
    </main>

    <footer>
      <p>Copy Rights All Rights Reserved 2021</p>
      <p>Made With <i class="fa fa-heart"></i> By Omer Mahdi</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "",
    };
  },
};
</script>

<style lang="css">
/* Color theme */
:root {
  --dark: #212121;
  --light-dark: #333;
  --light: #f2f2f2;
  --lighter: #fff;
  --shadow: 0 3px 5px -2px rgba(0, 0, 0, 0.3);
  --radius: 0.2rem;
}
/* global resets */
html {
  scroll-behavior: smooth;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: var(--dark);
}

li {
  list-style: none;
}

button {
  background: var(--lighter);
  padding: 0.75rem 1rem;
  border: none;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  cursor: pointer;
}

i {
  margin: 0 0.2rem;
}

.container {
  max-width: 90%;
  margin: 0 auto;
}
/* Main Style */
#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background: var(--light);
  color: var(--dark);
}

#app.dark {
  background: var(--dark);
  color: var(--lighter);
}

#nav {
  padding: 0.5rem 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow);
  background: var(--lighter);
}

.brand {
  font-weight: bold;
}

.dark #nav {
  background: var(--light-dark);
}

.dark #nav a {
  color: var(--lighter);
}

.dark button {
  background: var(--dark);
  color: var(--lighter);
}

footer {
  background: var(--lighter);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  box-shadow: inset var(--shadow);
}

.dark footer {
  background: var(--light-dark);
}
</style>
