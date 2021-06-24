<template>
  <footer class="footer">
    <!-- fork from https://github.com/lusaxweb/vuesax-next/blob/0976043042498b9337bd3fd611f777e1788f3ba7/packages/vuepress-theme-vuesax/components/Footer.vue-->
    <div class="footer__uls">
      <ul v-for="(link, index) in links" :key="index">
        <li class="title">
          {{ link.title }}
        </li>
        <li v-for="(item, i) in link.items" :key="i">
          <a :target="item.new ? '_blank' : ''" :href="item.link">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
    <span class="span-copy"> © 2021 RSS3Scan </span>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      links: [
        {
          title: "About RSS3",
          items: [
            {
              text: "RSS3.io",
              link: "https://rss3.io",
              new: true,
            },
            {
              text: "blog",
              link: "https://blog.rss3.io/",
              new: true,
            },
            {
              text: "Github (RSS3)",
              link: "https://github.com/NaturalSelectionLabs/RSS3",
              new: true,
            },
            {
              text: "Github (RSS3Scan)",
              link: "https://github.com/rss3Scan/rss3scan",
              new: true,
            },
          ],
        },
        {
          title: "Social Media",
          items: [
            {
              text: "Twitter",
              link: "https://twitter.com/rss3_",
              new: true,
            },
            {
              text: "Telegram",
              link: "https://github.com/NaturalSelectionLabs/RSS3",
              new: true,
            },
            {
              text: "Discord",
              link: "https://discord.com/invite/aGuwzF2hW4",
              new: true,
            },
            {
              text: "Reddit r/RSS3",
              link: "https://www.reddit.com/r/RSS3",
              new: true,
            },
          ],
        },
      ],
    };
  },
};
</script>
<style>
.footer {
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0 30px 0 0;
}

.footer .footer__uls {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.footer .span-copy {
  font-size: 0.8rem;
}

.footer ul {
  padding: 5px;
  list-style: none;
  margin: 5px 20px;
}

.footer ul .title {
  margin-bottom: 15px;
}

.footer ul li {
  font-size: 1.1rem;
  font-weight: 700;
  opacity: 0.8;
  margin: 5px 0;
}

.footer ul li a {
  font-size: 0.85rem;
  opacity: 0.5;
  transition: all 0.25s ease;
  font-weight: 400;
  padding: 5px;
  display: block;
}

.footer ul li a:hover {
  color: rgba(var(--vs-primary), 1) !important;
}

@media (max-width: 800px) {
  .footer .footer__uls {
    flex-wrap: wrap;
  }

  .footer ul {
    width: calc(50% - 20px);
  }
}

@media (max-width: 600px) {
  .footer {
    padding-bottom: 20px !important;
  }
}

@media (max-width: 500px) {
  .footer .subscribe-content,
  .footer p {
    padding: 40px 10px;
  }

  .footer .subscribe-content .con-form,
  .footer p .con-form {
    width: 100%;
  }

  .footer .subscribe-content .con-form input[type="email"],
  .footer p .con-form input[type="email"] {
    width: calc(100% - 50px) !important;
  }
}

@media (max-width: 400px) {
  .footer .subscribe-content {
    padding: 40px 20px;
  }

  .footer .subscribe-content #mc-embedded-subscribe-form,
  .footer .subscribe-content #mc_embed_signup_scroll {
    display: block;
    width: 100%;
  }

  .footer .subscribe-content .con-form input[type="email"] {
    width: 100% !important;
    margin-bottom: 10px !important;
  }

  .footer .subscribe-content input {
    width: 100% !important;
    margin-right: 0;
    margin-top: 10px;
    margin-left: 0 !important;
  }

  .footer ul {
    padding: 0 10px;
    width: calc(100% - 20px);
  }
}

.darken .con-mobile,
.darken svg.desktop {
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.17) !important;
}
</style>
