//variables gloabales
var listos, terminados, nProcesos, bloqueado, nombrepro,
	cQuan, hilo, Tllegada, Tfinalizacion, Turnarround, tilleg,
	gant, canvas, ctx, rafag, prioridad, temp, colaestable, thilo, 
	numEjecucion, contenido, clock, nAtendidos,nodorobin,
	paso1,paso2,copiados, mcontenido,idPro;

//main de la aplicación



$(document).ready(function () {
    
	numEjecucion = 1;
	paso1 = true;
	paso2 = true;
	Tllegada = 0;
	clock = 0;
	nAtendidos = 0;
	Tfinalizacion = 0;
	Turnarround = 0;
	prioridad = 0;
	cQuan = 0;
	thilo = 1000;
	canvas = document.getElementById("gant");
	ctx = canvas.getContext("2d");
	bloqueado = false;
	abrirXml();

});


///secuencia de ejecucion tardia principal///////

function secuencia() {

	$("#gant").attr("height", 25 * nProcesos);
	$("#contenedor").height(100 + (nProcesos * 32));
	$("#contenedor2").height(100 + (nProcesos * 25));
	$(".columna").height(20 + (nProcesos * 25));
	listos = new cola();
	terminados = new cola();
	temp = new cola();
	colaestable = new cola();
	cuadroGant();
	copiados = new Array;
	mcontenido = new Array;


};


///con esta funcion gargo los d<tos del xml a la pagina las dos funciones siguientes permiten
//acceso a los datos en xml yllena la tabla para visualizar lo datos de los procesos

function abrirXml() {

	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			llenarDatostabla2Principal(this);
		}
	};
	xhr.open("GET", "procesos.xml", true);
	xhr.send();

}
//)((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))

function llenarDatostabla2Principal(xml) {

	var docXML = xml.responseXML;
	var tabla2 = "<tr><th>Numero </th><th>Nombre del proceso </th><th>tiempo de llegada</th><th>Rafaga</th></tr>";
	var pocesosg = docXML.getElementsByTagName("proceso");
	var cont = 0;
	var raf = "";
	var nom = "";
	nombrepro = new Array;
	rafag = new Array;
	tilleg = new Array;
	idPro=new Array;
	prioridad = new Array;
	for (var i = 0; i < pocesosg.length; i++) {
		tabla2 += "<tr><td>";
		tabla2 += i + 1;
		tabla2 += "</td><td>";
		nom = pocesosg[i].getElementsByTagName("nombre")[0].textContent;
		tabla2 += nom;
		nombrepro[i] = nom;
		tabla2 += "</td><td>";
		tabla2 += i;
		tilleg[i] = i;
		tabla2 += "</td><td>";
		raf = pocesosg[i].getElementsByTagName("nombre")[0].textContent;
		prioridad[i] = pocesosg[i].getElementsByTagName("prioridad")[0].textContent;
		tabla2 += raf.length;
		cont = i + 1;
		rafag[i] = raf.length;
		idPro[i]=pocesosg[i].getElementsByTagName("pid")[0].textContent;
		//window.alert (rafag[i]);

	}
	document.getElementById("listap").innerHTML = tabla2;
	nProcesos = cont;//se captura el NUMERO DE PROCESOS y se envia a n procesos .. es util para crear los campos dinanicos
	secuencia();
}




///// crea el cuadrado donde se reprodicira el diagrama con los campos requeridos

function cuadroGant() {
	gant = new Array(nProcesos);
	for (i = 0; i < nProcesos; i++) {
		gant[i] = [];
		for (j = 0; j < nProcesos; j++) {
			gant[i].push(i);
		}
	}
	console.log(gant);
}


