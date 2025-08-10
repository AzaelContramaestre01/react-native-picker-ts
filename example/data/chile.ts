const REGIONES_COMUNAS: Record<string, string[]> = {
  'Arica y Parinacota': ['Arica', 'Camarones', 'Putre', 'General Lagos'],
  'Tarapacá': ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
  'Antofagasta': [
    'Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal',
    'Calama', 'Ollagüe', 'San Pedro de Atacama',
    'Tocopilla', 'María Elena',
  ],
  'Atacama': [
    'Copiapó', 'Caldera', 'Tierra Amarilla',
    'Chañaral', 'Diego de Almagro',
    'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco',
  ],
  'Coquimbo': [
    'La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña',
    'Illapel', 'Canela', 'Los Vilos', 'Salamanca',
    'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado',
  ],
  'Valparaíso': [
    'Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar',
    'Isla de Pascua',
    'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban',
    'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar',
    'Quillota', 'La Calera', 'Hijuelas', 'La Cruz', 'Nogales',
    'San Antonio', 'Algarrobo', 'Cartagena', 'El Quisco', 'El Tabo', 'Santo Domingo',
    'San Felipe', 'Catemu', 'Llaillay', 'Panquehue', 'Putaendo', 'Santa María',
    'Quilpué', 'Limache', 'Olmué', 'Villa Alemana',
  ],
  'Metropolitana de Santiago': [
    'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central', 'Huechuraba', 'Independencia',
    'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea',
    'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia',
    'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón',
    'Santiago', 'Vitacura',
    'Colina', 'Lampa', 'Tiltil',
    'Puente Alto', 'Pirque', 'San José de Maipo',
    'San Bernardo', 'Buin', 'Calera de Tango', 'Paine',
    'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro',
    'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor',
  ],
  "O'Higgins": [
    'Rancagua', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'Las Cabras', 'Machalí', 'Malloa',
    'Mostazal', 'Olivar', 'Peumo', 'Pichidegua', 'Quinta de Tilcoco', 'Rengo', 'Requínoa', 'San Vicente',
    'Pichilemu', 'La Estrella', 'Litueche', 'Marchihue', 'Navidad', 'Paredones',
    'San Fernando', 'Chépica', 'Chimbarongo', 'Lolol', 'Nancagua', 'Palmilla', 'Peralillo', 'Placilla', 'Pumanque', 'Santa Cruz',
  ],
  'Maule': [
    'Talca', 'Constitución', 'Curepto', 'Empedrado', 'Maule', 'Pelarco', 'Pencahue', 'Río Claro', 'San Clemente', 'San Rafael',
    'Cauquenes', 'Chanco', 'Pelluhue',
    'Curicó', 'Hualañé', 'Licantén', 'Molina', 'Rauco', 'Romeral', 'Sagrada Familia', 'Teno', 'Vichuquén',
    'Linares', 'Colbún', 'Longaví', 'Parral', 'Retiro', 'San Javier', 'Villa Alegre', 'Yerbas Buenas',
  ],
  'Ñuble': [
    'Chillán', 'Chillán Viejo', 'El Carmen', 'Pemuco', 'Pinto', 'Quillón', 'San Ignacio', 'Yungay',
    'Quirihue', 'Cobquecura', 'Coelemu', 'Ninhue', 'Portezuelo', 'Ránquil', 'Trehuaco',
    'San Carlos', 'Coihueco', 'Ñiquén', 'San Fabián', 'San Nicolás',
  ],
  'Biobío': [
    'Concepción', 'Chiguayante', 'Coronel', 'Florida', 'Hualpén', 'Hualqui', 'Lota', 'Penco', 'San Pedro de la Paz', 'Santa Juana', 'Talcahuano', 'Tomé',
    'Arauco', 'Cañete', 'Contulmo', 'Curanilahue', 'Lebu', 'Los Álamos', 'Tirúa',
    'Los Ángeles', 'Antuco', 'Cabrero', 'Laja', 'Mulchén', 'Nacimiento', 'Negrete', 'Quilaco', 'Quilleco', 'San Rosendo', 'Santa Bárbara', 'Tucapel', 'Yumbel', 'Alto Biobío',
  ],
  'La Araucanía': [
    'Temuco', 'Carahue', 'Cunco', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Saavedra', 'Teodoro Schmidt', 'Toltén', 'Vilcún', 'Villarrica', 'Cholchol',
    'Angol', 'Collipulli', 'Curacautín', 'Ercilla', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Purén', 'Renaico', 'Traiguén', 'Victoria',
  ],
  'Los Ríos': [
    'Valdivia', 'Corral', 'Lanco', 'Los Lagos', 'Máfil', 'Mariquina', 'Paillaco', 'Panguipulli',
    'La Unión', 'Futrono', 'Lago Ranco', 'Río Bueno',
  ],
  'Los Lagos': [
    'Puerto Montt', 'Calbuco', 'Cochamó', 'Fresia', 'Frutillar', 'Los Muermos', 'Llanquihue', 'Maullín', 'Puerto Varas',
    'Castro', 'Ancud', 'Chonchi', 'Curaco de Vélez', 'Dalcahue', 'Puqueldón', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao',
    'Osorno', 'Puerto Octay', 'Purranque', 'Puyehue', 'Río Negro', 'San Juan de la Costa', 'San Pablo',
    'Chaitén', 'Futaleufú', 'Hualaihué', 'Palena',
  ],
  'Aysén': [
    'Coyhaique', 'Lago Verde', 'Aysén', 'Cisnes', 'Guaitecas', 'Chile Chico', 'Río Ibáñez', 'Cochrane', "O'Higgins", 'Tortel',
  ],
  'Magallanes y de la Antártica Chilena': [
    'Punta Arenas', 'Laguna Blanca', 'Río Verde', 'San Gregorio',
    'Cabo de Hornos', 'Antártica',
    'Porvenir', 'Primavera', 'Timaukel',
    'Natales', 'Torres del Paine',
  ],
};

export default REGIONES_COMUNAS;


