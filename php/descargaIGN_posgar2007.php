<?php

$codigo = $_REQUEST['codigo'];
//$faja = $_REQUEST['faja'];
$epsg = substr($codigo,3,1);
echo $epsg;
if ($epsg=='3'){
	$path = '/var/lib/tomcat8/webapps/geoserver/data/500g/DatosGis/imagenes/cartas_50k/EPSG-5346/'; 
	$file = $path.'cartas_50k__'.$codigo.'_EPSG-5346.tif';
	$file2 = $path.'cartas_50k__'.$codigo.'_EPSG-5346.tfw';
	$faja = 4;
	}
if ($epsg=='0'){
	$path = '/var/lib/tomcat8/webapps/geoserver/data/500g/DatosGis/imagenes/cartas_50k/EPSG-5347/';	
	$file = $path.'cartas_50k__'.$codigo.'_EPSG-5347.tif';
	$file2 = $path.'cartas_50k__'.$codigo.'_EPSG-5347.tfw';
	$faja = 5;
	}
if ($epsg=='7'){
	$path = '/var/lib/tomcat8/webapps/geoserver/data/500g/DatosGis/imagenes/cartas_50k/EPSG-5348/';	
	$file = $path.'cartas_50k__'.$codigo.'_EPSG-5348.tif';
	$file2 = $path.'cartas_50k__'.$codigo.'_EPSG-5348.tfw';
	$faja = 6;
	}
$man = '/var/lib/tomcat8/webapps/geoserver/data/500g/DatosGis/imagenes/manual.rar';
$zipname = '/tmp/'.$codigo.'_posgar07.zip';

if (file_exists($zipname)) {
unlink($zipname);
}

if (file_exists($file)) {

$zip = new ZipArchive;
$zip->open($zipname, ZipArchive::CREATE);
$zip->addFile($file,$codigo.'_posgar2007faja'.$faja.'.tif');
$zip->addfile($man,'manual y herramientas.rar');
if (file_exists($file2)) { 
	$zip->addFile($file2,$codigo.'_posgar2007faja'.$faja.'.tfw');
}
$zip->close();

if (file_exists($zipname)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.$codigo.'_posgar07.zip');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($zipname));
    ob_clean();
    flush();
    readfile($zipname);
    exit;
}

} else{
Echo 'No se encuentra el archivo.';
}
?>