//crea la cola colaestable  con datos del xml 
function crearCola(procesos) {
	contenido = new Array;
	for (i = 0; i < procesos; i++) {


		var id = [i + 1];//se llama proceso en el nodo
		var nombre = nombrepro[i];//recoge los valores del arreglo nombrepro creado antes al leer el xml
		var tiempo = rafag[i];//recoge los valores del arreglo rafag creado antes al leer el xml
		var raf = rafag[i];//obtine los valores del vector ragag
		var quantum = cQuan; // ya esta definida de manera global
		var tll = tilleg[i];//recoge los valores del arreglo tilleg creado antes al leer el xml
		var tf = Tfinalizacion;//se envia en 0
		var tr = Turnarround;//se envia en 0
		var pr = prioridad[i];//recoge los valores del arreglo tilleg creado antes al leer el xml
		var ne = numEjecucion;
        var prId=idPro[i];
		contenido = Array.from(nombre);
		mcontenido.push([i, contenido,nombre,prId]);
		copiados.push([i]);

		colaestable.insertarUltimo(id, nombre, tiempo, quantum, tll, tf, tr, pr, raf, ne, prId);
	}

}

function colaLlegada() {

	var nodo2;
	if (listos.vacia()) {
		nodo2 = colaestable.extraerPrimero();
		listos.insertarUltimo(nodo2.proceso, nodo2.nombre, nodo2.tiempo,
			nodo2.quantum, nodo2.Tllegada, nodo2.Tfinalizacion, nodo2.Turnarround,
			nodo2.prioridad, nodo2.rafagareal, nodo2.numEjecucion, nodo2.contenido);
		crearArchivo(nodo2.nombre, nodo2.proceso,nodo2.contenido);


	}


	hilo2 = setInterval(function () {//El método setInterval () llama a una función o evalúa una expresión a intervalos específicos (en milisegundos).

		if (!colaestable.vacia()) {
			nodo2 = colaestable.extraerPrimero();
			listos.insertarUltimo(nodo2.proceso, nodo2.nombre, nodo2.tiempo,
				nodo2.quantum, nodo2.Tllegada, nodo2.Tfinalizacion, nodo2.Turnarround,
				nodo2.prioridad, nodo2.rafagareal, nodo2.numEjecucion, nodo2.contenido);
			crearArchivo(nodo2.nombre, nodo2.proceso,nodo2.contenido);
			dibujarCola(0);
			//window.alert("se inserto un noodo");	
		} else {

			clearInterval(hilo2);
		}
	}, thilo+100);

	dibujarCola(0);
}

