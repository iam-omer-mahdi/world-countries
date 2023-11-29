<template>
  <nav class="bg-base-100 py-2">
    <div class="navbar container mx-auto px-4">
      <div class="flex-1">
        <RouterLink to="/" title="logo" class="font-bold text-xl md:text-3xl flex items-center gap-2">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M200,96a72,72,0,1,1-72-72A72,72,0,0,1,200,96Z" opacity="0.2"/><path d="M128,176A80,80,0,1,0,48,96,80.09,80.09,0,0,0,128,176Zm0-144A64,64,0,1,1,64,96,64.07,64.07,0,0,1,128,32Zm77.77,133.5a8,8,0,0,1-.23,11.32A111.21,111.21,0,0,1,136,207.72V224h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V207.71A112,112,0,0,1,47.18,18.46,8,8,0,1,1,58.72,29.54,96,96,0,0,0,194.46,165.28,8,8,0,0,1,205.77,165.5Z"/></svg>
          World Countries
        </RouterLink>
      </div>
      <!-- Theme Switch -->
      <div class="flex items-center gap-6">
        <div class="flex flex-col hover:bg-transparent">
          <!-- sun icon -->
          <button title="theme switch" class="btn btn-block bg-base-300" @click="setTheme()" v-if="isDark">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M122,40V16a6,6,0,0,1,12,0V40a6,6,0,0,1-12,0Zm68,88a62,62,0,1,1-62-62A62.07,62.07,0,0,1,190,128Zm-12,0a50,50,0,1,0-50,50A50.06,50.06,0,0,0,178,128ZM59.76,68.24a6,6,0,1,0,8.48-8.48l-16-16a6,6,0,0,0-8.48,8.48Zm0,119.52-16,16a6,6,0,1,0,8.48,8.48l16-16a6,6,0,1,0-8.48-8.48ZM192,70a6,6,0,0,0,4.24-1.76l16-16a6,6,0,0,0-8.48-8.48l-16,16A6,6,0,0,0,192,70Zm4.24,117.76a6,6,0,0,0-8.48,8.48l16,16a6,6,0,0,0,8.48-8.48ZM46,128a6,6,0,0,0-6-6H16a6,6,0,0,0,0,12H40A6,6,0,0,0,46,128Zm82,82a6,6,0,0,0-6,6v24a6,6,0,0,0,12,0V216A6,6,0,0,0,128,210Zm112-88H216a6,6,0,0,0,0,12h24a6,6,0,0,0,0-12Z"/></svg>
          </button>

          <!-- moon icon -->
          <button title="theme switch" class="btn btn-block" @click="setTheme()" v-if="!isDark">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M232.13,143.64a6,6,0,0,0-6-1.49A90.07,90.07,0,0,1,113.86,29.85a6,6,0,0,0-7.49-7.48A102.88,102.88,0,0,0,54.48,58.68,102,102,0,0,0,197.32,201.52a102.88,102.88,0,0,0,36.31-51.89A6,6,0,0,0,232.13,143.64Zm-42,48.29a90,90,0,0,1-126-126A90.9,90.9,0,0,1,99.65,37.66,102.06,102.06,0,0,0,218.34,156.35,90.9,90.9,0,0,1,190.1,191.93Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isDark: true,
    };
  },
  methods: {
    checkLocalStorageTheme() {
      if (JSON.parse(localStorage.getItem("isDark")) === true || JSON.parse(localStorage.getItem("isDark")) === null) {
        this.isDark = true;
        localStorage.setItem("isDark", true);
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        this.isDark = false;
        localStorage.setItem("isDark", false);
        document.documentElement.setAttribute("data-theme", "light");
      }
    },
    setTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem("isDark", this.isDark);
      document.documentElement.setAttribute("data-theme", this.isDark ? 'dark' : 'light');
    },
  },
  created() {
    this.checkLocalStorageTheme();
  },
};
</script>
