<?php $shortEnv = TRUE ; ?><?php 

function environment() {
	
	// get the value of the server uri
	$uri = $_SERVER['REQUEST_URI'];

	if (strpos($uri, 'phppreview') !== false) {
		$environment = 'cms';
	} else {
		$environment = 'live';
	}

	return $environment;
}

// get site URL for reSRC.it calls
function siteURL() {
	$siteURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {$siteURL .= "s";}
		$siteURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$siteURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"];
	} else {
		$siteURL .= $_SERVER["SERVER_NAME"];
	}
	return $siteURL;
}

?><?php
    // Block class
// check whether class exists
if(class_exists('Block') != true) 
{
/**
 * 2, 3, 4 up Block class for building block object from an array
 */
class Block {
  // Block layout, content or featured
  // Block template, 2up, 3up or 4up
  public $template; // 2up, 3up or 4up
  public $component; //  content or fullwidth
  public $heading; // main block heading
  public $array; // blocks content array


  /**
   * [__construct description]
   *
   * @param array   $array     [array of content]
   * @param string  $template  [set whether it is a 2up, 3up or 4uip]
   * @param string  $component [set whether it is fullwidth or content width]
   * @param string  $heading   [set component heading]
   */
  public function __construct( array $array = array(), $template = "default", $component = "default", $heading = "default" ) {
    $this->array = $array;
    $this->template = $template;
    $this->component = $component;
    $this->heading = $heading;
  }

  /**
   * [__destruct destroy array after completion]
   */
  public function __destruct() {
    unset( $this->array );
  }

  /**
   * [environment check whether on local or live site]
   * @return [string] [server environment]
   */
  public function environment() {
    // get the value of the server uri
    $uri = $_SERVER['REQUEST_URI'];

    if (strpos($uri, 'phppreview') !== false) {
      $environment = 'cms';
    } else {
      $environment = 'live';
    }

    return $environment;
  }

  public function component() {

    switch ($this->component) {
        case "feature":
            $b = "l-content-full-width";
            break;
        case "content":
            $b = "l-content";
            break;
        default:
           $b = "default";
    }
    return $b;
  }

  /**
   * [set_component_start output opening div]
   */
  public function set_component_start() {
    
    if  ( $this->template == "four-up" ) {
      $compenent_four_up = "</div>";
    }

    $component_start = "<div class=\"row\">";
    $component_start .= "<div class=\"" . $this->component() . " block  __media  " .  $this->template  . "\">";
    
    if ( $t == "four-up" ) {
      echo $compenent_four_up;
    }
      echo $component_start;
  }

  /**
   * [set_component_end output closing divs and check whether it is a four-up]
   */
  public function set_component_end() {

    if ( $this->template == "four-up" ) {
      $compenent_four_up_end = "<div class=\"row\">";
      $compenent_four_up_end .= "<div role=\"main\" class=\"content\">";
    }

    $component_end = "</div> <!-- end image-block -->";
    $component_end .= "</div> <!-- end row -->";

    echo $component_end;

    if ( $this->template == "four-up" ) {
      echo $compenent_four_up_end;

    }
  }

  /**
   * [set_block_output output the content for the blocks]
   */
  public function set_block_output() {
    $this->set_component_start();
    if ( !$this->heading == "" ) :
      echo  "<h2>" . $this->heading . "</h2>";
    endif;

    echo "<ul>";

      for ( $i = 0; $i < count( $this->array ); $i++ ) {
        echo "<li>";

      if (!$this->array[$i]['video-url'] == "" ) { 
      
          echo "<video src=\"" .$this->array[$i]['media']. "\" style=\"width:100%;height:100%;\" controls=\"control\" preload=\"none\">";
          echo "<source src=\"" .$this->array[$i]['video-url']. "\" type=\"video/youtube\"/>";
          echo "</video>";
      }

      if ( !$this->array[$i]['image'] == "" ) {
      echo "<figure class=\"feature\">";

        if ( !$this->array[$i]['section_link'] == "" ) {
          echo "<a href=\""  . $this->array[$i]['section_link'] . "\"title=\"" . $this->array[$i]['link_title'] . "\">" ;
        }
              // If we're working in the CMS, reveal the original upload
              if ($this->environment() == 'cms') {
                echo "<img src=\""  . $this->array[$i]['image'] . "\" alt=\"Image Alt\">";
              // otherwise, load a resrc'd image
              } else { 
                echo "<img data-src=\"http://app.resrc.it/o=60/" . siteURL() . $this->array[$i]['image'] . "\" alt=\"Image Alt\" class=\"resrc\">";
              }

        echo "</a>";
        if ( !$this->array[$i]['credit'] == "" ) {
          echo "<div class=\"credits\">" . $this->array[$i]['credit'] . "</div>";
        }

        if ( !$this->array[$i]['figcaption'] == "" ) {
          echo "<figcaption><span>" . $this->array[$i]['figcaption'] . "</span></figcaption>";
        }

        echo "</figure>";

      }
      // end image

      if ( !$this->array[$i]['title'] == "" ) {
        
        if ( !$this->array[$i]['section_link'] == "" ) {
          echo "<h3><a href=\"" . $this->array[$i]['section_link'] . "\" title=\"". $this->array[$i]['title'] . "\">" . $this->array[$i]['title'] . "</a></h3>";
        } else {
          echo "<h3>" . $this->array[$i]['title'] . "</h3>";
        }
        
      }

      if ( !$this->array[$i]['text'] == "" ) {
        echo "<p>" .  $this->array[$i]['text'] . "</p>";
      }

      // if the user wants a button
      if ( !$this->array[$i]['button_link_text'] == "" ) { 
        echo "<p><a href=\"";
          if (!$this->array[$i]['external_link'] == "") { // use the external link if supplied
            echo $this->array[$i]['external_link'];
          } else { // use the original section link
            echo $this->array[$i]['section_link'];
          }  
        echo "\" class=\"button-link\" title=\"" . $this->array[$i]['link_title'] . "\"><span class=\"hide-descriptive-text\">Follow this link to go to more information about</span>" . $this->array[$i]['button_link_text'] . "</a></p>";
      }

      echo "</li>";

    }

    echo "</ul>";


    $this->set_component_end();
  }


} // Block Class declaration


} // end check if class_exists

?><?php

if(class_exists('Course') != true) 
{
	
	class Course {
    		// Create course object
    		public function __construct(Array $properties = array()) {
	
//		public static function get_college($query) {
//			parse_str($_SERVER['QUERY_STRING']);
//		}
//	
		function set_college($properties) {
		    parse_str($_SERVER['QUERY_STRING']);
		    if (isset($college)) {
		    	$d = urldecode($college);
		    }
		    if (isset($level)) {
		    	$l = urldecode($level);
		    }
		    if (isset($mode)) {
		    	$m = urldecode($mode);
		    }

		    //$m = urldecode($mode);
		    if ( isset($d)  ) {
		    	$t = $properties['college'] == $d;

		    }

		    if ( isset($l)  ) {
		    	$t = $properties['level'] == $l;

		    }
		    if ( isset($m)  ) {
		    	$t = $properties['mode'] == $m;

		    }  

		    if (isset($d) && isset($l) ) {
		    	$t = $properties['college'] == $d && $properties['level'] == $l;
		    }
		    if (isset($d) && isset($m) ) {
		    	$t = $properties['college'] == $d && $properties['mode'] == $m;
		    }
		    if (isset($l) && isset($m) ) {
		    	$t = $properties['level'] == $l && $properties['mode'] == $m;
		    }
		    
		    return($t);
	
		}
 
 			if (!empty($_GET)) {

			$test = array_filter($properties, "set_college");
					//print_r($test);
			} else {
				$test = $properties ;
			}
			     foreach($test as $key => $value) {
        		$this->{$key} = $value;
      		}
    		}

	}

}