///algoritmo (((((((((((((((((((())))))))))))))))))))
//((((((((((((((((((((((((((((((((((8))))))))))))))))))))))))))))))))))
//((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))
function roundRobin() {

	if (clock == 0) {
		crearCola(nProcesos);
		//llena la cola y la dibuja en listos
	}

	colaLlegada();

	hilo = setInterval(function () {//El método setInterval () llama a una función o evalúa una expresión a intervalos específicos (en milisegundos).
		$("#reloj").html("Tiempo total de simulacion: " + clock + " segundos");
		clock = Math.floor((clock + 1) * 10) / 10;





		if (paso1) {
			if (!listos.vacia()) {
				nodorobin = listos.extraerPrimero();
				dibujarCola(0);
				dibujarProceso(nodorobin);
				paso1 = false;
				paso2 = true;
			}
		}



		if (paso2) {
			

			if (nodorobin.tiempo > 0 ) {
               if(nodorobin.prioridad==1){
				if (nodorobin.quantum>0 ) { // en este if el quantum sera mayor que cero y el procedo estara e ejecucion
					//esto se hace en ejecucion
					nodorobin.quantum = Math.round((nodorobin.tiempo- 1) * 10) / 10;
					nodorobin.tiempo = Math.round((nodorobin.tiempo - 1) * 10) / 10;
					dibujarProceso(nodorobin);
					dibujarGant(nodorobin.proceso - 1);
					mConte(nodorobin.proceso - 1);
	
				} else {//si el quantum llega a 0 y la rafaga no se agota el proceso vuelve a listos..
					//window.alert();
					nodorobin.quantum = cQuan;
					nodorobin.numEjecucion = nodorobin.numEjecucion + 1;
					listos.insertarUltimo(nodorobin.proceso, nodorobin.nombre, nodorobin.tiempo,
						nodorobin.quantum, nodorobin.Tllegada, nodorobin.Tfinalizacion,
						nodorobin.Turnarround, nodorobin.prioridad, nodorobin.rafagareal, nodorobin.numEjecucion, nodorobin.contenido);
					dibujarProceso(null);
					dibujarCola(0);
					paso2 = false;
					paso1 = true;
	
	
				}}
				
				if(nodorobin.prioridad==0){

				if (nodorobin.quantum > 0  ) { // en este if el quantum sera mayor que cero y el procedo estara e ejecucion
					//esto se hace en ejecucion
					nodorobin.quantum = Math.round((nodorobin.quantum - 1) * 10) / 10;
					nodorobin.tiempo = Math.round((nodorobin.tiempo - 1) * 10) / 10;
					dibujarProceso(nodorobin);
					dibujarGant(nodorobin.proceso - 1);
					mConte(nodorobin.proceso - 1);

				} else {//si el quantum llega a 0 y la rafaga no se agota el proceso vuelve a listos..
					//window.alert();
					nodorobin.quantum = cQuan;
					nodorobin.numEjecucion = nodorobin.numEjecucion + 1;
					listos.insertarUltimo(nodorobin.proceso, nodorobin.nombre, nodorobin.tiempo,
						nodorobin.quantum, nodorobin.Tllegada, nodorobin.Tfinalizacion,
						nodorobin.Turnarround, nodorobin.prioridad, nodorobin.rafagareal, nodorobin.numEjecucion, nodorobin.contenido);
					dibujarProceso(null);
					dibujarCola(0);
					paso2 = false;
					paso1 = true;


				}}

			} else {/// si la rafaga llega a 0 el proceso se pasra a terminados..
				//window.alert();

				nodorobin.Tfinalizacion = clock-1;
				nodorobin.Turnarround = Math.round(((clock -1)- nodorobin.Tllegada) * 10) / 10;
				terminados.insertarUltimo(nodorobin.proceso, nodorobin.nombre, nodorobin.tiempo,
					nodorobin.quantum, nodorobin.Tllegada, nodorobin.Tfinalizacion,
					nodorobin.Turnarround, nodorobin.prioridad, nodorobin.rafagareal, nodorobin.numEjecucion, nodorobin.contenido);
				dibujarProceso(null);
				dibujarCola(1);
				paso2 = false;
				paso1 = true;
				nAtendidos++;
			}
		}

		if (nAtendidos == nProcesos) {
			$("#mensaje").html("Todos los procesos se han atendido exitosamente!");
			clearInterval(hilo);
			llenarDatostabla2Reporteexpulsivos();
			llenarDatostablaReportenoexpulsivos();
			grafica();
			grafica2();
			document.getElementById('btpausa').disabled = true;
		}
	}, thilo);//<---LA VELOCIDAD DEL HILO ESTA DADA EN MS


	document.getElementById('btinicio').disabled = true;
	document.getElementById('btcontinuar').disabled = true;
	document.getElementById('btpausa').disabled = false;
}


//((((((((((((((((((((((((((()))))))))))))))))))))))))))
//((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))

//funcion para el boton pausar
function pausar() {
	document.getElementById('btpausa').disabled = true;
	document.getElementById('btcontinuar').disabled = false;

	clearInterval(hilo);
	clearInterval(hilo2);

};



/// dibuja los procesos que termina su quamtun
function dibujarCola(i) {
	var text = "";
	var textoCola = "";
	var F = function () { };
	var nodo;
	switch (i) {
		case 0: textoCola = "#listos"; F.prototype = listos; break;
		case 1: textoCola = "#terminados"; F.prototype = terminados; break;
	}
	var cola = new F();
	text += "<ul class='lista'>";
	while (!cola.vacia()) {
		nodo = cola.extraerPrimero();
		text += "<li><p> " + nodo.nombre + "</p></li>";
	}
	text += "</ul>";
	$(textoCola).html(text);
}



////esta  funcion dibuja todo las letras que se muesttran en la pantalla de la ejecucion
function dibujarProceso(nodo) {
	var text = "";
	if (nodo != null) {
		text += "<p>proceso " + nodo.nombre + "</p>";
		text += "<p># veces ejecutado : " + nodo.numEjecucion + "</p>";
		text += "<p>Total Rafaga Restante:" + nodo.tiempo + "</p>";
		text += "<p>  Quantum restante " + nodo.quantum + "</p>";
		$("#proceso").animate({ opacity: '1' }, 0);

	} else {
		$("#proceso").animate({ opacity: '0' }, 400);
	}
	$("#proceso").html(text);
}



