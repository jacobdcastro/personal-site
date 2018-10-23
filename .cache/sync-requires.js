// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-blog-post-js": preferDefault(require("C:\\Users\\jdcas\\jdcastro-web-dd\\personal-site\\src\\templates\\BlogPost.js")),
  "component---cache-dev-404-page-js": preferDefault(require("C:\\Users\\jdcas\\jdcastro-web-dd\\personal-site\\.cache\\dev-404-page.js")),
  "component---src-pages-about-js": preferDefault(require("C:\\Users\\jdcas\\jdcastro-web-dd\\personal-site\\src\\pages\\about.js")),
  "component---src-pages-blog-js": preferDefault(require("C:\\Users\\jdcas\\jdcastro-web-dd\\personal-site\\src\\pages\\blog.js")),
  "component---src-pages-contact-js": preferDefault(require("C:\\Users\\jdcas\\jdcastro-web-dd\\personal-site\\src\\pages\\contact.js")),
  "component---src-pages-index-js": preferDefault(require("C:\\Users\\jdcas\\jdcastro-web-dd\\personal-site\\src\\pages\\index.js"))
}

