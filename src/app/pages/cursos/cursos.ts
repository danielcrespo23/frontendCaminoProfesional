import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { Auth } from '../../services/auth';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  duracion: string;
  nivel: 'Básico' | 'Intermedio' | 'Avanzado';
  categoria: 'lenguaje' | 'apuntes' | 'herramientas';
  icono: string;
  colorHeader: string;
  valoracion: number;
  alumnos: number;
  temario: string[];
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, Footer],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class Cursos {
  auth = inject(Auth);
  private router = inject(Router);

  filtroActivo = signal<'todos' | 'lenguaje' | 'apuntes' | 'herramientas'>('todos');
  cursoSeleccionado = signal<Curso | null>(null);

  cursos: Curso[] = [
    {
      id: 1,
      titulo: 'Python desde cero',
      descripcion: 'Aprende Python de forma práctica: desde variables y bucles hasta proyectos reales con manejo de ficheros, APIs y librerías populares.',
      precio: 29,
      duracion: '40h',
      nivel: 'Básico',
      categoria: 'lenguaje',
      icono: 'fa-snake',
      colorHeader: 'linear-gradient(135deg, #3572A5 0%, #1e4d7b 100%)',
      valoracion: 4.9,
      alumnos: 3420,
      temario: ['Variables y tipos de datos', 'Condicionales y bucles', 'Funciones y módulos', 'Ficheros y excepciones', 'Introducción a librerías (requests, json)']
    },
    {
      id: 2,
      titulo: 'JavaScript moderno (ES6+)',
      descripcion: 'Domina JavaScript actual: arrow functions, promesas, async/await, destructuring y todo lo que necesitas para el desarrollo web.',
      precio: 29,
      duracion: '35h',
      nivel: 'Intermedio',
      categoria: 'lenguaje',
      icono: 'fa-js',
      colorHeader: 'linear-gradient(135deg, #f0db4f 0%, #c8a800 100%)',
      valoracion: 4.8,
      alumnos: 2870,
      temario: ['Scope, let y const', 'Arrow functions y closures', 'Promesas y async/await', 'Módulos ES6', 'DOM y eventos']
    },
    {
      id: 3,
      titulo: 'Java para principiantes',
      descripcion: 'Entiende la programación orientada a objetos con Java: clases, herencia, interfaces y colecciones con ejemplos paso a paso.',
      precio: 24,
      duracion: '45h',
      nivel: 'Básico',
      categoria: 'lenguaje',
      icono: 'fa-mug-hot',
      colorHeader: 'linear-gradient(135deg, #e76f00 0%, #b85500 100%)',
      valoracion: 4.6,
      alumnos: 1950,
      temario: ['Clases y objetos', 'Herencia e interfaces', 'Colecciones (List, Map, Set)', 'Gestión de excepciones', 'Entrada / salida de datos']
    },
    {
      id: 4,
      titulo: 'Apuntes: Bases de Datos',
      descripcion: 'Pack completo de apuntes sobre diseño relacional, SQL desde cero, normalización, procedimientos almacenados y transacciones.',
      precio: 9,
      duracion: '—',
      nivel: 'Básico',
      categoria: 'apuntes',
      icono: 'fa-database',
      colorHeader: 'linear-gradient(135deg, #004374 0%, #002b49 100%)',
      valoracion: 4.7,
      alumnos: 5100,
      temario: ['Modelo entidad-relación', 'SQL: SELECT, JOIN, GROUP BY', 'Normalización (1FN–3FN)', 'Procedimientos y funciones', 'Transacciones y control de concurrencia']
    },
    {
      id: 5,
      titulo: 'Apuntes: Programación en C',
      descripcion: 'Resúmenes y ejercicios resueltos de C: punteros, gestión de memoria, structs y manejo de ficheros explicados con claridad.',
      precio: 7,
      duracion: '—',
      nivel: 'Intermedio',
      categoria: 'apuntes',
      icono: 'fa-file-code',
      colorHeader: 'linear-gradient(135deg, #555555 0%, #222222 100%)',
      valoracion: 4.5,
      alumnos: 2340,
      temario: ['Tipos de datos y operadores', 'Punteros y aritmética de punteros', 'Arrays y strings', 'Structs y uniones', 'Gestión de memoria dinámica']
    },
    {
      id: 6,
      titulo: 'Git & GitHub completo',
      descripcion: 'Controla el historial de tu código: ramas, merges, pull requests, resolución de conflictos y flujos de trabajo en equipo.',
      precio: 14,
      duracion: '12h',
      nivel: 'Básico',
      categoria: 'herramientas',
      icono: 'fa-code-branch',
      colorHeader: 'linear-gradient(135deg, #f05033 0%, #b93520 100%)',
      valoracion: 4.9,
      alumnos: 4680,
      temario: ['Repositorios locales y remotos', 'Ramas y merges', 'Pull requests y code review', 'Resolución de conflictos', 'GitHub Actions (intro)']
    },
    {
      id: 7,
      titulo: 'Docker desde cero',
      descripcion: 'Aprende a contenedorizar aplicaciones con Docker: imágenes, contenedores, volúmenes, redes y Docker Compose para entornos reales.',
      precio: 19,
      duracion: '18h',
      nivel: 'Intermedio',
      categoria: 'herramientas',
      icono: 'fa-box-open',
      colorHeader: 'linear-gradient(135deg, #0db7ed 0%, #0880a8 100%)',
      valoracion: 4.8,
      alumnos: 1760,
      temario: ['Qué es un contenedor', 'Dockerfile y construcción de imágenes', 'Volúmenes y redes', 'Docker Compose', 'Despliegue de una app real']
    },
    {
      id: 8,
      titulo: 'Linux para desarrolladores',
      descripcion: 'Domina la terminal de Linux: comandos esenciales, permisos, scripting con Bash, procesos y administración básica del sistema.',
      precio: 14,
      duracion: '15h',
      nivel: 'Básico',
      categoria: 'herramientas',
      icono: 'fa-terminal',
      colorHeader: 'linear-gradient(135deg, #333333 0%, #1a1a1a 100%)',
      valoracion: 4.7,
      alumnos: 2190,
      temario: ['Navegación y gestión de ficheros', 'Permisos y usuarios', 'Redirección y pipes', 'Scripting con Bash', 'Gestión de procesos y servicios']
    }
  ];

  get cursosFiltrados(): Curso[] {
    const filtro = this.filtroActivo();
    if (filtro === 'todos') return this.cursos;
    return this.cursos.filter(c => c.categoria === filtro);
  }

  setFiltro(filtro: 'todos' | 'lenguaje' | 'apuntes' | 'herramientas') {
    this.filtroActivo.set(filtro);
  }

  abrirDetalle(curso: Curso) {
    this.cursoSeleccionado.set(curso);
  }

  cerrarDetalle() {
    this.cursoSeleccionado.set(null);
  }

  inscribirse(curso: Curso) {
    if (!this.auth.isAuthenticated()) {
      this.cerrarDetalle();
      this.router.navigate(['/login']);
      return;
    }
    // TODO: llamada al backend cuando esté disponible
    alert(`Inscripción en "${curso.titulo}" próximamente disponible.`);
  }

  estrellas(valoracion: number): number[] {
    return Array(Math.round(valoracion)).fill(0);
  }
}
