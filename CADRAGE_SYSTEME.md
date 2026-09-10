# LUMEN — Cadrage du système

Statut : besoin et mission retenus avec l’utilisateur. Décomposition fonctionnelle proposée ; seuils chiffrés et critères d’acceptation définitifs à préciser.

## Besoin de référence

Permettre à la direction de LUMEN de choisir une stratégie de lancement en Allemagne en comprenant ses conséquences commerciales, économiques et ses incertitudes.

## Mission du système

Le système a pour mission d’aider la direction de LUMEN à comparer et à choisir une stratégie de lancement en Allemagne, en évaluant différentes options de prix, de positionnement, de canaux de distribution et de période de lancement, et en rendant explicites leurs conséquences commerciales, économiques, leurs incertitudes et les compromis entre positionnement premium et retour rapide sur les dépenses marketing.

## Bénéficiaires et décision soutenue

- Freya, responsable Growth : disposer d’une recommandation argumentée et de résultats qu’elle peut explorer.
- Jonas, directeur marketing : apprécier la cohérence avec le positionnement premium et la construction de la marque.
- Elena, directrice financière : apprécier la rentabilité et le délai de récupération des dépenses marketing.

La direction conserve la décision finale. Le système doit éclairer les compromis sans imposer implicitement la priorité d’une partie prenante.

## Cadre de référence

- Le brief porte sur le lancement de LUMEN en Allemagne.
- Les historiques de ventes disponibles concernent les Pays-Bas, le Danemark et la Suède ; aucune vente historique LUMEN en Allemagne n’est disponible.
- Toute estimation pour l’Allemagne devra expliciter les hypothèses utilisées et ses limites.
- Le choix d’une méthode de calcul ou de machine learning interviendra après la définition des exigences, selon son utilité pour la mission.

## Fonction principale

FP-01 — Permettre à la direction de comparer des stratégies de lancement de LUMEN en Allemagne et de justifier son choix au regard des objectifs commerciaux, économiques et de positionnement, avec leurs incertitudes.

## Fonctions de service proposées

Ces fonctions décrivent les services attendus, indépendamment du choix d’interface ou d’algorithme. Elles forment une chaîne allant des données à une décision argumentée.

| ID | Fonction | Résultat attendu | Vérification envisagée |
|---|---|---|---|
| FS-01 | Fournir une base d’analyse fiable et traçable | Données utiles au cas, avec provenance, période, unités et anomalies signalées | Retrouver la source des indicateurs ; repérer un doublon ou une valeur manquante sans correction silencieuse |
| FS-02 | Éclairer le choix du positionnement et de la clientèle cible | Comparaison des segments, attentes, sensibilité au prix et offres concurrentes | Relier une proposition de positionnement à des éléments quantitatifs et qualitatifs, en signalant leurs contradictions |
| FS-03 | Permettre de construire des scénarios de lancement | Scénarios combinant prix, positionnement, canaux, période, budget et hypothèses sur un horizon commun | Créer et conserver au moins deux scénarios distincts ; signaler les paramètres manquants ou incohérents |
| FS-04 | Estimer le potentiel commercial de chaque scénario | Estimations de volumes et de chiffre d’affaires par période et canal, sous hypothèses explicites | Reproduire une estimation à partir de ses hypothèses ; distinguer données observées, intentions déclarées et estimations allemandes |
| FS-05 | Évaluer les conséquences économiques | Revenu net LUMEN, coûts, contribution, dépenses marketing et délai de récupération estimé, selon les données disponibles | Réconcilier les calculs sur un scénario de référence ; afficher « non atteint sur l’horizon » ou « non calculable » lorsque pertinent |
| FS-06 | Éclairer le choix de la période de lancement | Comparaison des périodes selon la saisonnalité et l’activité concurrentielle documentée | Comparer deux périodes en conservant les autres paramètres ; expliciter la couverture temporelle des données et les limites logistiques non modélisées |
| FS-07 | Comparer les stratégies et tester leur robustesse | Vue commune des résultats et compromis, avec effet de variations des hypothèses clés | Montrer si le classement change lorsque l’adoption, les coûts ou l’acquisition varient ; rendre visibles tout critère de classement et toute pondération |
| FS-08 | Restituer une recommandation explicable | Synthèse du scénario retenu, motifs, alternatives, sacrifices acceptés, risques et conditions de validité | Relier chaque argument aux résultats et hypothèses ; permettre à la direction de retenir une autre option |

## Contraintes transversales proposées

| ID | Contrainte | Conséquence pour le cahier des charges |
|---|---|---|
| CT-01 | Absence de ventes historiques LUMEN en Allemagne | Identifier les estimations allemandes et documenter le transfert depuis les marchés existants ; ne pas annoncer une précision validée en Allemagne |
| CT-02 | Distinction entre intention, adoption et ventes | Ne pas assimiler directement un taux d’acceptation déclaré à une part de marché ou à un volume vendu |
| CT-03 | Comparabilité économique | Expliciter unités, formats de vente, prix consommateur, revenu net LUMEN et déductions par canal ; ne pas compter deux fois les mêmes coûts |
| CT-04 | Protection des données | Exclure les noms et adresses email des analyses et restitutions, car ils ne sont pas nécessaires à la mission |
| CT-05 | Explicabilité et reproductibilité | Conserver les paramètres et les règles de calcul utilisés pour chaque résultat ; indiquer les données insuffisantes |
| CT-06 | Décision humaine | Rendre les priorités visibles et modifiables ; ne pas imposer silencieusement la préférence du marketing ou de la finance |

## Limites fonctionnelles

- Le système soutient une décision de lancement ; il n’exécute pas des campagnes, des commandes ou des négociations commerciales.
- Le positionnement premium est évalué à partir d’éléments documentés ; un prix élevé ne prouve pas à lui seul la perception premium de la marque.
- L’estimation commerciale exige des hypothèses sur la portée du lancement et la conversion. Si ces éléments manquent, le système doit les demander ou présenter des scénarios conditionnels.
- La saisonnalité éclaire le calendrier commercial ; les délais de production, accords de distribution et autres conditions opérationnelles restent à renseigner avant d’affirmer une date réalisable.
- Le machine learning est une solution technique possible pour certaines estimations, pas une fonction exigée du système.

## Étape suivante

Décliner ces fonctions en exigences mesurables et priorisées. Définir l’horizon d’évaluation, les budgets et contraintes disponibles, la définition du retour marketing, les critères de positionnement et les seuils d’acceptation. Les vérifications ci-dessus sont des propositions à préciser, pas des tests déjà réalisés.

Sources : [brief LUMEN](LUMEN_Case_Brief.md) et [documentation des données](data/README_data.md).