?><?php
// check whether class exists
if(class_exists('AZ') != true) 
{

	class AZ {

		public $array; // profiles content array

		/**
		 * [__construct description]
		 *
		 * @param array   $array     [array of content]
		 */
		public function __construct( array $array = array() ) {
			$this->array = $array;
		}

		/**
		 * [__destruct destroy array after completion]
		 */
		public function __destruct() {
			unset( $this->array);
		}


		/**
		 * [get_first_word - extract the first_word from title field]
		 */
		public function get_first_word($name) {

			$name = trim($name);
			$pos = strpos($name, ' ');

			if ($pos === false) {
				$first_word = $name;
			}

			$first_word = substr($name, 0, $pos);
			
			//return trim($first_word);
			return trim($first_word);
			
		}


		/**
		 * [get_last_word - extract the last_word from title field]
		 */
		public function get_last_word($name) {

			$name = trim($name);
			$pos = strrpos($name, ' ');

			if ($pos === false) {
				$last_word = $name;
			}

			$last_word = substr($name, $pos);
			
			//return trim($first_word);
			return trim($last_word);
			
		}


		/**
		 * [alpha_sort_array - sort our array by a custom orderby parameter]
		 */
		public function alpha_sort_array($array, $orderby) {

			$sortArray = array(); 

			foreach($array as $item){ 
				
			    foreach($item as $key=>$value){ 
			        if(!isset($sortArray[$key])){ 
			            $sortArray[$key] = array(); 
			        } 
			        $sortArray[$key][] = $value; 
			    } 
			} 

			array_multisort($sortArray[$orderby],SORT_ASC,$array); 

			return $array;

		}


		/**
		 * [enhance_arrays - push additional values into our existing $this->array]
		 */
		public function enhance_arrays() {

			$enhancedArray = array();
			$enhancedItemArray = array();

			foreach($this->array as $item){ 

				$first_word = $this->get_first_word($item['title']);
				$last_word = $this->get_last_word($item['title']);

				//echo $this->get_first_word($item['title']);
				//echo $this->get_last_word($item['title']);

				foreach($item as $key=>$value){ 
					$enhancedItemArray[$key] = $value;
					$enhancedItemArray['first_word'] = $first_word;
					$enhancedItemArray['last_word'] = $last_word;
					$enhancedItemArray['first_word_letter'] = $first_word[0];
					$enhancedItemArray['last_word_letter'] = $last_word[0];
				}

				$enhancedArray[] = $enhancedItemArray;
			}

			return $enhancedArray;

		}



		public function do_item_loop($item) {
		?>
			<li class="row">
				<!--<figure>
					<a href="<?php echo $item['section_link']; ?>" title=""><img src="http://placehold.it/300x300&text=THUMBNAIL" alt="Image Alt"></a>
				</figure>-->
				<div class="text">
					<h3 class="size-h5"><a href="<?php echo $item['section_link']; ?>" title=""><?php echo $item['title']; ?></a></h3>
					<?php if ($item['teaser'] != '') { echo "<p>" . $item['teaser'] . "</p>"; } ?>
				</div>
			</li>
		<?php 	
		}



		/**
		 * [do_output output the content for the blocks]
		 */
		public function do_output($orderby) {
			
			$enhanced = $this->enhance_arrays();

			$sorted = $this->alpha_sort_array($enhanced, $orderby);

			// pump out A-Z letter scroll
			if ($orderby == 'first_word') { 
				$letter = 'first_word_letter'; 
			} else {
				$letter = 'last_word_letter'; 
			}
			?>
			
			<div class="row">
				<div class="a-to-z">
					<ul class="js-carousel" data-carousel-item-width="48" data-carousel-item-margin="12" data-carousel-min-items="6"> 
					<?php		
					$temp_letter = '';
					foreach ($sorted as $item) { 
						if ( $item[$letter] != $temp_letter ) {
							echo '<li class="slide"><a href="#'.$item[$letter].'">'.$item[$letter].'</a></li>'; 
						}
						$temp_letter = $item[$letter];
					}
					?>
					</ul>
				</div>
			</div>
				
			<div class="row">
				
				<?php	
				$temp_letter = '';
				$counter = 1;
				$item_count = sizeof($sorted);

				foreach ($sorted as $item) { 

					if ( $item[$letter] != $temp_letter ) { 

						if ($counter > 1) { ?>	

									</ul>
								</div><!-- .l-content -->
							</div><!-- .row -->	

						<?php } ?>

							<div class="row  az-group" id="<?php echo $item[$letter]; ?>" data-group="<?php echo $item[$letter]; ?>">
								<h2 class="az-letter"><?php echo $item[$letter]; ?></h2>
								<div class="image-list-with-text-content">
									<ul>

					<?php }

					$this->do_item_loop($item);

					if ($counter == $item_count) { ?>

									</ul>
								</div><!-- .l-content -->
							</div><!-- .row -->	
					<?php
					}

					$temp_letter = $item[$letter];
					$counter++;

				} // end foreach ?>

			</div><!-- .row -->
		<?php
		} 

	} // AZ Class declaration

} // end check if class_exists

