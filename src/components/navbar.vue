<template>
  <div>
    <nav>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <a :href="item.link">
            <span v-if="item.text">{{ item.text }}</span>
            <img v-if="item.image" :src="item.image" alt="Logo" width="50px">
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>
export default {
  data() {
    return {
      items: [
        { text: 'Home', link: '/' },
        { text: 'About', link: '/about' },
        { image: '/src/components/icons/logo.png', link: '/' }, // Separate image and link
        { text: 'Services', link: '/services' },
        { text: 'Contact', link: '/contact' }
      ]
    };
  }
};
</script>

<style scoped>
nav {
  padding: 10px;
  display: flex;
  align-items: center;
  place-content: center;
}

ul {
  font-size: 20px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  column-gap: 5rem;
  align-items: center;
}

li {
  display: inline;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
