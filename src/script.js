import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera... primeiro parametro é o campo de visao vertical
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//criando animacao com gsap
//gsap recebe 3 parametros, duracao do movimento, o delay e qual a direcao
//gsap.to(mesh.position, {duration: 2, delay: 1, y: 0})//duration, tempo que se move, delay é o atraso no inicio do movimento
//gsap.to(mesh.rotation, {duration: 2, delay: 1, y: Math.PI*2})
//gsap.to(camera.position, {duration: 1, delay: 1, z: 1})

//criando clock para medir o tempo da animacao
let clock = new THREE.Clock()
//criar uma funcao para animar o objeto
const tick = () => {

    //vamos mcriar um relogio para igualar a animacao por segundos
    const elapsedTime = clock.getElapsedTime()

    // elapsedTime faz com que o objeto se mova por segundo
    mesh.rotation.y = elapsedTime

    // o render deve ser chamado dentro da funcao para o objeto ser renderizado animado
    renderer.render(scene, camera)


    window.requestAnimationFrame(tick) // esse é o metodo que chama a funcao de animacao
}

tick()