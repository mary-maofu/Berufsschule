<template>
  <footerArea class="w-100">
    <p>&copy; 2024 BS Projekt.</p>
    <ul>
      <li v-for="(item, index) in links" :key="index">
        <a :href="item.link">{{ item.text }}</a>
      </li>
    </ul>
  </footerArea>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { text: 'Privacy Policy', link: '/privacy-policy' },
        { text: 'Terms of Service', link: '/terms-of-service' },
        { text: 'Contact Us', link: '/contact-us' }
      ]
    };
  }
};
</script>

<style scoped>
footerarea {
  height: 4.5rem;
  bottom: 0;
  color: #aea8a8;
  padding: 20px;
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline;
  margin-right: 20px;
}

a {
  color: #aea8a8;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