/// funcion para dibujar el digrama 
function dibujarGant(n) {
	ctx.fillStyle = "rgb(17, 17, 17)";
	ctx.font = "20px Arial";
	for (i = 0; i < nProcesos; i++) {
		if (i == n) {
			gant[i].push(1); //agrega  1 al arreglo 			
		} else {
			gant[i].push(0);
		}
		ctx.fillText("proceso " + (i + 1), 10, 22 * (i + 1)); //escribe el nombre del proceso
	}

	for (i = 0; i < nProcesos; i++) {
		var ultimo = gant[i].length - 1;
		if (gant[i][ultimo] == 1) {
			ctx.fillRect(90 + Math.round((gant[i].length) / (nProcesos * 0.05)), 5 + (22 * i), 3, 20); //dibuja rectangulo
		}
	}
}


////metodo de reportes
function llenarDatostabla2Reporteexpulsivos() {
	if (!terminados.vacia()) {
		var nodo;
		//var temp=new cola;
		var i = 0;
		var tabla2 = "<tr><th>Nombre</th><th>Tiempo de llegada</th><th>Rafaga</th><th>Prioridad Asignada</th><th>Turnarround</th><th>Tiempo Finalizacion</th></tr>";
		while (!terminados.vacia()) {
			nodo = terminados.extraerPrimero();
			temp.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum,
				nodo.Tllegada, nodo.Tfinalizacion,
				nodo.Turnarround, nodo.prioridad, nodo.rafagareal, nodo.numEjecucion, nodo.contenido);
			if (nodo.prioridad == 0) {
				tabla2 += "<tr><td>";
				tabla2 += nodo.nombre;
				tabla2 += "</td><td>";
				tabla2 += nodo.Tllegada;
				tabla2 += "</td><td>";
				tabla2 += nodo.rafagareal;
				tabla2 += "</td><td>";
				tabla2 += nodo.prioridad;
				tabla2 += "</td><td>";
				tabla2 += nodo.Turnarround;
				tabla2 += "</td><td>";
				tabla2 += nodo.Tfinalizacion;
			}
		}
		document.getElementById("reportexp").innerHTML = tabla2;
	}
}

/////////////////////////////////////
///////////////////////////////////7

function llenarDatostablaReportenoexpulsivos() {
	if (!temp.vacia()) {
		var nodo;
		var i = 0;
		var tabla3 = "<tr><th>Nombre</th><th>Tiempo de llegada</th><th>Rafaga</th><th>Prioridad Asignada</th><th>Turnarround</th><th>Tiempo Finalizacion</th></tr>";

		while (!temp.vacia()) {
			nodo = temp.extraerPrimero();
			terminados.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum,
				nodo.Tllegada, nodo.Tfinalizacion, nodo.Turnarround, nodo.prioridad, nodo.rafagareal, nodo.numEjecucion, nodo.contenido);
			if (nodo.prioridad == 1) {
				tabla3 += "<tr><td>";
				tabla3 += nodo.nombre;
				tabla3 += "</td><td>";
				tabla3 += nodo.Tllegada;
				tabla3 += "</td><td>";
				tabla3 += nodo.rafagareal;
				tabla3 += "</td><td>";
				tabla3 += nodo.prioridad;
				tabla3 += "</td><td>";
				tabla3 += nodo.Turnarround;
				tabla3 += "</td><td>";
				tabla3 += nodo.Tfinalizacion;
			}
		}
		document.getElementById("reportnoexp").innerHTML = tabla3;
	}
}

