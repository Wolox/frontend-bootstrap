### Google Analytics
First add the following code snippet to the head of **index.pug**

```jade
script.
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', '<!-- @echo GOOGLE_ANALYTICS_TRACK_ID -->', {
    'cookieDomain': 'none'
  });
  ga('send', 'pageview');
```

Then, in order to monitor your page by google analytics set the GOOGLE_ANALYTICS_TRACK_ID with the tracking id in each secrets file in the `config` folder at the root of the project.
