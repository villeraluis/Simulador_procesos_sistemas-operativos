<?php
include "header.php";
?>

<?php

$nombre_fichero = '/Xampp/htdocs/simulador/procesos.xml';
if (is_readable($nombre_fichero)) {
  

} else {
  ?>

<script> window.alert( 'no existe la ruta /Xampp/htdocs/simulador/procesos.xml, por lo tanto no se sobreescribirá el archivo procesos.xml. devera modificar la ruta donde se encuentra el proyecto en la linea 7, 306, 309 del documento index.php. colocarle la nueva direccion de alojamiento en su equipo ')</script>
    <?php
}

      

?>

<div>
  <form method="POST" action="index.php">
    <div class="container">
<hr>
      <div class="row justify-content-md-center">

        <div class="col-md-3 mb-3 text-center">
          <select name="filtro" class="form-control is-valid" id="time" onchange="this.form.submit()" >
          <option ><a >Selecione Por</a></option>
            <option value="1" type="submit" href="#"><a >Mayor CPU</a></option>
            <a href="#" type="submit"> <option value="2"  >Memoria </option></a>
          </select>
          <div class="valid-feedback">
          </div>
        </div>

        <div class="col-md-3 mb-3 text-center">
            <select name="sistema" class="form-control is-valid">
            <option value="1" selected>Windows</option>
            
          </select>
          <div class="valid-feedback">
          </div>
        </div>

        <div class="col-md-3 mb-3 text-center">

            <div class="input-group">
            <div class="input-group-prepend">
            
            <input type="number" class="form-control" name="numeroprocesos" min="1" placeholder="numero" value="5" required>
            

            </div>
          </div>

        </div>


        

    </div>


  </form>

</div>


</div>


<div class="container-fluid ">
  <h3 WIDTH="20" HEIGHT="20" class="text-center" style="margin: 20px">
    <b> Listado de procesos del sistema </b>
  </h3>
</div>

<!-- esta es la tabla que se cargará-->