?><?php 

	if(class_exists('ShortCourse') != true) 
	{

	class ShortCourse {
		
		public $xml;
		public $courseIds;
		public $companyId;

		
		/**
		 * [__construct This returns the courseId and companyId in the object]
		 *
		 * @param string  $courseIds [set the courseID for the SimpleXML Object]
		 * @param string  $companyId [set the companyID for the SimpleXml Object]
		 */
		public function __construct( $courseIds = "", $companyId = "" ) {
			// 'INTROD9Ww6'
			$this->courseIds = $courseIds;
			// 'LCF', 'CSM'  
			$this->companyId = $companyId;

		}
		
		public function courseDatesCache($courseids="", $companyid=""){

		    $cache_file = "/web/sites/t4www/www.arts.ac.uk/ci-".$courseids."-".$companyid.".txt";
		    $cache_outofdate = "-1 day"; // Minimum interval to update the cache file    
		    
		    // TRY AND GET THE LIVE DATA
		    // --------------------------------------
		    $ch = curl_init("http://arts.accessplanit.com/accessplan/config/arts/handlers/coursedates.ashx?courseids=".$courseids."&companyid=".$companyid);
		    curl_setopt($ch, CURLOPT_PROXY, 'wwwcache.arts.ac.uk:3128');  curl_setopt($ch, CURLOPT_FAILONERROR,1);
		    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1); curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); curl_setopt($ch, CURLOPT_TIMEOUT, 15);
		    $retValue = curl_exec($ch); curl_close($ch);
		    
		    if (!empty($retValue)) {
		        // IF the LIVE data was returned. 
		        if ((!file_exists($cache_file)) OR (!empty($_GET['cacheupdate'])) OR (@filesize($cache_file) <= 10) OR ((filemtime($cache_file) < (strtotime($cache_outofdate))))) {
		            // IF no cache exists OR forced update OR cache file is emmpty OR cachefile is out of date (as defiend by $cache_outofdate), UPDATE IT.
		            $writeDat = @file_put_contents($cache_file, $retValue);
		            echo '<!-- DEBUG: Cache file was successfully updated -->'; // echo '<!-- DEBUG: Cache file was successfully updated (' . $cache_file . ') -->';
		        }
		        
		        // Return LIVE data
		        return $retValue;
		        
		    } else {
		        // ELSE no live data was returned. Try read it from the cache
		        if ((@file_exists($cache_file)) AND (filesize($cache_file) > 10)) {
		            // As long as the cache file is populated, return that.
		            echo '<!-- DEBUG: cache update failed, read old information from cache (' . $cache_file . ') -->';
		            $retValue = @file_get_contents($cache_file);
		            
		            // As long as it is not empty, return cache data
		            if (!empty($retValue)) {
		                return $retValue;
		            }
		        }
		        
		        // Return Error message (No LIVE data or populated CACHE data)
		        echo '<!-- DEBUG: Unable to update file and no cache available -->';
		        return '<courses><course courseid="ERR0R" label="Error loading information"><materials>&lt;P&gt;There was an error loading course information&lt;/P&gt;</materials><description>&lt;P&gt;There was an error loading course information.&lt;/P&gt;</description><dates></dates></course><tutors></tutors><venues></venues></courses>';
		    }
		}
		
		public function returnXml() {
			
			$this->xml = @simplexml_load_string($this->courseDatesCache($this->courseIds, $this->companyId));
			$result = $this->xml;
			return $this->xml;
			
		}
		
		public function returnErrors() {
			
			if(isset($_GET['errors'])){
				ini_set('display_errors',1); 
				ini_set('error_reporting', E_ALL); 
				error_reporting(E_ALL);
			}
		}
		
		public function description() {
			$description = strip_tags($this->xml->course->description);
			return $description;
		}

		public function description_acc() {
			$description_acc = $this->xml->course->description;
			return $description_acc;
		}
		
		
		public function materials() {
			$materials = $this->xml->course->materials;
			return $materials;
		}
		
		public function title() {
			$title = $this->xml->xpath('/courses/course/@label');
			foreach ($title as $key => $value) {
				return $value;
			} 
		}

		public function dates() {
			$dates = $this->xml->course->dates;
			$array = get_object_vars($dates);
			if (empty($array)) {
				return FALSE;
				} else {
					return $array;
			}
		}
		
		public function datesChildren() {
			$datesChildren = $this->xml->course->dates->children();
			return $datesChildren;
		}

		public function getTutors() {
			 if (!empty ($this->xml->tutors)) {
				$a = 1;
				foreach($this->xml->tutors->children() as $tutor) {
					$tutor["value"];
					if ( $a <> 1 ) {echo ", ";} 
					$a = $a+1;
					return $tutor["name"]; 
				} // End of For each tutor

			} //End of if not empty
		}

		public function getTutorsBiography() {
			$TutorsBiography = $this->xml->tutors->tutor->description;
			if (empty($TutorsBiography)) {
				return FALSE;
			} else {
				return $TutorsBiography;
			}
		}
		
		
		public function Truncate($string, $length, $stopanywhere = false) {
		    //truncates a string to a certain char length, stopping on a word if not specified otherwise.
		    if (strlen($string) > $length) {
		        //limit hit!
		        $string = substr($string,0,($length -3));
		        if ($stopanywhere) {
		            //stop anywhere
		            $string .= '...';
		        } else{
		            //stop on a word.
		            $string = substr($string,0,strrpos($string,' ')).'...';
		        }
		    }
		    return $string;
		}
	
}
}
?>
<!DOCTYPE html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]>
  <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en">
<![endif]-->
<!--[if IE 7]>
  <html class="no-js lt-ie9 lt-ie8" lang="en">
<![endif]-->
<!--[if IE 8]>
  <html class="no-js lt-ie9" lang="en">
<![endif]-->
<!--[if gt IE 8]>
  <!--> <html lang="en"> <!--
<![endif]-->
  <head>
<!-- Add section name tag -->
    <?php 
	$title = "Central Saint Martins"; 
	if (!empty($title)) {
  
  	echo "<title>" . $title.  " - University of Arts London</title>";
  
	} else {
  
  	echo "<title> University of Arts London</title>";
  
	}
    
    ?>
    <meta charset='utf-8'>
    <meta content='width=device-width, initial-scale=1.0' name='viewport'>
    <meta content='IE=edge,chrome=1' http-equiv='X-UA-Compatible"'>
    <meta content='on' http-equiv='cleartype'>
    <meta content='University of Arts London, Web Team' name='author'>
    <!-- Meta description tag -->
    
    <link rel="dns-prefetch" href="//s3.amazonaws.com">
    <link rel="dns-prefetch" href="//ajax.googleapis.com">
<!-- The fav icons -->
<link rel="shortcut icon" href="http://www.arts.ac.uk/favicon.ico" />
    
<!-- screen.css -->    
<link rel="stylesheet" type="text/css" media="screen" href="http://beta.arts.ac.uk/media/beta/beta-assets/css/screen.css" />
<!-- fonts.css -->
<!-- <link rel="stylesheet" type="text/css" media="" href="http://beta.arts.ac.uk/media/beta/beta-assets/fonts.css" /> -->
    
<link rel="stylesheet" type="text/css" href="//cloud.typography.com/7258632/627802/css/fonts.css" />
    

<!--[if (lt IE 9) & (!IEMobile)]>
    <script src='http://beta.arts.ac.uk/media/beta/beta-assets/js/selectivizr-min.js'></script>
    <script src="http://beta.arts.ac.uk/media/beta/beta-assets/js/html5shiv.js"></script>
    <script src ='http://beta.arts.ac.uk/media/beta/beta-assets/js/respond.src.js'></script>
<![endif]-->
    
<!-- JavaScript -->
	<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/modernizr-2.6.2-min.js"></script>
   	<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/detectizr.min.js"></script>  

    
    <script> Modernizr.Detectizr.detect({detectScreen:false}); </script>
    
   <!-- load icon files for logos and icons -->
     <script>
  /* grunticon Stylesheet Loader | https://github.com/filamentgroup/grunticon | (c) 2012 Scott Jehl, Filament Group, Inc. | MIT license. */
