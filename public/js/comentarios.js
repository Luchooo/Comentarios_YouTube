$(function()
{

     var nomServicios = [
                            {
                                servicio    :   "traer comentarios",
                                urlServicio :   "comentarios",
                                metodo      :   "GET"
                            }
                        ];

             var consumeServicios = function(tipo, val, callback)
            {
                var servicio = {
                                    url     : nomServicios[tipo - 1].urlServicio,
                                    metodo  : nomServicios[tipo - 1].metodo,
                                    datos   : ""
                                };
               
                
                servicio.datos = val !== "" ? JSON.stringify(val) : "";
                
                //Invocar el servicio...
                $.ajax(
                {
                    url         : servicio.url,
                    type        : servicio.metodo,
                    data        : servicio.datos,
                    dataType    : "json",
                    contentType: "application/json; charset=utf-8"
                }).done(function(data)
                {
                    callback(data);
                }).error(function(request, status, error)
                {
                    alert(request.responseText);
                    window.location = "/";
                });
            };

            var todos = [];
        consumeServicios(1, "", function(data)
        {
            todos = data;
            muestraTodos(1, 0);
        });
              
       

        //Para listar los trabajos...
    var muestraTodos = function (tipo, index)
    {
       var $txt = "";
        if(tipo === 1)
        {
            $txt = "<table width='100%' border='0' cellspacing='0' cellpadding='0' id = 'tableTodo'>";
            for(var veces = 1; veces <= 2; veces++)
            {
                for(var i = todos.length - 1; i >= 0; i--)
                {
                    if(veces === 1)
                    {
                        $txt += contenidoTabla(todos[i], 1);
                    }
                    else
                    {
                        contenidoTabla(todos[i], 2);
                    }
                }
                if(veces === 1)
                {
                    $txt += "</table>";
                    $("#todos").html($txt);
                }
            }
        }
        else
        {
            $('#tableTodo').prepend(contenidoTabla(todos[index], 1));
            $("#td_" + todos[index].id).hide().fadeIn('fast');
            contenidoTabla(todos[index], 2);
        }
    };

var contenidoTabla = function(data, type)
    {
        if(type === 1)
        {
            var fecha= data.fecha;
            fecha=fecha.slice(0,10)
            return "<div class='bubble'>"+(data.comentario)+" by "+(data.nombre)+" "+fecha+ "</div><br>";
        }
       
    };





    $("#comentario").focus().keypress(function(event)
    {
        if(event.keyCode === 13)
        {
            var comentario = $("#comentario").val();
            
            if(comentario !== "")
                {
                    swal("Comentario guardado:" + comentario);
                    $("#form").submit();
                    $("#comentarios").val("");
                  
                }
                            
                else
                {
                    swal("Escriba un comentario");
                       $("#form").submit(false);
                }

        };
    });

});