<div class="container">
  <table class="table table-bordered" WIDTH="50%">
    <thead>

      <tr>
        <th>Nombre del proceso </th>
        <th>PID</th>
        <th>Nombre Usuario</th>
        <th>Descripcion</th>
        <th>Uso de memoria(K)</th>
        <th>Tiempo cpu</th>
        
        
       
      </tr>
    </thead>

    <tbody>

      <?php
      if (isset($_POST["numeroprocesos"])) {
        $nProc = $_POST["numeroprocesos"];
        $cpumemo=$_POST["filtro"];

        //$str = <<<EOF
        //"LIST"
        //EOF;

        // variable que trae datos desde el formulario de la pagina
        //////////////////////////////////////////
        //(((((((((((((((((((((((((aqui empieza la tarea de pedir datos al sistema)))))))))))))))))))))))))
        $cont = 0; //variable para iteracion
        $cmd =  ("tasklist /v"); //comando que se enviara al sistema 
        exec($cmd, $output); //funcion para ejecutar tareas externas..
        ///creamos la raiz del xml/////////////////////
        $doc = new DOMDocument('1.0');
        $doc->formatOutput = true;
        $raiz = $doc->createElement("TODOS");
        $raiz = $doc->appendChild($raiz);
        ///////////////////////////////////////////////////////
        $arreglo = array();
        foreach ($output as $line) {  // ///////ciclo para poder mostrar los datos de los procesos 

          if ($cont > 3) {

            //echo substr($line,25,16 );
            $res =  ltrim(rtrim(substr($line, 0, 25)));
            $res1 = ltrim(rtrim(substr($line, 25, 10)));
            $res2 = ltrim(rtrim(substr($line, 35, 26)));
            $res3 = ltrim(rtrim(substr($line, 51, 12)));
            $res4 = ltrim(rtrim(substr($line, 64, 12)),"KB");
            $res5 = ltrim(rtrim(substr($line, 77, 16)));
            $res6 = ltrim(rtrim(substr($line, 90, 50)));
            $res7 = (ltrim(rtrim(substr($line, 140, 17))));
            $res8 = ltrim(rtrim(substr($line, 157, 178)));
           // echo "la varia ble es = ".$res4;
           // $res4=substr($res4,0,8);
           // echo "la varia ble es = ".$res4;

            $arreglo[] = array(

              
                'nombre' => $res,
                'pid' => $res1,
                "sesionnom" => $res2,
                "sesionnum" => $res3,
                "memoria" => $res4,
                "estado" => $res5,
                "usuarionom" => $res6,
                "cpu" => $res7,
                "ventana" => $res8,

              

            );
          }
          $cont++;
        }

        /////////((((((((((la siguiente funcion ordena por uso mayor tiempo de uso de la cpu))))))))))
      
         
               
          

      //  var_dump($arreglo);     

    if($cpumemo =="1"){
      uasort($arreglo, function ($a, $b) {
        if ($a['cpu'] == $b['cpu']) {
            return 0;
        }
        return ($a['cpu'] > $b['cpu']) ? -1 : 1;
    });  
  }
  else{
    uasort($arreglo, function ($a, $b) {
      if ($a['memoria'] == $b['memoria']) {
          return 0;
      }
      return ($a['memoria'] > $b['memoria']) ? -1 : 1;
  });  

  }
          $cont=0;
        foreach ($arreglo as $line) {  // ///////ciclo para poder mostrar los datos de los procesos 
         
          if ($cont > 0 && $cont <= $nProc) {
            //echo substr($line,25,16 );
            $res =  $line["nombre"];
            $res1 = $line["pid"];
            $res2 = $line["sesionnom"];
            $res3 = $line["sesionnum"];
            $res4 = $line["memoria"];
            $res5 = $line["estado"];
            $res6 = $line["usuarionom"];
            $res7 = $line["cpu"];
            $res8 = $line["ventana"];




            //echo $res;
            ///////////////aqui se generan los nodos del archivo xml
            $proceso = $doc->createElement("proceso");
            $proceso = $raiz->appendChild($proceso);

            $nombre = $doc->createElement("nombre");
            $nombre = $proceso->appendChild($nombre);
            $textnombre = $doc->createTextNode(rtrim($res));
            $textnombre = $nombre->appendChild($textnombre);

            $pid = $doc->createElement("pid");
            $pid = $proceso->appendChild($pid);
            $textpid = $doc->createTextNode(ltrim(rtrim($res1)));
            $textpid = $pid->appendChild($textpid);


            $nombreses = $doc->createElement("nombreses");
            $nombreses = $proceso->appendChild($nombreses);
            $textnombreses = $doc->createTextNode(ltrim(rtrim($res2)));
            $textnombreses = $nombreses->appendChild($textnombreses);

            $numses = $doc->createElement("numeroses");
            $numses = $proceso->appendChild($numses);
            $textpriori = $doc->createTextNode(ltrim(rtrim($res3)));
            $textpriori = $numses->appendChild($textpriori);

            $memoria = $doc->createElement("Cmemoria");
            $memoria = $proceso->appendChild($memoria);
            $textmemoria = $doc->createTextNode(ltrim(rtrim($res4)));
            $textmemoria = $memoria->appendChild($textmemoria);

            $estadoproc = $doc->createElement("estadoproc");
            $estadoproc = $proceso->appendChild($estadoproc);
            $textdescr = $doc->createTextNode(ltrim(rtrim($res5)));
            $textdescr = $estadoproc->appendChild($textdescr);


            $usuario = $doc->createElement("usuario");
            $usuario = $proceso->appendChild($usuario);
            $textdescr = $doc->createTextNode(ltrim(rtrim($res6)));
            $textdescr = $usuario->appendChild($textdescr);

            $tiempocpu = $doc->createElement("tiempocpu");
            $tiempocpu = $proceso->appendChild($tiempocpu);
            $textdescr = $doc->createTextNode(ltrim(rtrim($res7)));
            $textdescr = $tiempocpu->appendChild($textdescr);

            $titulovent = $doc->createElement("titulovent");
            $titulovent = $proceso->appendChild($titulovent);
            $textdescr = $doc->createTextNode(ltrim(rtrim($res8)));
            $textdescr = $titulovent->appendChild($textdescr);

           

            $prioridad=0;
            if ($res6 == "N/D" || $res6 == "NT AUTHORITY\SYSTEM"){

              $prioridad=1;
            }


            $tprioridad= $doc->createElement("prioridad");
            $tprioridad= $proceso->appendChild($tprioridad);
            $textprioridad = $doc->createTextNode(ltrim(rtrim($prioridad)));
            $textprioridad = $tprioridad->appendChild($textprioridad);
             

            ////////////////FINAL DE LOS NODOS

            // echo 'Escrito: ' . $doc->saveXML() . "fin";



      ?>

            <tr>
              <td><?php echo $res . '<br>'; ?></td>
              <td><?php echo $res1 . '<br>'; ?></td>
              <td><?php echo $res6 . '<br>'; ?></td>
              <td><?php echo $res . '<br>'; ?></td>
              <td><?php echo $res4 . '<br>'; ?></td>
              <td><?php echo $res7 . '<br>'; ?></td>
             
            </tr>

        <?php
          }
          $cont++;
        } ?>
    </tbody>
  </table>
</div>




<?php

$nombre_fichero = '/Xampp/htdocs/simulador/procesos.xml';
if (is_readable($nombre_fichero)) {
  
  echo 'Escrito: ' . $doc->save("/Xampp/htdocs/simulador/procesos.xml") . 'bytes <br><br>';
  
} else {
  ?>

<script> window.alert( 'no existe la ruta /Xampp/htdocs/simulador/procesos.xml donde se pueda guardar el archivo por devera modificar la ruta donde se encuentra el proyecto')</script>
    <?php
}

      
}
?>




</body>


<footer>
  

  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery.min.js"></script>
</footer>



</html>