window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!!t.document.createElementNS&&!!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect&&!!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),A=function(A){var o=t.document.createElement("link"),r=t.document.getElementsByTagName("script")[0];o.rel="stylesheet",o.href=e[A&&n?0:A?1:2],r.parentNode.insertBefore(o,r)},o=new t.Image;o.onerror=function(){A(!1)},o.onload=function(){A(1===o.width&&1===o.height)},o.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};
grunticon( [ "http://beta.arts.ac.uk/media/beta/beta-assets/css/logos/logos.data.svg.css", "http://beta.arts.ac.uk/media/beta/beta-assets/css/logos/logos.data.png.css", "http://beta.arts.ac.uk/media/beta/beta-assets/css/logos/logos.fallback.css" ] );
  </script>
  <noscript><link href="http://beta.arts.ac.uk/media/beta/beta-assets/css/logos/logos.fallback.css" rel="stylesheet"></noscript>
  </head>

<?php 
// By default, sections have H1 headings
$header = true;
$currentSectionID = "35289";
$levelThreeID = "35289";

// Turn off the header on main home page and College landing pages
switch ($currentSectionID) {
    case '33986': 
    $sectionClass = "home";
    $collegeClass = "ual";
    $header = false;
    break;
    case '35288':
    $sectionClass = "home";
    $header = false;
        break;
    case '35289':
    $sectionClass = "home";
    $header = false;
        break;
    case '35290':
    $sectionClass = "home";
    $header = false;  
        break;
    case '35291':
    $sectionClass = "home";
    $header = false;
        break;
    case '35292':
    $sectionClass = "home";
    $header = false;
        break;
    case '35293':
    $sectionClass = "home";
    $header = false;
        break;
}

// Set a body class based on the college section, for CSS namespacing
switch ($levelThreeID) {
    case '35288':
        $collegeClass = "camberwell college";
  	$menuHeading = '<a href="/camberwell" title="Camberwell College of Art">Camberwell College of Art</a>';
        break;
    case '35289':
        $collegeClass = "csm college";
  $menuHeading = '<a href="/csm" title="Central Saint Martins">Central Saint Martins</a>';
        break;
    case '35290':
        $collegeClass = "chelsea college";
  $menuHeading = '<a href="/chelsea" title="Chelsea College of Art">Chelsea College of Art</a>';
        break;
    case '35291':
        $collegeClass = "lcc college";
        $menuHeading = '<a href="/lcc" title="London College of Communication">London College of Communication</a>';
        break;
    case '35292':
        $collegeClass = "lcf college";
        $menuHeading = '<a href="/fashion" title="London College of Fashion">London College of Fashion</a>';
        break;
    case '35293':
        $collegeClass = "wimbledon college";
  	$menuHeading = '<a href="/wimbledon" title="Wimbledon College of Art">Wimbledon College of Art</a>';
        break;
    default:
        $collegeClass = "ual";
        $menuHeading = "In this section";
}
?>

<body class="<?php echo $collegeClass . ' ' . $sectionClass; ?>  ">
 <div class="ual-black-bg cf">
<div class="header-wrapper">
  <div class="row">  
      <div class="ual-banner-menu">
        
        <div class="ual-logo-tab-mobile">
          <a href="/" title="Navigate back to the UAL homepage"><div class="logo-ual-mobile"></div></a>
        </div>
        <div class="ual-logo-desktop">
          <div class="logo-ual<?php if ($collegeClass != 'ual') { echo '-' . $collegeClass; }?>"></div>
        </div> 

      <nav class="college-link-menu">
        <ul>
          <li class="col-link-ual"><a href="/">University Home</a></li>
            <li class="col-link-camberwell"><a href="/camberwell/">Camberwell</a></li>
            <li class="col-link-csm"><a href="/csm/">CSM</a></li>
            <li class="col-link-chelsea"><a href="/chelsea/">Chelsea</a></li>
            <li class="col-link-lcc"><a href="/lcc/">LCC</a></li>
            <li class="col-link-lcf"><a href="/fashion/">LCF</a></li>
            <li class="col-link-wimbledon"><a href="/wimbledon/">Wimbledon</a></li>
        </ul>
      </nav>
    </div>
  </div>


