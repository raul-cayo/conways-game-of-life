import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "controls": {
        "random": "RANDOM",
        "rhythm": "RHYTHM",
        "cell_size": "CELL SIZE",
        "colors": "COLORS",
        "shape": "SHAPE",
        "tooltips": {
          "random_btn": "Get a random example",
          "pause_btn": "Pause",
          "play_btn": "Play",
          "clear_btn": "Clear grid",
          "off_color_picker": "Choose a color for dead cells",
          "on_color_picker": "Choose a color for living cells",
          "square_shape": "Select square for cells shape",
          "circle_shape": "Select circle for cells shape",
          "info_btn": "Information"
        }
      },
      "baners": {
        "game_of_life": "CONWAY'S GAME OF LIFE",
        "click_again": "Click again to change language",
        "lang_changed": "Language changed to english"
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
        "youtube_link": "https://www.youtube.com/watch?v=R9Plq-D1gEk",
        "wikipedia_article": "Wikipedia article",
        "youtube_video": "Youtube video",
        "lexicon_desc": "Find more patterns and descriptions at the",
        "github_desc": "The code for this website is on this"
      }
    }
  },
  es: {
    translation: {
      "controls": {
        "random": "AL AZAR",
        "rhythm": "RITMO",
        "cell_size": "TAMA??O DE CELDA",
        "colors": "COLORES",
        "shape": "FIGURA",
        "tooltips": {
          "random_btn": "Ver ejemplo al azar",
          "pause_btn": "Pausar",
          "play_btn": "Reproducir",
          "clear_btn": "Limpiar cuadr??cula",
          "off_color_picker": "Selecciona un color para celdas muertas",
          "on_color_picker": "Selecciona un color para celdas vivas",
          "square_shape": "Selecciona un cuadrado para la figura de las celdas",
          "circle_shape": "Selecciona un circulo para la figura de las celdas",
          "info_btn": "Informaci??n"
        }
      },
      "baners": {
        "game_of_life": "EL JUEGO DE LA VIDA DE CONWAY",
        "click_again": "Haz click otra vez para cambiar el idioma",
        "lang_changed": "Idioma cambi?? a espa??ol"
      },
      "info": {
        "modal_title": "??Que es el Juego de la Vida de Conway?",
        "close_tooltip": "Cerrar",
        "game_description": "El Juego de la Vida de Conway es un aut??mata celular ideado por el matem??tico brit??nico John Horton Conway en 1970. Se interact??a con el Juego de la Vida creando un estado inicial y observando c??mo evoluciona. Produce patrones complejos e interesantes siguiendo algunas reglas.",
        "rules": "Reglas",
        "rule_1": "Cualquier c??lula viva con menos de dos vecinos vivos muere, como por falta de poblaci??n.",
        "rule_2": "Cualquier c??lula viva con dos o tres vecinos vivos vive en la siguiente generaci??n.",
        "rule_3": "Cualquier c??lula viva con m??s de tres vecinos vivos muere, como por sobrepoblaci??n.",
        "rule_4": "Cualquier c??lula muerta con exactamente tres vecinos vivos se convierte en una c??lula viva, como por reproducci??n.",
        "resources": "Recursos",
        "wikipedia_link": "https://es.wikipedia.org/wiki/Juego_de_la_vida",
        "youtube_link": "https://www.youtube.com/watch?v=OWXD_wJxCKQ",
        "wikipedia_article": "Art??culo en Wikipedia",
        "youtube_video": "Video en Youtube",
        "lexicon_desc": "Encuentra m??s patrones y descripciones en",
        "github_desc": "El c??digo de esta app se encuentra en"
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18n;