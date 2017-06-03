
var container;

var camera, scene, renderer;

var mesh;
var objects = [];

init();
animate();

function init() {

	container = document.getElementById( 'container' );

	//

	camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
	camera.position.z = 1000;

	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 5.0;
	controls.zoomSpeed = 3;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x88ccff, 2000, 3500 );

	// get the camera in the scene, so we can make the light move with the camera
	scene.add(camera);

	//

	scene.add( new THREE.AmbientLight( 0x666666 ) );

	var dLight1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	dLight1.position.set( 1, 1, 1 );
	camera.add( dLight1 );
	camera.add( dLight1.target );

	var dLight2 = new THREE.DirectionalLight( 0x888888, 0.5 );
	dLight2.position.set( -1, 0, 0 );
	camera.add( dLight2 );
	camera.add( dLight2.target );

	//

	var triangles = 160000;

	var geometry = new THREE.BufferGeometry();


	var indices = new Uint32Array( triangles * 3 );

	for ( var i = 0; i < indices.length; i ++ ) {

		indices[ i ] = i;

	}

	var positions = new Float32Array( triangles * 3 * 3 );
	var normals = new Float32Array( triangles * 3 * 3 );
	var colors = new Float32Array( triangles * 3 * 3 );

	var color = new THREE.Color();

	var n = 800, n2 = n/2;	// triangles spread in the cube
	var d = 12, d2 = d/2;	// individual triangle size

	var pA = new THREE.Vector3();
	var pB = new THREE.Vector3();
	var pC = new THREE.Vector3();

	var cb = new THREE.Vector3();
	var ab = new THREE.Vector3();

	for ( var i = 0; i < positions.length; i += 9 ) {

		// positions

		var x = Math.random() * n - n2;
		var y = Math.random() * n - n2;
		var z = Math.random() * n - n2;

		var ax = x + Math.random() * d - d2;
		var ay = y + Math.random() * d - d2;
		var az = z + Math.random() * d - d2;

		var bx = x + Math.random() * d - d2;
		var by = y + Math.random() * d - d2;
		var bz = z + Math.random() * d - d2;

		var cx = x + Math.random() * d - d2;
		var cy = y + Math.random() * d - d2;
		var cz = z + Math.random() * d - d2;

		positions[ i ]     = ax;
		positions[ i + 1 ] = ay;
		positions[ i + 2 ] = az;

		positions[ i + 3 ] = bx;
		positions[ i + 4 ] = by;
		positions[ i + 5 ] = bz;

		positions[ i + 6 ] = cx;
		positions[ i + 7 ] = cy;
		positions[ i + 8 ] = cz;

		// flat face normals

		pA.set( ax, ay, az );
		pB.set( bx, by, bz );
		pC.set( cx, cy, cz );

		cb.subVectors( pC, pB );
		ab.subVectors( pA, pB );
		cb.cross( ab );

		cb.normalize();

		var nx = cb.x;
		var ny = cb.y;
		var nz = cb.z;

		normals[ i ]     = nx;
		normals[ i + 1 ] = ny;
		normals[ i + 2 ] = nz;

		normals[ i + 3 ] = nx;
		normals[ i + 4 ] = ny;
		normals[ i + 5 ] = nz;

		normals[ i + 6 ] = nx;
		normals[ i + 7 ] = ny;
		normals[ i + 8 ] = nz;

		// colors

		var vx = ( x / n ) + 0.5;
		var vy = ( y / n ) + 0.5;
		var vz = ( z / n ) + 0.5;

		color.setRGB( vx, vy, vz );

		colors[ i ]     = color.r;
		colors[ i + 1 ] = color.g;
		colors[ i + 2 ] = color.b;

		colors[ i + 3 ] = color.r;
		colors[ i + 4 ] = color.g;
		colors[ i + 5 ] = color.b;

		colors[ i + 6 ] = color.r;
		colors[ i + 7 ] = color.g;
		colors[ i + 8 ] = color.b;

	}

	geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
	geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

	geometry.computeBoundingSphere();

	var material = new THREE.MeshPhongMaterial( {
		color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
		side: THREE.DoubleSide, vertexColors: THREE.VertexColors
	} );

	mesh = new THREE.Mesh( geometry, material );
	//scene.add( mesh );

	// Snippet from https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_collada.html
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load( './model.dae', function ( collada ) {
		var object = collada.scene;
		object.scale.set( 10, 10, 10 );
		object.position.set( 0, 0, 0 );
		scene.add( object );
		var geomJSON = collada.dae.geometries['shape1-geom'].mesh.geometry3js.toJSON();
		localStorage.setItem( 'geometry', JSON.stringify( geomJSON ) );

		// var dragControls = new THREE.DragControls( object.children, camera, renderer.domElement );
		// dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
		// dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );
	} );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	
	// renderer.setClearColor(0x000000, 0);
	renderer.setClearColor( scene.fog.color );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	// renderer.gammaInput = true;
	// renderer.gammaOutput = true;

	container.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();
	render();
}

//

function animate() {

	requestAnimationFrame( animate );

	controls.update();
	render();

}

function render() {

	var time = Date.now() * 0.001;

	mesh.rotation.x = time * 0.25;
	mesh.rotation.y = time * 0.5;

	renderer.render( scene, camera );

}