<div class="row">  
<!-- navigation object : Main navigation include -->
<nav class="main-nav-wrapper" id="global-nav" role="navigation">
    <div class="megamenu_container top-bar">        
        <a href="#">
            <div class="ual-logo-tab-mobile">
                <div class="logo-ual-mobile"></div>
            </div>
        </a>
    <ul class="megamenu">
      <!-- mobile menu button  -->
        <li class="megamenu_button">
            <a href="#" class="m-menu-btn-toggle"><span class="icon-menu-1"></span></a>
        </li> 
      <!-- Course Finder -->          
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick">Course Finder</a><!-- Begin Item -->
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
            <div class="dd-menu-dropdown-wrapper">
                <div class="d-course-finder-menu-panel row">
                    <div class="row relative">
                        <form method="" action="http://search.arts.ac.uk/s/search.html" class="d-search-input-form">
                            <input  accesskey="q" value="" class="course-finder-txt-input" type="text"  placeholder="Search for a course here" name="query">
                            <input type="hidden" value="simple" name="form">
                            <input type="hidden" value="courses" name="collection">
                            <input type="submit" name="submit-course-search" class="go-search-button" value="Go"/>
                            <div class="small-text-link"><a href="" >view all courses</a></div>
                        </form>
                    </div>
                 </div> 
            </div>    
        </div><!-- End Item Container --> 
      </li><!-- End Item -->
      <!-- End Course Finder -->

      <!-- Colleges --> 
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick" title="">Colleges</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
            <div class="dd-menu-dropdown-wrapper">
                <div class="region college-nav">  
                    <ul class="subnav-1 region">
                        <li>
                           <a href="/camberwell/" title="Visit Camberwell">Camberwell College of Art</a>
                        </li>
                        <li>
                          <a href="/csm/" title="Visit Central Saint Martins">Central Saint Martins (CSM)</a>
                        </li>
                        <li>
                       <a href="/chelsea/" title="Visit Chelsea">Chelsea College of Art</a>
                        </li>
                        <li>
                      <a href="/lcc/" title="Visit London College of Communication">London College of Communication (LCC)</a>
                        </li>
                        <li>
                       <a href="/fashion/" title="Visit London College of Fashion">London College of Fashion (LCF)</a>
                        </li>
                        <li>
                       <a href="/wimbledon/" title="Visit Wimbledon">Wimbledon College of Art</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div><!-- End Item Container --> 
      </li>
      <!-- End Colleges -->

      <!-- Study at UAL --> 
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick" title="">Study at UAL</a>
        <!-- dropdown -->
            <div class="dropdown_fullwidth"> 
                <div class="dd-menu-dropdown-wrapper study-nav">
                    <ul class="subnav-1 no-pad-top region">
                        <li class="no-border-top"><a href="/study-at-ual/" title="Study at UAL">Study at UAL</a></li>
                        <li><a href="/study-at-ual/courses/">Courses</a></li><li><a href="/study-at-ual/international/">International</a></li><li><a href="/study-at-ual/open-days/">Open Days</a></li><li><a href="/study-at-ual/apply/">Apply</a></li><li><a href="/study-at-ual/enrol/">Enrol</a></li><li><a href="/study-at-ual/tuitions-fees/">Tuition Fees</a></li><li><a href="/study-at-ual/scholarships-bursaries-and-loans/">Scholarships, Bursaries &amp; Loans</a></li><li><a href="/study-at-ual/financial-advice/">Financial Advice</a></li><li><a href="/study-at-ual/student-support/">Student Support</a></li><li><a href="/study-at-ual/library-services/">Library Services</a></li><li><a href="/study-at-ual/learning-and-teaching/">Learning &amp; Teaching</a></li><li><a href="/study-at-ual/term-dates/">Term Dates</a></li><li><a href="/study-at-ual/academic-regulations/">Academic Regulations</a></li><li><a href="/study-at-ual/accommodation/">Accommodation</a></li><li><a href="/study-at-ual/students-union/">Students' Union</a></li><li><a href="/study-at-ual/facilities/">Facilities</a></li><li><a href="/study-at-ual/widening-participation/">Widening Participation</a></li>
                    </ul>
                </div>
            </div><!-- End dropdown --> 
      </li>
      <!-- End Study at UAL -->


      <!-- Research --> 
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick" title="">Research</a>
        <!-- dropdown -->
            <div class="dropdown_fullwidth"> 
                <div class="dd-menu-dropdown-wrapper">
                    <div class="row region">
                        <div class="sub-inner-menu research-nav">
                            <ul class="subnav-1 no-pad-top region" >
                                <li class="no-border-top"><a href="/research/" title="Research">Research</a></li>
                                <li><a href="/research/research-environment/">Research Environment</a></li><li><a href="/research/research-degrees/">Research Degrees</a></li><li><a href="/research/research-staff/">Research Staff</a></li><li><a href="/research/research-projects/">Research Projects</a></li><li><a href="/research/ual-research-centres/">UAL Research Centres</a></li>
                            </ul>
                        </div>
            <!-- <div class="feature-image m-hide t-hide" >
              <a href="#" title="Link title">
                <figure>
                  <img src="http://placehold.it/300x200&text=4+cols" alt="Image Alt">
                </figure>
              </a>
            </div> -->
                    </div>
                </div>
            </div><!-- End dropdown --> 
      </li>
      <!-- End Research -->


      <!-- Student Jobs & Careers --> 
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick" title="">Student Jobs &amp; Careers </a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth">  
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
              <div class="sub-inner-menu student-nav">
                <ul class="subnav-1  no-pad-top region" >
                    <li class="no-border-top"><a href="/student-jobs-and-careers/" title="Student jobs &amp; Careers" >Student Jobs &amp; Careers</a></li>
                    <li><a href="/student-jobs-and-careers/opportunities/">Opportunities</a></li><li><a href="/student-jobs-and-careers/events/">Events</a></li><li><a href="/student-jobs-and-careers/finding-work/">Finding Work</a></li><li><a href="/student-jobs-and-careers/resources/">Resources</a></li><li><a href="/student-jobs-and-careers/about-see/">About SEE</a></li>
                </ul>
              </div>
          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End Student Jobs & Careers -->


      <!-- Alumni & Friends --> 
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick" title="">Alumni &amp; Friends</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"> 
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
            <div class="sub-inner-menu alumni-nav">
              <ul class="subnav-1 region  no-pad-top region">
                <li class="no-border-top"><a href="/alumni-and-friends/" title="Alumni &amp; Friends">Alumni &amp; Friends</a></li>
                <li><a href="/alumni-and-friends/get-involved/">Get Involved</a></li><li><a href="/alumni-and-friends/inspiring-alumni/">Inspiring Alumni</a></li><li><a href="/alumni-and-friends/support-and-donate/">Support &amp; Donate</a></li><li><a href="/alumni-and-friends/benefits/">Benefits</a></li><li><a href="/alumni-and-friends/events-gallery/">Events Gallery</a></li>
              </ul>
            </div>

          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End Alumni & Friends -->


      <!-- Business & Innovation --> 
<!-- menu button -->
<li>
  <a href="#" class="megamenu_drop needsclick" title="">Industry Links</a>
  <!-- dropdown -->
  <div class="dropdown_fullwidth"> 
    <div class="dd-menu-dropdown-wrapper">
      <div class="row region">
        <div class="sub-inner-menu industry-nav">
          <ul class="subnav-1 no-pad-top region" >
            <li><a href="/camberwell/business-and-innovation/">Camberwell Business &amp; Innovation</a></li><li><a href="/csm/business-and-innovation/">CSM Business &amp; Innovation</a></li><li><a href="/chelsea/business-and-innovation/">Chelsea Business &amp; Innovation</a></li><li><a href="/lcc/business-and-innovation/">LCC Business &amp; Innovation</a></li><li><a href="/fashion/business-and-innovation/">LCF Business &amp; Innovation</a></li><li><a href="/wimbledon/business-and-innovation/">Wimbledon Business &amp; Innovation</a></li><li><a href="/student-jobs-and-careers/finding-work/information-for-employers/">Information for Employers</a></li>
          </ul>
        </div>
        <div class="feature m-hide t-hide" >
          <p>
Businesses worldwide work with us to find creative solutions, discover fresh ideas and recruit new talent. Join them, and let us help you develop your future.
          </p>
        </div> 
      </div>
    </div>
  </div><!-- End dropdown --> 
</li>
<!-- End Business & Innovation -->
        
      <!-- About UAL --> 
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick" title="">About UAL</a>
        <!-- dropdown -->
        <div class="dropdown_fullwidth"> 
          <div class="dd-menu-dropdown-wrapper">
          <div class="row region">
           
            <div class="sub-inner-menu about-nav">
              <ul class="subnav-1 no-pad-top region" >
                    <li class="no-border-top"><a href="/about-ual/" title="About UAL">About UAL</a></li>
                    <li><a href="/about-ual/news/">News</a></li><li><a href="/about-ual/events-and-calendar/">Events &amp; Calendar</a></li><li><a href="/about-ual/collections-and-galleries/">Collections &amp; Galleries</a></li><li><a href="/about-ual/ual-showroom/">UAL Showroom</a></li><li><a href="/about-ual/work-at-ual/">Work At UAL</a></li><li><a href="/about-ual/support-our-creative-future/">Support Our Creative Future</a></li><li><a href="/about-ual/strategy-governance/">Strategy &amp; Governance</a></li><li><a href="/about-ual/press-office/">Press Office</a></li><li><a href="/about-ual/awarding-body/">UAL Awarding Body</a></li><li><a href="/about-ual/diversity/">Diversity</a></li><li><a href="/about-ual/departments/">Departments</a></li><li><a href="/about-ual/contact-ual/">Contact UAL</a></li><li><a href="/about-ual/give-to-ual/">Give to UAL</a></li>
              </ul>
            </div>
            <!-- <div class="feature-image m-hide t-hide" >
              <a href="#" title="Link title">
                <figure>
                  <img src="http://placehold.it/300x200&text=4+cols" alt="Image Alt">
                </figure>
              </a>
            </div> -->
          </div>
          </div>
        </div><!-- End dropdown --> 
      </li>
      <!-- End About UAL -->
      <!-- Site Search -->          
      <!-- menu button -->
      <li>
        <a href="#" class="megamenu_drop needsclick search-icon icon-search"></a>
        <!-- Begin Item -->
        <!-- dropdown -->
        <div class="dropdown_fullwidth"><!-- Begin Item Container -->
          <div class="dd-menu-dropdown-wrapper">
          <div class="d-course-finder-menu-panel row">
            <div class="row relative">
              <form class="d-search-input-form"  method="" action="http://search.arts.ac.uk/s/search.html">
              <input class="course-finder-txt-input" type="text" required accesskey="q" value="" name="query" placeholder="Enter your search here">
                <input type="hidden" value="simple" name="form">
                <input type="hidden" value="website" name="collection">
                   <input type="submit" name="submit-site-search" class="go-search-button" value="Search"/>
              </form>
            </div>
          </div> 
          </div>    
        </div><!-- End Item Container --> 
      </li><!-- End Item -->
      <!-- End Site Search -->
      
      </ul>
      <!-- End expandable search button -->  
  </div>
  
