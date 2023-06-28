function calcularInversion() {
    var calcularBtn = document.querySelector('.calcular-btn');
    var resultado = document.getElementById("resultado");
  
    calcularBtn.addEventListener('click', function() {
      var nombre = document.getElementById("nombre").value;
      var monto = parseFloat(document.getElementById("monto").value);
      var dias = parseInt(document.getElementById("dias").value);
      var reinvertir = document.getElementById("reinvertir").checked;
  
      // Validar datos ingresados
      resultado.innerHTML = "";
      if (nombre === "") {
        resultado.innerHTML = "Por favor, ingresa tu nombre y apellido.";
        return;
      }
      if (isNaN(monto) || monto < 1000) {
        resultado.innerHTML = "El monto a invertir debe ser un número mayor o igual a $1000.";
        return;
      }
      if (isNaN(dias) || dias < 30) {
        resultado.innerHTML = "La cantidad de días debe ser un número mayor o igual a 30.";
        return;
      }
      
      // Calcular inversion
      var porcentaje;
  
      if (dias >= 30 && dias <= 60) {
        porcentaje = 40;
      } else if (dias >= 61 && dias <= 120) {
        porcentaje = 45;
      } else if (dias >= 121 && dias <= 360) {
        porcentaje = 50;
      } else {
        porcentaje = 65;
      }
  
      var montoFinal = monto + (monto * dias / 360 * porcentaje / 100);
      
      // Calcular y mostrar el resultado de reinversion
      if (reinvertir) {
        var tablaHTML = "<table class='tabla-reinversion'><th>Tabla de reinversión</th>";
        tablaHTML += "<table class='tabla-reinversion'><tr><th>Período</th><th>Monto Inicial</th><th>Monto Final</th></tr>";
        var periodo = 1;
        var montoInicial = parseFloat(monto);
  
        while (periodo <= 4) {
          var montoFinalReinvertir = montoInicial + (montoInicial * dias / 360 * porcentaje / 100);
          tablaHTML += "<tr><td>" + periodo + "</td><td>$" + montoInicial.toFixed(2) + "</td><td>$" + montoFinalReinvertir.toFixed(2) + "</td></tr>";
          montoInicial = montoFinalReinvertir;
          periodo++;
        }
  
        tablaHTML += "</table>";
        resultado.innerHTML += tablaHTML;
      }
  
      // Mostrar el resultado de inversion
      var tablaResultado = document.getElementById("tablaResultado");
      var fila = tablaResultado.insertRow();
      var celdaMontoFinal = fila.insertCell();
  
      celdaMontoFinal.innerHTML = montoFinal.toFixed(2);
    });
  }