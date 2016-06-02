-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2016 a las 00:45:45
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comentarios`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `idusuario` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(100) DEFAULT '',
  `usuario` varchar(100) DEFAULT NULL,
  `clave` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fecha` varchar(20) DEFAULT NULL,
  `fecha_tiempo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusuario`, `nombre`, `usuario`, `clave`, `email`, `fecha`, `fecha_tiempo`) VALUES
(11, 'Luis', 'luis', '$2a$10$T9oH7PcBrRJMkAGHf.7ENejZdcqrAr.BmtgRNsDmg/aNKGZA4DDZ2', 'luis@mail.com', '6/2/2016', NULL),
(12, 'edwin', 'edwin', '$2a$10$StLj/GQ0nb6aqf26kas5CuNfF913ZfXYN.l9JuJ/h/pbLsi5.C16i', 'edwin@mail.com', '6/2/2016', NULL),
(13, 'hector', 'hector', '$2a$10$sUN6Z5VIENFOR3HaERCKEuJLE9zYQ9szwpvdP33lVH9sPD.lDgFjS', 'hector@mail.com', '6/2/2016', NULL),
(14, 'daniel', 'daniel', '$2a$10$wUnrQ0in3tO6fGvTRWQn5Oc8T/tXa.dZvJ3apWH.J0FiK0BW3IR/G', 'daniel@mail.com', '6/2/2016', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioxvideo`
--

CREATE TABLE `usuarioxvideo` (
  `id_usuarioxvideo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_video` int(50) NOT NULL,
  `comentario` varchar(200) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarioxvideo`
--

INSERT INTO `usuarioxvideo` (`id_usuarioxvideo`, `id_usuario`, `id_video`, `comentario`, `fecha`) VALUES
(3171, 11, 1, 'hola', '2016-06-02'),
(3172, 11, 1, 'Nice Song', '2016-06-02'),
(3173, 11, 1, 'aa', '2016-06-02'),
(3174, 14, 1, 'hola', '2016-06-02'),
(3175, 11, 1, 'XD', '2016-06-02'),
(3176, 11, 1, 'a', '2016-06-02'),
(3177, 11, 1, 'a', '2016-06-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id_video` int(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id_video`, `descripcion`, `link`) VALUES
(1, 'Echo by Hardwell', 'https://www.youtube.com/watch?v=EoYOCxP6yIA');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idusuario`);

--
-- Indices de la tabla `usuarioxvideo`
--
ALTER TABLE `usuarioxvideo`
  ADD PRIMARY KEY (`id_usuarioxvideo`,`id_usuario`,`id_video`);

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id_video`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `idusuario` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `usuarioxvideo`
--
ALTER TABLE `usuarioxvideo`
  MODIFY `id_usuarioxvideo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3178;
--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id_video` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