</nav>
</div>
</div>
</div>
<?php
if ($header != false) { ?> 
<div class="header-panel bg-gray-bg">
    <div class="header-wrapper">
  <div class="row">
          <!-- navigation object : Breadcrumbs --><div class="breadcrumbs"><a href="/">University of the Arts London</a><a href="/csm/">Central Saint Martins</a></div>
    <div class="page-title">
      <h1><!-- navigation object : Section name -->Central Saint Martins</h1>
    </div>
  </div>  
    </div>
</div>
<?php } ?>

 <!-- section name -->
<!--<div class="content-wrapper">
  <div class="row">
    <div class="d5-d16">
      <h1>Central Saint Martins</h1>
    </div>
  </div>
  </div>-->
<!-- Add banner here -->
<div class="content-wrapper">

  <!-- Home page slider include -->
  <?php 

// we use these variables to check what type of slider is being created, and then output correctly
$slider_container_state = 'open';
$selected_width = 'full-grid-width';


if ($slider_container_state == 'open') { // open the slider 

  if ($selected_width == 'slider-8') { ?>

    <div class="row">
      <div class="l-content">

  <?php } ?>

        <div class="row slider-container <?php if ($selected_width == "full-grid-overflow") { echo "overflow"; } ?>">
          <!--  optional slider heading -->
            
          <?php if ($selected_width == "slider-3-14") { ?><div class="slider-3-14"> <?php } ?>
          <div class="royalSlider rsDefault block <?php if ($selected_width != "slider-3-14") { echo $selected_width; } ?>" data-slider-auto-play="" <?php 
            switch ($selected_width) {
              case "slider-12":
                echo "data-slider-item-width='948' data-slider-item-height='474'";
                break;
              case "slider-8":
                echo "data-slider-item-width='653' data-slider-item-height='327'";
                break;
              case "full-grid-width":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "full-grid-overflow":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "slider-3-14":
                echo "data-slider-item-width='948' data-slider-item-height='830'";
                break;  
              default:
                echo "";
            } ?>> 
              
<?php } else { // close the slider ?>        
          
          </div> 
          <?php if ($selected_width == "slider-3-14") { ?></div><?php } ?>
        </div><!-- end row div -->

  <?php if ($selected_width == 'slider-8') { ?>

      </div>
    </div>

  <?php }  
} ?><figure>

  <?php if (environment() != 'live') { ?>

    <img src="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/Darragh-Casey-Straddle-in-Studio[1]@2.jpg" alt="Darragh Casey - Straddle in Studio" class="rsImg" />

  <?php } else { ?>
    
    <img data-src="http://app.resrc.it/o=60/<?php echo siteURL(); ?>http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/Darragh-Casey-Straddle-in-Studio[1]@2.jpg" alt="Darragh Casey - Straddle in Studio" class="rsImg resrc" />
  <?php }
  
  $call_to_action_switch = "";

  if ($call_to_action_switch != "") { ?>

    <div class="call-to-action">
      <a href="" title=""></a>
    </div>

  <?php } ?>

  <div class="credits">Darragh Casey - Straddle in Studio</div>
  
  <figcaption class="rsCaption"></figcaption>
  
</figure><?php 

// we use these variables to check what type of slider is being created, and then output correctly
$slider_container_state = 'close';
$selected_width = 'full-grid-width';


