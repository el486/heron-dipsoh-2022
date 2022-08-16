<!--
  ~ This program is free software: you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation, either version 3 of the License, or
  ~ (at your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful,
  ~ but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~ GNU General Public License for more details.
  ~
  ~ You should have received a copy of the GNU General Public License
  ~ along with this program.  If not, see <http://www.gnu.org/licenses/>.
  -->
<?php
  // Se prendio esta mrd :v
  session_start();

  // Validamos que exista una session y ademas que el cargo que exista sea igual a 1 (Administrador)
  if(!isset($_SESSION['cargo']) || $_SESSION['cargo'] != 1){
    /*
      Para redireccionar en php se utiliza header,
      pero al ser datos enviados por cabereza debe ejecutarse
      antes de mostrar cualquier informacion en el DOM es por eso que inserto este
      codigo antes de la estructura del html, espero haber sido claro
    */
    header('location: ../visor/index.php');
  }

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
		"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
	<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8">
	<title>Visor SIG Hidraulica</title>
	<link rel="shortcut icon" href="https://www.gba.gob.ar/sites/default/files/favicon_5.ico" type="image/vnd.microsoft.icon" />
		
	<?php
	$plano=$_GET['plano']; //php para capturar el par�metro pasado por URL
	$idobra=$_GET['idobra']; //php para capturar el par�metro pasado por URL
	$bookmark=$_GET['bookmark']; //php para capturar el par�metro pasado por URL
	?>
	<script type="text/javascript" >
	if(navigator.appName.indexOf("Internet Explorer")!=-1){alert('Usted est� usando Internet Explorer. Si tiene problemas con alguna de las funciones del visor, le recomendamos probarlo con otro navegador (Firefox o  Chrome).');}
	var planoUrl,obraUrl,serverURL,auth;
	planoUrl='<?php echo $plano ?>'; //Pasaje del par�metro a JS para uso en buscarPlano()
	obraUrl='<?php echo $idobra ?>'; //Pasaje del par�metro a JS para uso en buscarObra()
	bookmarkUrl='<?php echo $bookmark ?>'; //Pasaje del par�metro a JS para uso en bookmarks()
	usuario='<?php echo ucfirst($_SESSION['nombre']); ?>';
	<?php if ($_SESSION['nombre']=='dipsoh'){ ?>
	auth='ZHBoOmhwZA==';
	//auth=null;
	<?php }else { ?>
	//auth='cHVibGljbzpwdWJsaWNv';
	auth=null;
	<?php } ?>
	serverURL='https://www.minfra.gba.gob.ar/sig_hidraulica'; //lo borro x q repite
	//alert(usuario);
	</script>

	<!-- utilizado para el ajax - deprecated-->
    <!--script type="text/javascript" src="./js/prototype.js"></script-->
	
	<script type="text/javascript" src="./js/intercept-requests.js?v=2"></script>
	
	<!-- Script and css resources for ExtJS-->
	<link rel="stylesheet" type="text/css" href="./css/ext-all.css"/>
	<link rel="stylesheet" type="text/css" href="./css/xtheme-gray-flat.css"/>
	<script type="text/javascript" src="./js/ext-base.js"></script>
	<script type="text/javascript" src="./js/ext-all.js"></script>
	
	<!-- Script and css resources jsts (buffer) - cargado con ajax en ext.onready
	<script type="text/javascript" src="./js/javascript.util.js"></script>
    <script type="text/javascript" src="./js/jsts.js"></script>
    <script type="text/javascript" src="./js/attache.array.min.js"></script> -->

	<!-- External lib: Google Maps >
	<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDb_Lb5J6UL8HC7Q9KFmK7PseG128ZQLhg&libraries=places"></script-->
	
	<!-- External lib: OpenLayers -->
	<script type="text/javascript" src="./js/OpenLayers.js"></script>
	<link rel="stylesheet" type="text/css" href="./css/style.css"/>
	
	<!-- External lib: Stamen Maps (cargar despues de openlayers y google) Reemplazada por mapbox high contrast>	
	<script type="text/javascript" src="http://maps.stamen.com/js/tile.stamen.js?v1.3.0"></script-->
	
	<!-- External lib: GeoExt 1.0 -->
	<script type="text/javascript" src="./js/GeoExt.js"></script>
	
	<!-- Lang y css resources for GXP.js (necesaria para las busquedas) -->
	<link rel="stylesheet" type="text/css" href="./ux/gxp/git/src/theme/all.css"/>
	<script type="text/javascript" src="./js/lang/gxp-es.js"></script>
	
	<!-- para convertir entre proyecciones-->
	<script type="text/javascript" src="./js/proj4js-compressed.js"></script>
	<script type="text/javascript" src="./js/proj4js_extra.js"></script>
	
	<!-- Lang and css resources for printpreview ux -->
	<script type="text/javascript" src="./js/lang/PrintPreview-es.js"></script>
	<link rel="stylesheet" type="text/css" href="./ux/printpreview/resources/css/printpreview.css" />

	<!-- Script, lang and css resources for geoext-viewer (heron) -->
	<link rel="stylesheet" type="text/css" href="./resources/css/default.css"/>
	<script type="text/javascript" src="./js/lang/es_ES.js"></script>
	<script type="text/javascript" src="./js/Heron-with-ux.js"></script>
	
	<!-- Lang y css para Editor -->
    <script type="text/javascript" src="./js/lang/editor-es.js"></script>
    <link rel="stylesheet" href="./ux/oleditor/ole/client/theme/geosilk/geosilk.css" type="text/css" />

	<!-- Script and css resources for context menu info/search with buffer
	<script type="text/javascript" src="./js/mod/SpatialSearchPanel_mod.js"></script>
	-->
	<script type="text/javascript" src="./js/mod/SearchByFeaturePanel_mod_buffer.js"></script>
	
	
	<script type="text/javascript" src="./js/mod/LayerNodeMenuItem_mod.js"></script> <!-- Mas info en context menu -->
	<!--script type="text/javascript" src="./js/mod/FeaturePanel_mod.js"></script--> <!-- buffer en info panel - cargado con ajax despues de jsts -->
	
	<!-- Script and css resources for streetview -->
	<!--script type="text/javascript" src="./js/GObec.streetview.src.js"></script-->
	
	<!-- Script and css resources for main app -->
	<link rel="stylesheet" type="text/css" href="./css/m-style.css"/>
	<?php if ($_SESSION['nombre']=='dipsoh'){ ?>
	<script type="text/javascript" src="toolbar.js"></script>
	<script type="text/javascript" src="layers.js"></script>
	<script type="text/javascript" src="Config.js"></script>
	<script type="text/javascript" src="Funciones.js"></script>
	<?php }elseif($_SESSION['nombre']=='lujan') { ?>
	<script type="text/javascript" src="toolbar_publico.js"></script>
	<script type="text/javascript" src="layers_lujan.js"></script>
	<script type="text/javascript" src="Config_lujan.js"></script>
	<script type="text/javascript" src="Funciones.js"></script>
	<?php }else { ?>
	<script type="text/javascript" src="toolbar_publico.js"></script>
	<script type="text/javascript" src="layers_publico.js"></script>
	<script type="text/javascript" src="Config_publico.js"></script>
	<script type="text/javascript" src="Funciones.js"></script>
	<?php } ?>

</head>
<body>
Validando sus datos: <?php echo ucfirst($_SESSION['nombre']); ?>
Cargando interfaz...
</body>

</html>
