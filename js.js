var x = {

	file: 'data.json',
	ancho_li: 0,
	ancho_contenedor: 0,
	cantidad_li: 0,
	ancho_total: 0,
	avance: 100,

    iniciar: function(){
        x.loadJSONFile(function(response) {
        	if (x.isJSON(response)) {
        		var actual_JSON = JSON.parse(response);
				console.log(actual_JSON);
				x.createHTML(actual_JSON);
				x.ancho_li = $("#contenedor-timeline li").outerWidth();
			    x.ancho_contenedor = $("#contenedor-timeline").width();
			    x.cantidad_li = $("#contenedor-timeline li").length;
			 	x.ancho_total = x.ancho_li * x.cantidad_li;
        	}
		});
	    $(".arrow_next").click(x.boton_next);
	    $(".arrow_prev").click(x.boton_prev);
    },

    createHTML: function(JSON) {
    	for (var i = 0; i < JSON.length; i++) {    		
    		var li = DOMhtml.li(JSON[i]['color']);
    		var titulo = DOMhtml.h3(JSON[i]['categoria']);
    		li.appendChild(titulo);
    		var mes = DOMhtml.h4(JSON[i]['mes']);
    		li.appendChild(mes);
    		var parrafo = DOMhtml.p(JSON[i]['descripcion']);
    		li.appendChild(parrafo);
    		var div_icono = DOMhtml.div("", "icon", "");
    		var icono = DOMhtml.icon(JSON[i]['icono']);
    		div_icono.appendChild(icono);
    		li.appendChild(div_icono);
    		var linea_vertical = DOMhtml.div("", "line_vertical", "");
    		li.appendChild(linea_vertical);
    		var tiempo = DOMhtml.time(JSON[i]['año']);
    		li.appendChild(tiempo);
    		$("#contenedor-timeline").append(li);
    	}
    },

    boton_next: function(){
    	var pos = $( "#contenedor-timeline" ).position();
    	var ancho = x.ancho_contenedor - (x.ancho_total + x.avance);
    	if(pos.left > ancho) {
    		var nueva_posicion = pos.left - x.avance;
	    	$( "#contenedor-timeline" ).css( "left", nueva_posicion+"px" );
    	}
	},

	boton_prev: function(){
    	var pos = $( "#contenedor-timeline" ).position();
    	if(pos.left < 0) {
	    	var nueva_posicion = pos.left + x.avance;
	    	$( "#contenedor-timeline" ).css( "left", nueva_posicion+"px" );
    	}
	    	
    },

    isJSON: function(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    loadJSONFile: function(callback) {
	    var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	    xobj.open('GET', x.file, true);
	    xobj.onload = function(e) {
		    if (xobj.status == 200) {
          	  callback(xobj.response);
		    } else {
		      console.log("Error " + xobj.status + " impossible to read file "+x.file+".<br \/>");
		    }
  		};
	    xobj.send(null);
	},

}

var DOMhtml = {

    div: function(contenido, clase, id){
        var nuevoDIV = document.createElement("div");
        nuevoDIV.setAttribute("class", clase);
        nuevoDIV.setAttribute("id", id);
        var t = document.createTextNode(contenido);
        nuevoDIV.appendChild(t);
        return nuevoDIV;
    },

    icon: function(icono){
        var nuevoICON = document.createElement("i");
        nuevoICON.setAttribute("class", "fa "+icono );
        nuevoICON.setAttribute("aria-hidden", "true");
        return nuevoICON;
    },

    time: function(contenido){
        var nuevoTIME = document.createElement("time");
        var t = document.createTextNode(contenido);
        nuevoTIME.appendChild(t);
        return nuevoTIME;
    },

    h3: function(contenido){
        var nuevoH3 = document.createElement("h3");
        var t = document.createTextNode(contenido);
        nuevoH3.appendChild(t);
        return nuevoH3;
    },

    h4: function(contenido){
        var nuevoH4 = document.createElement("h4");
        var t = document.createTextNode(contenido);
        nuevoH4.appendChild(t);
        return nuevoH4;
    },

    p: function(contenido){
        var nuevoP = document.createElement("p");
        var t = document.createTextNode(contenido);
        nuevoP.appendChild(t);
        return nuevoP;
    },

    ol: function(li){
        var nuevoOL = document.createElement("ol");
        nuevoOL.setAttribute("id", "contenedor-timeline");
        nuevoOL.appendChild(li);
        return nuevoOL;
    },

    li: function(color){
        var nuevoLI = document.createElement("li");
        nuevoLI.setAttribute("class", color);
        return nuevoLI;
    },
    

};


$(document).ready(function(){
    x.iniciar(); 
});