if ($slider_container_state == 'open') { // open the slider 

  if ($selected_width == 'slider-8') { ?>

    <div class="row">
      <div class="l-content">

  <?php } ?>

        <div class="row slider-container <?php if ($selected_width == "full-grid-overflow") { echo "overflow"; } ?>">
          <!--  optional slider heading -->
            
          <?php if ($selected_width == "slider-3-14") { ?><div class="slider-3-14"> <?php } ?>
          <div class="royalSlider rsDefault block <?php if ($selected_width != "slider-3-14") { echo $selected_width; } ?>" data-slider-auto-play="" <?php 
            switch ($selected_width) {
              case "slider-12":
                echo "data-slider-item-width='948' data-slider-item-height='474'";
                break;
              case "slider-8":
                echo "data-slider-item-width='653' data-slider-item-height='327'";
                break;
              case "full-grid-width":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "full-grid-overflow":
                echo "data-slider-item-width='1280' data-slider-item-height='480'";
                break;
              case "slider-3-14":
                echo "data-slider-item-width='948' data-slider-item-height='830'";
                break;  
              default:
                echo "";
            } ?>> 
              
<?php } else { // close the slider ?>        
          
          </div> 
          <?php if ($selected_width == "slider-3-14") { ?></div><?php } ?>
        </div><!-- end row div -->

  <?php if ($selected_width == 'slider-8') { ?>

      </div>
    </div>

  <?php }  
} ?>
  
  <?php 

  if (($currentSectionID !== '33986') && ($currentSectionID !== '37512') && ($currentSectionID !== '37851') && ($currentSectionID !== '37508')) { ?>
  
    <div class="row">
      
      <nav role="navigation" class="sidebar">


	        <?php
	        // Dont show for Business and Innovation and show for all other sections
	        	if (($currentSectionID !== '35311') && ($currentSectionID !==  '42813') && ($currentSectionID !==  '44824') && ($currentSectionID !==  '44684') && ($currentSectionID !==  '44849') && ($currentSectionID !==  '44435') && ($currentSectionID !==  '44851') ) { ?>
	        <!-- navigation object : Left navigation -->
			<!-- navigation object : Include Course Dropdown -->
			
			<?php if ($navDropdown !== TRUE) { ?>
	        <ul>
	          <li class="menu-heading"><?php echo $menuHeading; ?></li>
	          <li><a href="/csm/about-csm/">About CSM</a></li><li><a href="/csm/courses/">Courses</a></li><li><a href="http://blogs.arts.ac.uk/csm/">News</a></li><li><a href="http://newsevents.arts.ac.uk/csm/events/">Events</a></li><li><a href="/csm/csm-culture/">CSM Culture</a></li><li><a href="/csm/people/">People</a></li><li><a href="/csm/research/">Research</a></li><li><a href="/csm/business-and-innovation/">Business &amp; Innovation</a></li><li><a href="/csm/drama-centre-london/">Drama Centre London</a></li>
	        </ul>
			<?php } ?>
	        <?php } 

	        // Only show for Business and Innovation
	        if ($currentSectionID == '35311') : ?>
	          <ul>
	            <li><a href="#link-one">Working with our students</a>
	            <li><a href="#link-two">Working with our staff</a>
	            <li><a href="#link-three">Working with our communities</a>
	            <li><a href="#link-four">Education, skills and qualifications</a>
	            <li><a href="#link-five">Events and Conferences</a>
	            <li><a href="#link-six">Mentoring and Networks</a>
	            <li><a href="#link-seven">Supporting Our Students</a>
	          </ul>
	        <?php endif ?>
			<?php
	         if (($currentSectionID ==  '42813') || ($currentSectionID ==  '44824') || ($currentSectionID ==  '44684') || ($currentSectionID ==  '44849') || ($currentSectionID ==  '44435') || ($currentSectionID ==  '44851') ) : ?>
	  			<div id="placeHolder"></div>
	          <?php endif ?>

      </nav>
      <div role="main" class="content">

  <?php } ?><?php 
  // clear existing variables
  $video_url = "";
  $media_block_type = "";

  $image_or_video = "image";
  $media_width = "feature";
  $media_file_url = "http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/images/bebraveanddowhatyoulove.jpg";
  $video_url = "";
  $aside_text = "";
  $feed_text = "";

  if ($image_or_video == "video" || $video_url != "") {
    $media_type = "video";
  } else {
    $media_type = "image";
  }

  if ($aside_text != "") {
    $media_block_type = "__with-aside";
  }
  
  if ($feed_text == "yes") {
    $media_block_type = "__with-aside";
  }

  // YOUTUBE
  if (strpos($video_url,"youtu") !== false) { // this allows for short URL and standard watch= URL
      $video_type = "youtube";
      if (strpos($video_url,"=") !== false) { // uses standard watch= URL
        $url_bits = explode('=', $video_url);
        $video_id = $url_bits[1];
      } else {
        $url_bits = explode('/', $video_url);
        $video_id = $url_bits[3];
      }
  }

  // VIMEO
  if (strpos($video_url,"vimeo") !== false) {
      $video_type = "vimeo";
      $url_bits = explode('/', $video_url);
      $video_id = $url_bits[3];
  }

  ?>

  <div class="row">
    <div class="l-content-full-width  block  __media  <?php echo $media_block_type; ?>">
      
        
          <div class="row">
            <?php if ($media_block_type == "__with-aside" || $media_width == "content") { ?>
            <div class="l-content">
            <?php } ?>  

            <?php if ($media_type == "video") { ?>

              <div class="video-container">

              <?php if ($video_url != "") { // this is an embed of some kind
                
                if ($video_type == "youtube") { ?>
                
                <iframe src="//www.youtube.com/embed/<?php echo $video_id; ?>" frameborder="0" allowfullscreen></iframe>            
            
                <?php } else { // Vimeo embed ?>

                <iframe src="//player.vimeo.com/video/<?php echo $video_id; ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                
                <?php } 
                
              } else { // this is an MP4 ?>

                <video src="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/images/bebraveanddowhatyoulove.jpg" style="width:100%;height:100%;"></video>

              <?php } // end if has video url ?>

              

              </div><!-- .video-container -->

            <?php } // end if is video

            // check that an image has been uploaded
            if ($media_type == "image" && $media_file_url != "") {
            ?>

            <figure>
              <?php if (environment() != "live") { ?>

                <img src="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/images/bebraveanddowhatyoulove.jpg" alt="Be Brave And Do What You Love" />

              <?php } else { ?>
    
                <img data-src="http://app.resrc.it/o=60/<?php echo siteURL(); ?>http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/images/bebraveanddowhatyoulove.jpg" alt="Be Brave And Do What You Love" class="rsImg resrc" />
              <?php } ?>

              
              
              
            </figure>

            <?php } ?>

            <div class="__text">      

              
              
              
                  
              
              
              
            </div><!-- .__text -->
       
          <?php if ($media_block_type == "__with-aside" || $media_width == "content") { ?>
          </div><!-- .l-content -->
          <?php } ?>  

          <!-- aside -->
          
          <!-- end aside -->
      <?php if ($feed_text == "yes") : ?>
          <aside>
          <!-- navigation object : LCC Home Page Feed -->
                 </aside>
      <?php endif ?>
        
        </div><!-- .row --> 

    </div><!-- end __media -->
  </div>
    </div>
  </div>

<div class="row">
    <ul class="__feature-wall">
      <a href="" title="Courses" class="d-hide"><li>Courses</li></a>
      
      <li class="t-hide m-hide">
        <a href="" title="Courses" title="Courses">
        <figure>
          <img src="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/Jy-Yeon-Suh@1.jpg" alt="Courses">
          <div class='credits'>Jy-Yeon Suh - MA Industrial Design 2011</div>
        </figure>
      </a></li>

      <li>
        <iframe width="560" height="315" src="//www.youtube.com/embed/wgQi0e0kG6Y" frameborder="0" allowfullscreen></iframe>
        <a href="" title="News" class="t-hide m-hide">
        <figure>
          <img src="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/images/news.jpg" alt="News"></a>
          <div class='credits'>Martha Zmpounou - MA Communication Design 2011</div>
        </figure>
      </li>

      <a href="" title="News" class="d-hide"><li>News</li></a>

      <a href="" title="Events" class="d-hide"><li>Events</li></a>

      <li>
        <a href="" title="Events" class="t-hide m-hide">
        <figure>
          <img src="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/images/events.jpg" alt="Events"></a>
          <div class='credits'>Wai Yin Li - BA (Hons) Fashion: Design With Marketing 2011</div>
        </figure>
        <iframe height="315" src="https://www.youtube.com/embed/bY4i5pZckMw?rel=0" frameborder="0" allowfullscreen></iframe>
      </li>

      <a href="" title="Open Days" class="d-hide"><li>Open Days</li></a>

      <li class="t-hide m-hide">
        <a href="" title="Open Days" >
        <figure>
          <img src="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/Tea-Mulabdic@1.JPG" alt="Open Days"></a>
          <div class='credits'>Tea Mulabdic - BA (Hons) Performance Design And Practice 2010</div>
        </figure>
      </li>

    </ul>
</div>    
        	
      </div>
  </div>
</div>



<!-- navigation object : College Footer Include --><?php 
$icon_1_type = "facebook"; 
$icon_2_type = "twitter"; 
$icon_3_type = "youtube"; 

$icon_1_url = "http://www.facebook.com/centralsaintmartins"; 
$icon_2_url = "http://twitter.com/csm_news"; 
$icon_3_url = "http://www.youtube.com/user/artslondoncsm"; 

$icon_array = array(
  array(
    "type" => $icon_1_type,
    "url" => $icon_1_url,
    ),
  array(
    "type" => $icon_2_type,
    "url" => $icon_2_url
    ),
  array(
    "type" => $icon_3_type,
    "url" => $icon_3_url
    )
  );
?>

