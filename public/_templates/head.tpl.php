<head>

<?php 
$root = realpath($_SERVER["DOCUMENT_ROOT"]);

include_once("/$root/_system/functions.php"); 


?>

 <!-- Mobile Specific Metas
================================================= -->
 <meta name="HandheldFriendly" content="True">
 <meta name="MobileOptimized" content="320">
 <meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1.0">
 
 
 <!-- CSS - These are your main CSS files. All base styles can be found in the base.css and any additional styles 
 or overwrites should be used in the layout.css. We have now added support for SCSS. Using CodeKit or a similar preprocessor will help you write and rewrite the SCSS files.  
================================================= -->
 <link rel="stylesheet" href="<?php echo curPageURL();  ?>assets/stylesheets/bootstrap.css"> <!-- Compressed and compiled from base.scss -->
 
 
 <!-- Browser Specific CSS
================================================= -->

<!--[if IE]>
  <link href="<?php echo curPageURL();  ?>assets/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
<![endif]-->

<!-- Le HTML5 shim, for IE6-8 Support of HTML elements -->
<!--[if lt IE 9]>
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js">
  </script>
<![endif]-->

<!--[if lte IE 6]>
  <link rel="stylesheet" href="http://universal-ie6-css.googlecode.com/files/ie6.0.3.css" type="text/css" />
<![endif]-->
 
 
 <!-- Browser Specific Javascript
================================================= -->
 <script src="<?php echo curPageURL();  ?>assets/js/libs/modernizr.js"></script>

 <!--[if (lt IE 9) & (!IEMobile)]>
 <script src="<?php echo $root; ?>
/assets/js/libs/selectivizr-min.js"></script>
 <![endif]-->

<!-- Prevents links from opening in mobile Safari -->
 <!-- <script>(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(d.href.indexOf("http")||~d.href.indexOf(e.host))&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone")</script> -->

 <!-- Favicon and apple-touch-icon.png in the img folder. Include the ones you need.
 ================================================== -->
 <link rel="shortcut icon" href="<?php echo curPageURL();  ?>assets/img/startup/favicon.ico">
 
 <!-- Font Smoothing FF/Windows
 ================================================== -->
 <meta http-equiv="cleartype" content="on">

</head>