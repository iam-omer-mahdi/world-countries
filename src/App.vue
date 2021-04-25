<template>
  <div id="app" :class="theme">
    <div id="nav">
      <router-link to="/" class="brand" tag="a"
        ><i class="fa fa-globe"></i> World Countries</router-link
      >
      <div>
        <button v-if="theme === ''" @click="setTheme('dark')">
          <i class="fa fa-moon"></i> Dark Mode
        </button>
        <button v-if="theme === 'dark'" @click="setTheme('light')">
          <i class="fa fa-sun"></i> Light Mode
        </button>
      </div>
    </div>

    <main>
      <router-view
        :theme="theme"
        :key="`/country/` + ($route.params.code || '')"
      />
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
  methods: {
    checkTheme() {
      const theme = localStorage.getItem("theme");
      if (theme !== null && theme === "dark") {
        this.theme = theme;
      } else if (theme === "light") {
        this.theme = "";
      }
    },
    setTheme(variant) {
      localStorage.setItem("theme", variant);
      if (variant === "dark") {
        this.theme = "dark";
      } else {
        this.theme = "";
      }
    },
  },
  created() {
    this.checkTheme();
  },
};
</script>

<style lang="scss">
/* Color theme */
:root {
  --dark: #212e37;
  --light-dark: #2b3743;
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
  width: 90%;
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
  line-height: 1.4;
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background: var(--light);
  }

  #nav {
    padding: 0.5rem 4rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow);
    background: var(--lighter);
    .brand {
      font-weight: bold;
    }
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
}

#app.dark {
  background: var(--dark);
  color: var(--lighter);
  .overlay {
    background: var(--dark);
  }
  #nav {
    background: var(--light-dark);
    a {
      color: var(--lighter);
    }
  }
  button {
    background: var(--light-dark);
    color: var(--lighter);
  }
  footer {
    background: var(--light-dark);
  }
}

@media screen and (max-width: 575px) {
  #app #nav {
    padding: 0.5rem 0.75rem;
    button {
      padding: 0.5rem 0.75rem !important;
    }
  }
}
</style>
