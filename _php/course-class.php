<?php

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
		    // returns whether the input integer is odd
		    return($properties['college'] == "London College of fashion");
		}


		$test = array_filter($properties, "set_college");
		//print_r($test);

      		foreach($test as $key => $value) {
        		$this->{$key} = $value;
      		}
    		}

	}

}

?>

<?php
// Instantiante Array

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "not",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "not",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);


$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

$courses[] = array( 
"title" => "Ipsum Porta Inceptos Parturient Euismod",
"level"  => "Undergraduate",
"college" => "London College of fashion",
"mode"  => "Full time",
"url" => "http://www.arts.ac.uk/fashion/courses/undergraduate/ba-fashion",
"usp"  => "Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus."
);

  
$course = new Course($courses);

parse_str($_SERVER['QUERY_STRING']);

// output course array in JSON
echo json_encode($course);