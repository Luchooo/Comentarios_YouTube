"use strict";
var bcrypt          = 	require('bcrypt-nodejs'),
    passport 	    = 	require('passport'),
    db   		    = 	require('./database'),
    titulo          =   "Vídeo Comentarios",
	date 			= 	new Date(),
	fechaActual 	= 	(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(),
    fechaComentario = 	date.getFullYear()+ '/' + (date.getMonth() + 1) + '/' + date.getDate();
    db.conectaDatabase();



var index = function(req, res)
{
	if(!req.isAuthenticated())
    {
        res.redirect('/login');
    }
    else
    {
        var user = req.user;
		res.render("vistaVideo", {
			usuario	:	titulo + " - " + user[0].nombre
		});
    }
};

var login = function(req, res)
{
    res.render("login", {
		titulo 	:  	titulo
	});
};


var comentarios =  function(req, res)
{

	var sql = `SELECT users.nombre, usuarioxvideo.comentario, usuarioxvideo.fecha
					FROM usuarioxvideo
					INNER JOIN users
					ON usuarioxvideo.id_usuario= users.idusuario `;//VARIABLE QUE GUARDARÁ LA SENTENCIA SQL...
			db.queryMysql(sql, function(err, response)
			{
				var respuesta=response;
				console.log(respuesta);
				//vistaVideo(req, res);
				
				if (err) throw err;
				res.json(respuesta);
			

			});
	
	/*
		db.queryMysql("select * from usuarioxvideo where id_usuario = " + req.user[0].idusuario, function(err, data){
			if (err) throw err;
			res.json(data);
		});
	
	*/
};

var loginPost = function (req, res, next)
{
    var titulo = "";
    passport.authenticate('local', {
	successRedirect: '/vistaVideo',
	failureRedirect: '/login'},
	function(err, user, info)
	{
		if(err)
		{
			return res.render('login', {titulo: titulo, error: err.message});
		}
		if(!user)
		{
			return res.render('login', {titulo: titulo, error: info.message, usuario : info.usuario});
		}
		return req.logIn(user, function(err)
		{
			if(err)
			{
				return res.render('login', {titulo: titulo, error: err.message});
			}
			else
			{
				return res.redirect('/');
			}
		});
	})(req, res, next);
};

var logout = function(req, res)
{
	if(req.isAuthenticated())
	{
		req.logout();
    }
	res.redirect('/login');
}

var registro =  function(req, res)
{
	res.render("registro", {
		titulo 	:  	"Registro Vídeo Comentarios",
		data 	:	[]
	});

	
};

var vistaVideo =  function(req, res)
{
	res.render("vistaVideo", {
		titulo 	:  	"Disfrute el Video",
		data 	:	[]
	});

	
};



var videoPost = function(req, res, next)
{
    //Buscar si el nombre de usuario o correo ya existen...
	var data = req.body;
    console.log("Información enviada desde la vista");
    console.log(data);

	
};



var registroPost = function(req, res, next)
{
    //Buscar si el nombre de usuario o correo ya existen...
	var data = req.body;
    console.log("Información enviada desde la vista");
    console.log(data);

    //CREAR SENTENCIA QUE VALIDE SI UN USUARIO YA EXISTE.
    //LOS DATOS ÚNICOS DE USUARIO SON usuario  email
	var sql = "select count(*) as numero from users where email = '" + data.correo + "' and usuario =  '" + data.username + "'"; //CREAR SENTENCIA SQL EN ESTA VARIABLE...

	db.queryMysql(sql, function(err, response)
	{
		if(response[0].numero !== 0)
		{
			res.render('registro', {
									titulo: 'Registro To-Do',
									error: 'Nombre de usuario o correo ya existe',
									data : [data.nombre, data.correo, data.username]
								});
		}
		else
		{



            var password = bcrypt.hashSync(data.password);
            //CREAR SENTENCIA SQL  QUE ADICIONE UN NUEVO USUARIO EN LA TABLA users
            //PARA ENCRIPTAR LA CONTRASEÑA SE UTILIZARÁ EL MÓDULO bcrypt.
            sql = `INSERT INTO users (nombre, usuario, clave, email, fecha) VALUES ('${data.nombre}','${data.username}','${password}','${data.correo}','${fechaActual}')`;//VARIABLE QUE GUARDARÁ LA SENTENCIA SQL...
			db.queryMysql(sql, function(err, response)
			{
				if (err || response.affectedRows === 0)
				{
					res.render('registro');
				}
				loginPost(req, res, next);
				//comentarios(req,res);
			});
		}
	});

};




var videoPost = function(req, res, next)
{
    //Buscar si el nombre de usuario o correo ya existen...
	
if(req.isAuthenticated())
	{
	

	var data = req.body;
    console.log("Comentario del usuario");
    console.log(data);
    var filtro="lol"
		    var usuario = req.user[0].idusuario;
            var sql = `INSERT INTO usuarioxvideo (id_usuario, id_video, comentario,fecha) VALUES ('${usuario}',"1",'${data.comentario}','${fechaComentario}')`;//VARIABLE QUE GUARDARÁ LA SENTENCIA SQL...
			db.queryMysql(sql, function(err, response)
			{/*
				if (err || response.affectedRows === 0)
				{
					res.render('vistaVideo');
				}
				*/
					vistaVideo(req,res);
			});	

			//vistaVideo(req, res, next);
/*
			var sql = `SELECT users.nombre, usuarioxvideo.comentario, usuarioxvideo.fecha
					FROM usuarioxvideo
					INNER JOIN users
					ON usuarioxvideo.id_usuario= users.idusuario `;//VARIABLE QUE GUARDARÁ LA SENTENCIA SQL...
			db.queryMysql(sql, function(err, response)
			{
				var respuesta=response;
				console.log(respuesta);
				//vistaVideo(req, res);
				
				if (err) throw err;
				res.json(respuesta);
			

			});
	*/

    }
	

};







var notFound404 = function(req, res)
{
	res.status(404).send("Página no encontrada :( en el momento");
};

//Exportar las rutas...
module.exports.index = index;
module.exports.login = login;
module.exports.loginPost = loginPost;
module.exports.logout = logout;
module.exports.registro = registro;
module.exports.vistaVideo = vistaVideo;
module.exports.registroPost = registroPost;
module.exports.videoPost = videoPost;
module.exports.notFound404 = notFound404;
module.exports.comentarios =comentarios;
