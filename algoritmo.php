<?php
include "header.php";
?>
<div>
  <div class="container-fluid ">
    <h3  WIDTH="20" HEIGHT="20" class="text-center" style="margin: 20px">
     <b > Procesos algoritmo Robin Round </b>
     </h3>
  </div>


  <!-- esta es la tabla que se cargará-->

  <div class="container">

    <div class="container">

      <table id="listap" class="table table-bordered" WIDTH="50%"></table>

    </div>

    <div class="container  ">

      <form class="text-center">
        
        <div class="row text-center">
          <div class="">


          </div>
        </div>
      </form>
    </div>


    <div class="container text-center  ">
    <h3  WIDTH="20" HEIGHT="20" class="text-center" style="margin: 20px">
     <b > Quantum </b>
     </h3>
   

      <input id="valorQ" type="number" class="form-control" name="numeroprocesos" placeholder="numero" min="1" value="3" required>

      <hr>
      <a href="#simula"> <input id="btinicio" type="submit" value="Iniciar Simulacion" class="btn btn-primary btn-lg active" onclick="recibirQuantum(); roundRobin(); "> </input></a>

      <input disabled id="btpausa" type="button" value="Pausar Simulacion" class="btn btn-primary btn-lg active" onclick="pausar();"> </input>
      <input disabled id="btcontinuar" type="submit" value="Continuar simulacion" class="btn btn-primary btn-lg active" onclick="roundRobin();"> </input>
      <a href="#"> <input type="submit" value="Reiniciar simulacion" class="btn btn-primary btn-lg active" onclick="history.go(0)"> </input></a>
    </div>
    <div id="simula">
      <div id="contenedor container text-center" class="text-center">
        <hr>
        <h3>Proceso en ejecucion</h3>

        <div id="reloj"></div>

        <div id="contenedor_ejecucion">

          <div id="proceso"></div>

        </div>


        <div id="secciones">

          <h3>Listos</h3>
          <h3>Terminados</h3>
          <div class="columna" id="listos"></div>

          <div class="columna" id="terminados"></div>
        </div>
        <hr>
      </div>




      

      <div class="container">
        <h3 class="text-center">Archivos creados</h3>
        <div id="crear-archivos" class="row">

          <!--este es el div de dibujar los arhivos-->
        </div>

      </div>


      <div class="container text-center">

        <h3>Diagrama de Simulacion</h3>


        <canvas id="gant" width="1100" height="200"></canvas>

      </div>
    </div>
  </div>
  <div class="container text-center">
    <hr>
    <h2>Reporte Procesos Expulsivos</h2>
    <hr>
    <table id="reportexp" class="table table-bordered" WIDTH="50%"></table>
  </div>

  <div class="container text-center">
    <hr>
    <h2>Reporte Procesos No Expulsivos</h2>
    <hr>
    <table id="reportnoexp" class="table table-bordered" WIDTH="50%"></table>

  </div>



  <div class="container text-center">
    <hr>
    <h2>Grafica De procesos vs turnarround Expulsivos</h2>
    <hr>
    <div id="container" style="width:100%;">
      <canvas id="chart" width="1100" height="500"></canvas>
    </div>




  </div>
  
  <div class="container text-center">
    <hr>
    <h2>Grafica De procesos vs turnarround no Expulsivos</h2>
    <hr>
    <div id="container" style="width:100%;">
      <canvas id="chart2" width="1100" height="500"></canvas>
    </div>




  </div>

</div>



</body>


<footer>

</footer>




</html>