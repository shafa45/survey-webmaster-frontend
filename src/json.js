export const json = {
  "completedHtmlOnCondition": [
   {
    "expression": "{nps-score} < 5",
    "html": {
     "default": "Thanks for your feedback! We highly value all ideas and suggestions from our customers, whether they're positive or critical. In the future, our team might reach out to you to learn more about how we can further improve our product so that it exceeds your expectations.",
     "fr": "Merci pour vos commentaires! Nous accordons une grande importance à toutes les idées et suggestions de nos clients, qu'elles soient positives ou critiques. À l'avenir, notre équipe pourrait vous contacter pour en savoir plus sur la façon dont nous pouvons encore améliorer notre produit afin qu'il dépasse vos attentes."
    }
   },
   {
    "expression": "{nps-score} > 6",
    "html": {
     "default": "Thanks for your feedback. Our goal is to create the best possible product, and your thoughts, ideas, and suggestions play a major role in helping us identify opportunities to improve.",
     "fr": "Merci pour vos commentaires. Notre objectif est de créer le meilleur produit possible, et vos réflexions, idées et suggestions jouent un rôle majeur pour nous aider à identifier les opportunités d'amélioration."
    }
   },
   {
    "expression": "{nps-score} >= 8",
    "html": {
     "default": "Thanks for your feedback. It's great to hear that you're a fan of our product. Your feedback helps us discover new opportunities to improve it and make sure you have the best possible experience.",
     "fr": "Merci pour vos commentaires. Nous sommes ravis d'entendre que vous avez apprécié notre produit. Vos commentaires nous aident à découvrir de nouvelles opportunités pour l'améliorer et vous assurer la meilleure expérience possible."
    }
   }
  ],
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "rating",
          "name": "nps-score",
          "title": {
            "default": "On a scale from 0 to 10, how likely are you to recommend us to a friend or colleague?",
            "fr": "Sur une échelle de 0 à 10, quelle est la probabilité que vous recommandiez notre produit à un ami ou à un collègue?"
          },
          "rateMin": 0,
          "rateMax": 10,
          "minRateDescription": {
            "default": "Very unlikely",
            "fr": "Très improbable"
          },
          "maxRateDescription": {
            "default": "Very likely",
            "fr": "Très probable"
          }
        }
      ]
    },
    {
      "name": "page2",
      "elements": [
        {
          "type": "comment",
          "name": "disappointing-experience",
          "visibleIf": "{nps-score} <= 5",
          "title": {
            "default": "How did we disappoint you and what can we do to make things right?",
            "fr": "Nous n'avons pas été a la hauteur de vos attentes, comment pouvons-nous améliorer?"
          },
          "maxLength": 300
        },
        {
          "type": "comment",
          "name": "improvements-required",
          "visibleIf": "{nps-score} >= 6",
          "title": {
            "default": "What can we do to make your experience more satisfying?",
            "fr": "Que pouvons-nous faire pour rendre votre expérience plus satisfaisante?"
          },
          "maxLength": 300
        }
      ]
    },
  ],
  "showPrevButton": true,
  "showQuestionNumbers": "off",
  "completeText": {
   "fr": "Envoyer"
  },
  "widthMode": "static",
  "width": "1000px"
 };