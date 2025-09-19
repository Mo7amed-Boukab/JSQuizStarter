
if (!localStorage.getItem("quizData")) {
  const quizData =  {
     easy: [
      {
        question: "Qui est le créateur de JavaScript ?",
        options: ["Brendan Eich", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
        correct: [0]
      },
      {
        question: "Quel langage est utilisé pour styliser les pages web ?",
        options: ["HTML", "CSS", "JavaScript", "PHP"],
        correct: [1]
      },
      {
        question: "Quelle extension est utilisée pour un fichier JavaScript ?",
        options: [".js", ".py", ".php", ".html"],
        correct: [0]
      },
      {
        question: "Quelle balise est utilisée pour insérer une image en HTML ?",
        options: ["<div>", "<img>", "<image>", "<src>"],
        correct: [1]
      },
      {
        question: "Que signifie CSS ?",
        options: [
          "Cascading Style Sheets",
          "Creative Style System",
          "Colorful Style Syntax",
          "Code Styling Source"
        ],
        correct: [0]
      },
      {
        question: "Quelle méthode affiche un message dans la console en JS ?",
        options: ["print()", "console.log()", "echo()", "alert()"],
        correct: [1]
      },
      {
        question: "Lequel est un langage de balisage ?",
        options: ["JavaScript", "CSS", "HTML", "Python"],
        correct: [2]
      },
      {
        question: "Quelle propriété CSS change la couleur du texte ?",
        options: ["font-color", "text-color", "color", "background-color"],
        correct: [2]
      },
      {
        question: "Quelle méthode ajoute un élément dans un tableau JS ?",
        options: ["push()", "append()", "insert()", "add()"],
        correct: [0]
      },
      {
        question: "Quelle fonction montre une boîte d’alerte en JS ?",
        options: ["prompt()", "alert()", "console.log()", "print()"],
        correct: [1]
      }
    ],

    medium: [
      {
        question: "Quels sont des frameworks JavaScript ?",
        options: ["React", "Django", "Vue.js", "Angular"],
        correct: [0, 2, 3]
      },
      {
        question: "Quels protocoles sont utilisés pour le web ?",
        options: ["HTTP", "HTTPS", "FTP", "SMTP"],
        correct: [0, 1]
      },
      {
        question: "Quels sont des langages orientés objet ?",
        options: ["Java", "C++", "Python", "HTML"],
        correct: [0, 1, 2]
      },
      {
        question: "Quel outil est utilisé pour le contrôle de version ?",
        options: ["Docker", "Git", "Node.js", "Nginx"],
        correct: [1]
      },
      {
        question: "Quelle méthode transforme JSON en objet JS ?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "parse.JSON()"],
        correct: [0]
      },
      {
        question: "Quelle est la sortie de 'typeof null' en JS ?",
        options: ["null", "undefined", "object", "string"],
        correct: [2]
      },
      {
        question: "Quelle méthode supprime le dernier élément d’un tableau JS ?",
        options: ["pop()", "remove()", "delete()", "shift()"],
        correct: [0]
      },
      {
        question: "Quelle balise définit un tableau en HTML ?",
        options: ["<table>", "<tr>", "<td>", "<tab>"],
        correct: [0]
      },
      {
        question: "Quelle est la valeur par défaut de position en CSS ?",
        options: ["absolute", "relative", "static", "fixed"],
        correct: [2]
      },
      {
        question: "Lequel est un langage backend ?",
        options: ["PHP", "JavaScript", "CSS", "HTML"],
        correct: [0]
      }
    ],

    hard: [
      {
        question: "Quels sont des systèmes de gestion de bases de données ?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correct: [0, 1, 2, 3]
      },
      {
        question: "Lequel est un langage compilé ?",
        options: ["Python", "C++", "PHP", "Ruby"],
        correct: [1]
      },
      {
        question: "Lequel est un système d’exploitation ?",
        options: ["Linux", "Docker", "Git", "React"],
        correct: [0]
      },
      {
        question: "Quelle méthode JS exécute une fonction après un délai ?",
        options: ["setInterval()", "setTimeout()", "delay()", "timeout()"],
        correct: [1]
      },
      {
        question: "Quelle propriété CSS fait un élément flexible (flexbox) ?",
        options: ["flex", "display:flex", "grid", "float"],
        correct: [1]
      },
      {
        question: "En SQL, quelle commande supprime une table ?",
        options: ["REMOVE TABLE", "DELETE TABLE", "DROP TABLE", "CLEAR TABLE"],
        correct: [2]
      },
      {
        question: "Quelle méthode JS crée une promesse ?",
        options: ["new Promise()", "Promise.create()", "makePromise()", "promise()"],
        correct: [0]
      },
      {
        question: "Quel algorithme est utilisé pour sécuriser HTTPS ?",
        options: ["RSA", "AES", "SHA-256", "Tous les précédents"],
        correct: [3]
      },
      {
        question: "Quelle méthode JS parcourt chaque élément d’un tableau ?",
        options: ["map()", "forEach()", "filter()", "Tous"],
        correct: [3]
      },
      {
        question: "Quelle commande Git crée une nouvelle branche ?",
        options: ["git branch <name>", "git checkout <name>", "git init <name>", "git create <name>"],
        correct: [0]
      }
    ]
  };

  localStorage.setItem("quizData", JSON.stringify(quizData));
}
