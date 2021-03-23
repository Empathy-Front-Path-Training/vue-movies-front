<template>
  <div id="app">
    <header>
      <div id="nav">
        <div id="nav-title">
          <router-link to="/">MoVue</router-link>
          <img
            id="logo"
            alt="MoVue logo"
            src="../../assets/movue-transparent.png"
          />
        </div>
        <div id="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style src="./style.scss" lang="scss"></style>
