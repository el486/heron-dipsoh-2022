<?php
try {
	echo "Reconstruyendo indices<br>";
	exec("sudo /home/gisdev/raster-refresh.sh");
	echo "Hecho";
	}
catch (Exception $e) {
    echo $e->getMessage();
	}
?>