////////////////////////
/////////////////
//////////////////////
function grafica() {

	var nodo;
	var i = 0;
	var nombre = [];
	var turn = [];

	if (!terminados.vacia()) {
		while (!terminados.vacia()) {
			nodo = terminados.extraerPrimero();
			temp.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum,
				nodo.Tllegada, nodo.Tfinalizacion,
				nodo.Turnarround, nodo.prioridad, nodo.rafagareal, nodo.numEjecucion, nodo.contenido);
				if(nodo.prioridad==0){
			nombre.push(nodo.nombre);
			turn.push(nodo.Turnarround);}
			i++;
		}
	}
	var datos = {
		type: "line",
		data: {
			datasets: [{
				label: "Turnarround",
				data: turn,
				borderColor: "#3e95cd",
				fill: false

			}],
			labels: nombre
		},
		options: {
			responsive: true,
		}
	};
	var canvas = document.getElementById('chart').getContext('2d');
	window.pie = new Chart(canvas, datos);
	window.pie.update();
}

///////////////////////////////////

function grafica2() {

	var nodo;
	var i = 0;
	var nombre = [];
	var turn = [];

	if (!temp.vacia()) {
		while (!temp.vacia()) {
			nodo = temp.extraerPrimero();
			terminados.insertarUltimo(nodo.proceso, nodo.nombre, nodo.tiempo, nodo.quantum,
				nodo.Tllegada, nodo.Tfinalizacion,
				nodo.Turnarround, nodo.prioridad, nodo.rafagareal, nodo.numEjecucion, nodo.contenido);
				if(nodo.prioridad==1){
			nombre.push(nodo.nombre);
			turn.push(nodo.Turnarround);}
			i++;
		}
	}
	var datos = {
		type: "line",
		data: {
			datasets: [{
				label: "Turnarround",
				data: turn,
				borderColor: "#3e95cd",
				fill: false

			}],
			labels: nombre
		},
		options: {
			responsive: true,
		}
	};
	var canvas = document.getElementById('chart2').getContext('2d');
	window.pie = new Chart(canvas, datos);
	window.pie.update();
}


function recibirQuantum() {
	var valor = document.getElementById("valorQ").value;
	cQuan = valor;
}



//////////////////////
// funciones para manejar elcontenido que tendra el archivo de contenido/////

function crearArchivo(nombre, pid,conte) {
	const cArchivo = document.getElementById('crear-archivos');
	const element = document.createElement('div');
	element.innerHTML = `
			
	<div class="col">
	

		<hr>
		
					<a  onclick="crearPop(${pid})" width="100" height="100" name="archivos">  ${conte}  ${nombre} 
					<hr>
					<img 	alt="imagen html de ejemplo" src="carpeta.jpg" width="120" height="75" 
					style=" cursor:pointer" />
					</a>
	</div>
		`;
	cArchivo.appendChild(element);
}


////////////////////captura datos del contenido del proceso..un arregol con las literales en cada posiscion

function mConte(idp) {
	var pos = 0;
	if (mcontenido[idp][0] == idp) {
		//	window.alert(mcontenido[idp][0]);

		pos = (mcontenido[idp][1].length) - 1
		if (copiados[idp][1] == null) {
			copiados[idp][1] = mcontenido[idp][1][pos];
			mcontenido[idp][1].splice(pos, 1);

		} else {
			var cop = copiados[idp][1];
			var ult = mcontenido[idp][1][pos];
			copiados[idp][1] = ult + cop;
			mcontenido[idp][1].splice(pos, 1);
		}
	}
}




/////////////maneja la ventana emergente pop up

function crearPop(id) {
	document.getElementById("popup").style.display = "block";
	document.getElementById('popup').innerHTML =
		`
	 	    <div id="conten">
	     
		  <h4id="txt">${copiados[id - 1][1]}</h4>
		  <a onclick="cerrar()" href="#popup"> <img src="close.png" class="cerrar" id="cerrar"></a>
		  <div class="btn-descargar">
		  <a  href="javascript:guardarTxt('${copiados[id - 1][1]}','${mcontenido[id - 1][2]}','${mcontenido[id - 1][3]}');" id="link" > Descargar txt</a>
			
		`;

}



function cerrar() {
	document.getElementById("popup").style.display = "none";
}

/////////7esta funcion guarda los datos en en pc
function guardarTxt(nombre, nom,pid) {

	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	var blob = new File([nombre], pid+'_'+nom + ".txt");
	url = window.URL.createObjectURL(blob);
	a.href = url;
	a.download = blob.name;
	a.click();
	window.URL.revokeObjectURL(url);
	document.getElementById("popup").style.display = "none";
}


///////////////

