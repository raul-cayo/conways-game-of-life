import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "controls": {
        "random": "RANDOM",
        "tempo": "TEMPO",
        "cell_size": "CELL SIZE",
        "colors": "COLORS",
        "tooltips": {
          "random_btn": "Get a random example",
          "pause_btn": "Pause",
          "play_btn": "Play",
          "clear_btn": "Clear grid",
          "off_color_picker": "Choose a color for dead cells",
          "on_color_picker": "Choose a color for living cells",
          "info_btn": "Information"
        }
      },
      "baners": {
        "game_of_life": "CONWAY'S GAME OF LIFE",
        "nothing": "Nothing here yet..."
      },
      "info": {
        "modal_title": "What is Conway's Game of Life?",
        "close_tooltip": "Close",
        "game_description": "Conways Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. One interacts with the Game of Life by creating an initial state and observing how it evolves. It produces complex and interesting patterns following a few rules.",
        "rules": "Rules",
        "rule_1": "Any live cell with fewer than two live neighbours dies, as if by underpopulation.",
        "rule_2": "Any live cell with two or three live neighbours lives on to the next generation.",
        "rule_3": "Any live cell with more than three live neighbours dies, as if by overpopulation.",
        "rule_4": "Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.",
        "resources": "Resources",
        "wikipedia_link": "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life",
        "youtube_link": "https://www.youtube.com/watch?v=R9Plq-D1gEk"
      }
    }
  },
  es: {
    translation: {
      "controls": {
        "random": "AL AZAR",
        "tempo": "TEMPO",
        "cell_size": "TAMAÑO DE CELDA",
        "colors": "COLORES",
        "tooltips": {
          "random_btn": "Ver ejemplo al azar",
          "pause_btn": "Pausar",
          "play_btn": "Reproducir",
          "clear_btn": "Limpiar cuadrícula",
          "off_color_picker": "Selecciona un color para celdas muertas",
          "on_color_picker": "Selecciona un color para celdas vivas",
          "info_btn": "Información"
        }
      },
      "baners": {
        "game_of_life": "EL JUEGO DE LA VIDA DE CONWAY",
        "nothing": "No hay nada aquí aún..."
      },
      "info": {
        "modal_title": "¿Que es el Juego de la Vida de Conway?",
        "close_tooltip": "Cerrar",
        "game_description": "El Juego de la Vida de Conway es un autómata celular ideado por el matemático británico John Horton Conway en 1970. Se interactúa con el Juego de la Vida creando un estado inicial y observando cómo evoluciona. Produce patrones complejos e interesantes siguiendo algunas reglas.",
        "rules": "Rules",
        "rule_1": "Cualquier célula viva con menos de dos vecinos vivos muere, como por falta de población.",
        "rule_2": "Cualquier célula viva con dos o tres vecinos vivos vive en la siguiente generación.",
        "rule_3": "Cualquier célula viva con más de tres vecinos vivos muere, como por sobrepoblación.",
        "rule_4": "Cualquier célula muerta con exactamente tres vecinos vivos se convierte en una célula viva, como por reproducción.",
        "resources": "Recursos",
        "wikipedia_link": "https://es.wikipedia.org/wiki/Juego_de_la_vida",
        "youtube_link": "https://www.youtube.com/watch?v=OWXD_wJxCKQ"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;