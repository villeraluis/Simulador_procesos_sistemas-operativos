/*------------------
	 COLA
-------------------*/
//constructor
function cola(){
	this.raiz = null;
	this.fondo = null;
	this.insertarPrimero = insertarNodoP;
	this.insertarUltimo = insertarNodoU;
	this.extraerPrimero = extraerNodoP;
	this.extraerUltimo = extraerNodoU;
	this.vacia = vacia;
}

//inserta un nodo en la cola de primero
function insertarNodoP(proceso,nombre, tiempo, quantum,tll, tf, tr,  pr,rar,ne,contenido){
	var nuevo = new nodo();
	nuevo.proceso = proceso;
	nuevo.nombre=nombre;
	nuevo.tiempo = tiempo;
	nuevo.quantum = quantum;
	nuevo.Tllegada=tll;
	nuevo.Tfinalizacion=tf;
	nuevo.Turnarround=tr;
	
	nuevo.prioridad=pr;
	nuevo.rafagareal=rar;
	nuevo.numEjecucion=ne;
	nuevo.contenido=contenido;
	nuevo.sig = null;
	
	nuevo.sig = null;

	if(this.vacia()){
		this.raiz = nuevo;
        this.fondo = nuevo;
	}else{
		this.raiz = nuevo;
		this.raiz.sig = this.fondo;
		this.fondo = this.raiz;
	}
}


//inserta un nodo en la cola de ultimo
function insertarNodoU(proceso,nombre, tiempo, quantum,tll, tf, tr,  pr,rar, ne,contenido){
	var nuevo = new nodo();
	var colaTemp = new cola();
	nuevo.proceso = proceso;
	nuevo.nombre=nombre;
	nuevo.tiempo = tiempo;
	nuevo.quantum = quantum;
	nuevo.Tllegada=tll;
	nuevo.Tfinalizacion=tf;
	nuevo.Turnarround=tr;
	nuevo.numEjecucion=ne;
	
	
	nuevo.prioridad=pr;
	nuevo.rafagareal=rar;
	nuevo.contenido=contenido;
	nuevo.sig = null;
	
	if(this.vacia()){
		this.raiz = nuevo;
        this.fondo = nuevo;
	}else{
		while(!this.vacia()){	
			var temp = new nodo();		
			temp = this.extraerPrimero();
			colaTemp.insertarPrimero(temp.proceso,temp.nombre, temp.tiempo, temp.quantum,temp.Tllegada,
				temp.Tfinalizacion,temp.Turnarround,temp.prioridad,temp.rafagareal,temp.numEjecucion,temp.contenido); 		
		}
		this.insertarPrimero(proceso,nombre, tiempo, quantum,tll, tf, tr,  pr,rar,ne,contenido);		
		while(!colaTemp.vacia()){
			var temp = new nodo();		
			temp = colaTemp.extraerPrimero();
			this.insertarPrimero(temp.proceso,temp.nombre, temp.tiempo, temp.quantum,temp.Tllegada,
				temp.Tfinalizacion,temp.Turnarround,temp.prioridad,temp.rafagareal,temp.numEjecucion,temp.contenido); 	
		}
	}
}

//retorna el primer nodo de la cola
function extraerNodoP(){
	var nuevo = this.raiz;
	if(!this.vacia()){
		this.raiz = this.raiz.sig;
		//window.alert(nuevo.nombre);
	}
	return nuevo;
	
}


//retorna el ultimo nodo de la cola
function extraerNodoU(){
	var nuevo = new nodo();
	var colaTemp = new cola();
	while(this.raiz.sig!=null){	
		var temp = new nodo();		
		temp = this.extraerPrimero();
		colaTemp.insertarPrimero(temp.proceso,temp.nombre, temp.tiempo, temp.quantum,temp.Tllegada,
			temp.Tfinalizacion,temp.Turnarround,temp.prioridad,temp.rafagareal,temp.numEjecucion,temp.contenido); 		
	}
	nuevo = this.extraerPrimero();		
	while(!colaTemp.vacia()){
		var temp = new nodo();		
		temp = colaTemp.extraerPrimero();
		this.insertarPrimero(temp.proceso,temp.nombre, temp.tiempo, temp.quantum,temp.Tllegada,
			temp.Tfinalizacion,temp.Turnarround,temp.prioridad,temp.rafagareal,temp.numEjecucion,temp.contenido); 	
	}
	return nuevo;
}


//devuelva true si la cola esta vacia
function vacia(){
	if (this.raiz == null) {
        return true;
    } else {
        return false;
    }
}