<footer class="college-footer row ">
  <div class="footer-wrapper">
    <div class="footer-block left">
                  
      <h3 class='size-h2'>Contact Us</h3>
      <!-- see http://html5doctor.com/microformats/ -->
      <ul class="vcard">
        <li class="no-bullet">
          <a class="fn org url" href="/csm/" title="Contact information for Central Saint Martins"><span class="organization-name">Central Saint Martins</span></a>
        </li>
        <li>
        <span class="adr">
          <span class="street-address">Granary Building<br/>1 Granary Square</span>, <span class='locality'>King's Cross</span>,<br>
          <span class="region">London</span> <span class="postal-code">N1C 4AA</span> <span class='country'>UK</span>
          <br>
        </span>
        </li>
        <li><span class="tel">Telephone: <span class="value">+44 (0)20 7514 7444</span></span></li>
        
        
      </ul>
    </div>
    <div class="footer-block middle">
      <h3 class='size-h2'>Download</h3>
      <p>Get a copy of our <a href="http://beta.arts.ac.uk/media/beta/beta-colleges/beta-csm/documents/csm-undergraduate-course-guide.pdf">Undergraduate Course Guide (PDF 6.3MB)</a></p>
    </div>
    <div class="footer-block right">
      <h3 class='size-h2'>Connect</h3>
        <ul class="icons no-bullet">
          <?php foreach( $icon_array as $icon ) { 
          
            if ($icon['url'] == "") { continue; }
          
            switch ($icon['type']) {
              case "facebook":
                $icon_classname = "icon-facebook-circled";
                //$icon_ascii = "0xe815";
                break;
              case "twitter":
                $icon_classname = "icon-twitter-circled";    
                //$icon_ascii = "0xe831";                
                break;
              case "flickr":
                $icon_classname = "icon-flickr-circled";   
                break;
              case "youtube":
                $icon_classname = "icon-youtube";
                break;
              case "full-grid-width": // what's this ?
                //$icon_ascii = "&#62211;"; 
              break;

            } ?>
            <li>
              <a href="<?php echo $icon['url']; ?>" class="<?php echo $icon['type']; ?>">
                <span class="<?php echo $icon_classname; ?>"></span>
              </a>
            </li>
          <?php
          } ?> 
        </ul>
    </div>
  </div>
</footer>
<!-- navigation object : Main Footer Include --><!-- start footer -->
<footer class='global-footer row'>
  <div class="footer-wrapper">
    <div class="row">
      <div class='footer-links'>
        <ul class='footer-col-1'>
          <li>
            <a href=''>Accessibility</a>
          </li>
          <li>
            <a href='/about-ual/strategy-governance/public-information/freedom-of-information/'>Freedom of Information</a>
          </li>
          <li>
            <a href='/privacy-and-cookies/'>Privacy &amp; Cookies</a>
          </li>
          <li>
            <a href='/disclaimer/'>Disclaimer</a>
          </li>
        </ul>

        <ul class='footer-col-2'>
          <li>
            <a href='/about-ual/strategy-governance/public-information/charitable-status/'>Charitable Status</a>
          </li>
          <li>
            <a href='/about-ual/support-our-creative-future/'>Give to UAL</a>
          </li>
          <li>
            <a href='/about-ual/work-at-ual/'>Work at UAL</a>
          </li>
          <li>
            <a href=''>Feedback</a>
          </li>
        </ul>

        <ul class='footer-col-3'>
          <li>
            <a href='http://showtime.arts.ac.uk/'>Showtime</a>
          </li>
          <li>
            <a href='http://my.arts.ac.uk/'>MyArts Staff</a>
          </li>
          <li>
            <a href='http://my.arts.ac.uk/student/'>MyArts Student</a>
          </li>
          <li>
            <a href='http://www.suarts.org/'>Students' Union</a>
          </li>
        </ul>

        <ul class="social-links">
          <h3>Connect with UAL:</h3>
          <li><a href="https://twitter.com/UniArtsLondon" title="UAL on Twitter"><span class="footer-ico icon-twitter"></span></a></li> 
          <li><a href="https://www.facebook.com/UniversityoftheArtsLondon" title="UAL on Facebook"><span class="footer-ico icon-facebook"></span></a></li>
          <li><a href="http://www.youtube.com/user/universityartslondon" title="UAL on YouTube"><span class="footer-ico icon-youtube"></span></a></li>
          <li><a href="#" title="UAL on Flickr"><span class="footer-ico icon-flickr"></span></a></li>
        </ul>
      </div>


      
      <div class="row">
        <div class='copyright'>
          <p>&copy; <?php echo date("Y") ?> University of the Arts London All Rights Reserved</p>
        </div>
      </div>
    </div>
  </div>

  <a href="#" class="back-to-top"><span>&uarr;</span> back to top</a>
</footer>

<footer class="row white-bg hide">
    <div class="footer-wrapper">
        <a href="#" class="open-close debug-toggle"><span>↓</span> Open Debug panel</a>
        <!-- debug -->
        <ul id="debug">
          <li>Channel base uri: /</li>
          <li>Channel base description: This channel is used to publish the BETA UAL Website.</li>
          <li>Channel base id: 18</li>
          <li>Channel base name: Beta UAL Website</li>
          <li>Page created : Mon 19 Aug 2013 11:24:34</li>
          <li>Page modified : Wed 18 Sep 2013 11:42:36</li>
          <?php $i = 0; ?>
          <li>Section id : 35289</li>
      </ul>
        <!-- end debug -->
    </div>

</footer>
<div class="credits-btn"><a href="#" class="show-credits"><span class="icon-picture"></span></a></div>
<!-- Include js scripts -->

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script>
    Modernizr.Detectizr.detect({detectScreen:false});
</script>
<script src="http://use.resrc.it/js/resrc-0.6.1.min.js"></script>

<!--<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/resrc-0.6.1.min.js"></script>-->

  <!-- fastClick -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/fastclick.js"></script>

<!-- jquery.fitvids-ck.js -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/jquery.fitvids-ck.js"></script>
 
<!-- reView script - used for LazyLoading with ReSRC.it -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/jquery.review-1.0.0.min.js"></script>


<!-- navigation object : Javascript include 
-->
  


<!-- Mega Menu Plugins -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/megamenu_plugins.js"></script>
<!-- Mega Menu Script -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/megamenu-ck.js"></script>

<!-- Scripts -->
<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/script.js"></script>

<!--<script type="text/javascript" src="http://beta.arts.ac.uk/media/beta/beta-assets/js/script-1.js"></script>-->

  <script>
  $(document).ready(function($){
      $('.megamenu').megaMenuCompleteSet({
          menu_effect : 'open_close_slide', // Drop down effect, choose between 'hover_fade', 'hover_slide', etc.
          menu_click_outside : 1, // Clicks outside the drop down close it (1 = true, 0 = false)
          menu_show_onload : 0, // Drop down to show on page load (type the number of the drop down, 0 for none)
          menu_responsive:1 // 1 = Responsive, 0 = Not responsive
      });
});
</script>  
<?php
if (!isset($shortCourse)) { $shortCourse = FALSE; }
if ($shortCourse == TRUE) { ?>
<script type="text/javascript" src="https://arts.accessplanit.com/accessplan/config/arts/scripts/website.js"></script>
<script type="text/javascript" src="http://arts.accessplanit.com/accessplan/config/arts/scripts/popup.js"></script>
<?php } ?>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-32658704-1']);
  _gaq.push(['_setDomainName', 'arts.ac.uk']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>