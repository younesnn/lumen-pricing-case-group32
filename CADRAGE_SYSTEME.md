# LUMEN — Cadrage du système

Statut : besoin et mission retenus avec l’utilisateur. Exigences fonctionnelles détaillées proposées pour revue ; seuils métier à arbitrer. Aucun site ni modèle ML implémenté dans cette étape.

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

## Architecture fonctionnelle et règles de lecture

La décomposition suit la chaîne **besoin → mission → FP-01 → fonctions de service → sous-fonctions/exigences → interactions → vérification**. Les identifiants F01 à F08 correspondent respectivement aux FS-01 à FS-08 ci-dessus ; les identifiants Fxx.yy désignent des exigences filles stables. Chaque exigence ci-dessous est requise dans le périmètre fonctionnel proposé ; l’ordre de réalisation reste à planifier après revue. Les composants UI décrivent le service attendu, sans imposer de framework, de maquette ou d’algorithme.

**F01 et F02 constituent les fondations** : données qualifiées, preuves et limites alimentent les hypothèses du **Strategy Simulator, cœur fonctionnel F03 à F08**. Son parcours est : construire un scénario (F03), estimer ses résultats (F04–F05), faire varier sa période (F06), comparer et éprouver les options (F07), puis justifier un choix humain (F08). Une modification revient à F03 et déclenche une nouvelle évaluation ; elle ne modifie jamais silencieusement une recommandation déjà conservée.

Le scénario commun contient : identifiant et version, nom, cible et positionnement argumenté, périmètre géographique, prix et format de vente par canal, canaux et mix, date de lancement, horizon et pas temporel, budget et allocation marketing, hypothèses de portée, adoption, conversion et réachat si utilisé, coûts et déductions, références des données et règles de calcul. Chaque paramètre indique sa valeur, son unité, sa provenance, son statut (observé, hypothèse ou dérivé) et son domaine de validité. Une valeur non disponible reste explicitement manquante ; elle ne devient pas zéro.

Les paramètres de stratégie et les hypothèses doivent pouvoir être modifiés dans le Simulator. Les données sources restent consultables ; une substitution utilisateur devient une hypothèse distincte et traçable. Les paramètres dérivés affichent leur règle de calcul. Tout résultat porte l’identifiant de sa version de scénario, des données et des règles utilisées. Les états requis sont : brouillon, invalide/incomplet, prêt à évaluer, en cours, évalué, obsolète après modification et échec explicite. Seuls les résultats compatibles et à jour peuvent soutenir une comparaison ou une recommandation.

## Exigences détaillées par fonction

Les critères ci-dessous sont des **conditions de recette à exécuter ultérieurement**, et non des preuves de fonctionnement actuel. La conformité documentaire vérifie leur présence et leur traçabilité ; la validation métier confirmera leur adéquation à la décision de Freya, Jonas et Elena.

### F01 — Fournir une base d’analyse fiable et traçable

Traçabilité : FP-01 → FS-01 ; contraintes CT-01, CT-04, CT-05.

#### F01.01 — Cataloguer et qualifier les sources

- **Objectif :** Savoir sur quelles preuves repose une décision.
- **Entrées :** Les douze exhibits et leur documentation, métadonnées de pays, période, unité et nature.
- **Traitement attendu :** Inventorier les sources, distinguer observation, enquête synthétique, projection et hypothèse ; conserver la version et la couverture.
- **Sorties :** Catalogue et limites de couverture, dont absence de ventes allemandes.
- **Composant / interaction UI :** Page Données / Sources, filtres pays, période, produit et canal lorsque disponibles ; fiche source.
- **Critère de validation / acceptation :** Chaque source affiche sa couverture et sa nature ; une recherche de ventes LUMEN allemandes indique leur absence, sans afficher NL/DK/SE comme Allemagne.

#### F01.02 — Contrôler la qualité et protéger les données

- **Objectif :** Éviter des résultats biaisés ou des restitutions nominatives.
- **Entrées :** Données brutes, règles de contrôle, champs personnels identifiés.
- **Traitement attendu :** Repérer doublons, valeurs manquantes, unités incohérentes et valeurs atypiques ; documenter toute exclusion/correction ; exclure noms et emails des analyses et restitutions.
- **Sorties :** Rapport qualité, données analytiques sans noms/emails et journal de transformations.
- **Composant / interaction UI :** Table de qualité avec statut et détail des anomalies, sans champs personnels.
- **Critère de validation / acceptation :** Sur un jeu de recette contenant doublon, manque et pic, les trois sont signalés ; toute correction est retraçable et aucun nom/email ne figure dans les vues ou exports.

#### F01.03 — Tracer les indicateurs jusqu’aux sources

- **Objectif :** Permettre de vérifier et reproduire une analyse.
- **Entrées :** Indicateur, filtres, versions des données et transformations.
- **Traitement attendu :** Associer à chaque indicateur ses sources, unités, agrégation, filtres et limites ; afficher effectif et couverture des statistiques descriptives.
- **Sorties :** Fiche de provenance et résumé descriptif reproductible.
- **Composant / interaction UI :** Action « Voir les sources et le calcul » depuis chaque indicateur.
- **Critère de validation / acceptation :** Depuis un indicateur filtré, retrouver les sources et la règle permettant de le recalculer ; un filtre sans données affiche un état vide explicite.

### F02 — Analyser la clientèle et le positionnement

Traçabilité : FP-01 → FS-02 ; contraintes CT-01, CT-02, CT-05, CT-06.

#### F02.01 — Caractériser les segments et canaux préférés

- **Objectif :** Éclairer le choix de la cible initiale.
- **Entrées :** Contexte de marché, enquête clients, périmètre et données qualifiées F01.
- **Traitement attendu :** Comparer profils, dépenses, préférences et intentions avec effectifs et limites de représentativité ; ne pas convertir une intention en ventes.
- **Sorties :** Profils de segments et opportunités conditionnelles.
- **Composant / interaction UI :** Vue Segments, filtres et graphiques comparatifs accompagnés d’un tableau chiffré.
- **Critère de validation / acceptation :** Deux segments sont comparables avec leurs effectifs et sources ; une intention reste étiquetée comme déclarative et ne produit aucun volume vendu à elle seule.

#### F02.02 — Comparer les offres et la sensibilité au prix

- **Objectif :** Argumenter une plage de prix et un positionnement.
- **Entrées :** Prix concurrents par canal/format, enquêtes de prix et tests des trois prix candidats.
- **Traitement attendu :** Normaliser les prix sur une unité explicite, comparer par canal et distinguer acceptation déclarée et comportement observé ; documenter les axes de positionnement.
- **Sorties :** Repères de prix et éléments étayant ou limitant la proposition premium.
- **Composant / interaction UI :** Comparateur prix/canal et carte de positionnement uniquement si ses axes sont documentables ; détail des preuves.
- **Critère de validation / acceptation :** Des formats différents sont comparés à unité identique ; un prix élevé seul ne suffit pas à attribuer une perception premium ; une plage non couverte est signalée.

#### F02.03 — Confronter les preuves et transmettre des hypothèses

- **Objectif :** Relier l’analyse au scénario sans masquer les contradictions.
- **Entrées :** Résultats quantitatifs, verbatims non nominatifs et proposition de cible/positionnement.
- **Traitement attendu :** Rapprocher les résultats par segment, signaler convergences et contradictions ; proposer des hypothèses sans les valider automatiquement.
- **Sorties :** Dossier de preuves et hypothèses sourcées pour F03.
- **Composant / interaction UI :** Panneau quantitatif/qualitatif et action « Utiliser dans un scénario ».
- **Critère de validation / acceptation :** Une contradiction entre enquête et verbatim reste visible ; le transfert vers F03 conserve les sources et demande une valeur explicite pour toute hypothèse manquante.

### F03 — Construire et modifier les scénarios

Traçabilité : FP-01 → FS-03 ; contraintes CT-03, CT-05, CT-06.

#### F03.01 — Paramétrer la stratégie complète

- **Objectif :** Explorer les leviers de lancement depuis un espace commun.
- **Entrées :** Fondations F01–F02 et paramètres du scénario commun.
- **Traitement attendu :** Permettre saisie et modification de tous les paramètres de stratégie, avec unités, bornes justifiées et explication des valeurs initiales ; distinguer mix de ventes et allocation marketing.
- **Sorties :** Scénario brouillon complet ou liste de champs restant à renseigner.
- **Composant / interaction UI :** Formulaire central du Strategy Simulator : prix, cible, positionnement, canaux, calendrier, budget et hypothèses ; saisie numérique précise et curseur si adapté.
- **Critère de validation / acceptation :** L’utilisateur peut modifier chaque levier ; les prix 1,79 €, 2,19 € et 2,59 € sont explorables et les autres valeurs sont signalées si hors du domaine documenté.

#### F03.02 — Valider et lancer une évaluation cohérente

- **Objectif :** Garantir que les résultats correspondent aux paramètres affichés.
- **Entrées :** Scénario, contraintes et domaines de validité des règles de calcul.
- **Traitement attendu :** Vérifier champs requis, prix/coûts admissibles, dates, horizon, sommes des allocations à 100 % et cohérence budget/canaux ; bloquer les erreurs, expliciter les avertissements ; invalider les résultats affectés après modification.
- **Sorties :** Scénario prêt ou erreurs localisées ; nouvelle évaluation F04–F05 avec version identifiable.
- **Composant / interaction UI :** Messages au champ, bouton « Simuler », état de calcul et indication « résultats à recalculer ».
- **Critère de validation / acceptation :** Un mix à 110 % bloque le calcul ; après modification du prix, l’ancien résultat est marqué obsolète et ne peut être présenté comme le résultat du nouveau prix ; un échec ne laisse pas de chiffres faussement à jour.

#### F03.03 — Conserver et dupliquer les scénarios

- **Objectif :** Comparer des alternatives reproductibles.
- **Entrées :** Scénario et résultats, références des sources et règles.
- **Traitement attendu :** Nommer, enregistrer une version, dupliquer pour tester une variante et restaurer une version conservée.
- **Sorties :** Au moins deux scénarios distincts avec historique des paramètres et résultats associés.
- **Composant / interaction UI :** Liste des scénarios, actions enregistrer, dupliquer et consulter une version.
- **Critère de validation / acceptation :** Dupliquer A en B puis modifier B ne change ni A ni ses résultats ; rouvrir A restitue ses paramètres et références exacts.

### F04 — Estimer le potentiel commercial

Traçabilité : FP-01 → FS-04 ; contraintes CT-01, CT-02, CT-05.

#### F04.01 — Expliciter le passage vers des ventes allemandes

- **Objectif :** Rendre inspectable le raisonnement d’estimation.
- **Entrées :** Scénario valide, historiques NL/DK/SE, contexte allemand, enquêtes et funnel marketing.
- **Traitement attendu :** Documenter transfert de marché, portée, adoption/conversion et réachat éventuel ; préciser les populations et éviter de multiplier des taux portant sur des bases incompatibles ; signaler extrapolations et inconnues.
- **Sorties :** Chaîne d’hypothèses et estimation conditionnelle ou statut non calculable.
- **Composant / interaction UI :** Panneau « Hypothèses commerciales » modifiable et détail de la chaîne de calcul.
- **Critère de validation / acceptation :** Sans hypothèse de portée/conversion nécessaire, aucun volume ponctuel certain n’est affiché ; chaque estimation allemande est explicitement conditionnelle et ne prétend pas à une précision validée localement.

#### F04.02 — Restituer volumes et chiffre d’affaires

- **Objectif :** Comprendre l’effet commercial de la stratégie.
- **Entrées :** Scénario, hypothèses validées et calendrier F06.
- **Traitement attendu :** Estimer les volumes par période/canal et leur total ; calculer le chiffre d’affaires au prix consommateur avec format, unité et traitement fiscal explicites, distinct du revenu net LUMEN.
- **Sorties :** Séries de volumes et chiffre d’affaires estimés, détail et totaux.
- **Composant / interaction UI :** Courbes temporelles, répartition par canal, indicateurs et tableau des valeurs dans le Simulator.
- **Critère de validation / acceptation :** Sur un cas de recette calculable à la main, le total égale la somme des canaux et périodes et le chiffre d’affaires correspond aux volumes multipliés par les prix compatibles ; aucune unité n’est implicite.

#### F04.03 — Exposer les incertitudes commerciales

- **Objectif :** Éviter une lecture trop certaine des estimations.
- **Entrées :** Hypothèses centrales et variantes basses/hautes justifiées.
- **Traitement attendu :** Recalculer les variantes avec leurs hypothèses et distinguer plage de scénarios d’un intervalle statistique ; ne pas inventer de niveau de confiance.
- **Sorties :** Plage conditionnelle et facteurs d’incertitude transmis à F07.
- **Composant / interaction UI :** Courbes ou bandes de scénarios, légende et accès aux hypothèses.
- **Critère de validation / acceptation :** Les bornes sont retraçables à des variantes ; aucune mention « confiance 95 % » n’apparaît sans justification statistique ; une hypothèse indisponible est signalée.

### F05 — Évaluer les conséquences économiques

Traçabilité : FP-01 → FS-05 ; contraintes CT-03, CT-05.

#### F05.01 — Passer du prix consommateur à la contribution

- **Objectif :** Comparer les canaux sur une base économique commune.
- **Entrées :** Volumes F04, prix/formats, coûts unitaires et économie des canaux.
- **Traitement attendu :** Expliciter taxe si applicable, marges distributeur/revendeur, frais et coûts inclus ; calculer revenu net LUMEN et contribution avant marketing sans double comptage ; documenter les bases de pourcentage.
- **Sorties :** Pont prix → revenu net → contribution, par unité, canal et période.
- **Composant / interaction UI :** Table économique et graphique de décomposition avec détail des postes.
- **Critère de validation / acceptation :** Un scénario de référence réconcilie prix, déductions et coûts avec la contribution ; chaque poste n’est compté qu’une fois et la convention fiscale est visible.

#### F05.02 — Mesurer la récupération marketing

- **Objectif :** Éclairer la contrainte de retour rapide sur les dépenses marketing.
- **Entrées :** Contribution temporelle, budget et calendrier marketing, horizon commun.
- **Traitement attendu :** Calculer contribution cumulée moins dépenses marketing cumulées selon une convention visible ; définir le payback comme premier franchissement de zéro après un solde négatif ; distinguer cet indicateur de la rentabilité complète et des flux de trésorerie.
- **Sorties :** Solde cumulé et délai de récupération, avec convention et limites.
- **Composant / interaction UI :** Courbe cumulée avec seuil zéro et indicateur de payback.
- **Critère de validation / acceptation :** Les cas franchissement, absence de franchissement et données manquantes rendent respectivement une période vérifiable, « non atteint sur l’horizon » et « non calculable » ; budget nul sans investissement à récupérer rend « sans objet ».

#### F05.03 — Explorer les hypothèses économiques

- **Objectif :** Mesurer l’effet des coûts et de l’acquisition.
- **Entrées :** Coûts, déductions, budgets et hypothèses de CAC/LTV si disponibles et pertinentes.
- **Traitement attendu :** Autoriser des substitutions tracées ; recalculer les conséquences sans déduire des clients deux fois via CAC et conversion ; afficher formule et périmètre de tout ratio utilisé.
- **Sorties :** Résultats économiques révisés et écarts à la référence.
- **Composant / interaction UI :** Champs de coûts/acquisition et vue avant/après dans le Simulator.
- **Critère de validation / acceptation :** À volumes fixés, augmenter un coût unitaire réduit la contribution du montant attendu ; un CAC ou une LTV manquants ne sont ni supposés nuls ni transférés implicitement des marchés historiques.

### F06 — Éclairer le calendrier de lancement

Traçabilité : FP-01 → FS-06 ; contraintes CT-01, CT-05.

#### F06.01 — Documenter saisonnalité et contexte concurrentiel

- **Objectif :** Apprécier l’opportunité commerciale d’une période.
- **Entrées :** Indices saisonniers, météo historique et historique de prix/promotions concurrents.
- **Traitement attendu :** Aligner les périodes et présenter couverture, trous et limites ; ne pas présenter une corrélation météo comme un effet causal ni un historique comme prévision certaine.
- **Sorties :** Calendrier de signaux documentés et hypothèses temporelles pour F04.
- **Composant / interaction UI :** Vue calendrier et séries temporelles avec sources et périodes couvertes.
- **Critère de validation / acceptation :** Une période hors couverture est signalée ; une promotion historique reste identifiée comme historique ; l’effet saisonnier utilisé est inspectable et n’est appliqué qu’une fois.

#### F06.02 — Comparer des dates à paramètres constants

- **Objectif :** Isoler le compromis lié au mois de lancement.
- **Entrées :** Scénario de référence et au moins deux dates candidates.
- **Traitement attendu :** Créer des variantes ne changeant que la date ; conserver la même durée d’évaluation et afficher dates calendaires et périodes depuis lancement ; recalculer F04–F05.
- **Sorties :** Écarts commerciaux et économiques attribuables au changement de calendrier sous les règles retenues.
- **Composant / interaction UI :** Sélecteur de date et comparaison des variantes dans le Simulator.
- **Critère de validation / acceptation :** La comparaison de deux dates conserve prix, mix, budget et durée ; toute différence supplémentaire est visible et empêche de qualifier la comparaison « date seule ».

#### F06.03 — Distinguer opportunité et faisabilité

- **Objectif :** Éviter de recommander une date opérationnellement garantie sans preuve.
- **Entrées :** Résultats temporels et informations sur production, stocks et accords de distribution si fournies.
- **Traitement attendu :** Lister les préconditions renseignées, manquantes ou non vérifiées sans simuler une chaîne logistique absente du périmètre.
- **Sorties :** Date candidate conditionnelle et liste de vérifications humaines.
- **Composant / interaction UI :** Encart « Conditions de lancement à confirmer ».
- **Critère de validation / acceptation :** En l’absence d’informations logistiques, la date proposée porte une réserve explicite et ne reçoit pas un statut de faisabilité confirmé.

### F07 — Comparer les stratégies et leur robustesse

Traçabilité : FP-01 → FS-07 ; contraintes CT-03, CT-05, CT-06.

#### F07.01 — Comparer sur un référentiel commun

- **Objectif :** Rendre les compromis entre options lisibles.
- **Entrées :** Au moins deux scénarios évalués F03–F06.
- **Traitement attendu :** Vérifier horizon, unités et conventions ; présenter prix, positionnement, volumes, revenu net, contribution, marketing, payback et incertitudes ; empêcher un classement trompeur de résultats incompatibles.
- **Sorties :** Table de comparaison, différences de paramètres et limites.
- **Composant / interaction UI :** Sélection multi-scénarios, tableau comparatif et graphiques de compromis avec valeurs accessibles.
- **Critère de validation / acceptation :** Deux scénarios à horizons différents sont signalés comme incompatibles jusqu’à harmonisation ; « non calculable » n’est jamais traité comme zéro ni comme meilleur score.

#### F07.02 — Tester sensibilité et robustesse

- **Objectif :** Savoir quelles hypothèses peuvent inverser le choix.
- **Entrées :** Scénarios de référence, plages justifiées d’adoption, conversion/acquisition, coûts et autres leviers retenus.
- **Traitement attendu :** Faire varier un facteur à la fois puis des combinaisons explicites ; conserver les autres paramètres et recalculer F04–F06 ; repérer inversions de classement et conditions d’échec.
- **Sorties :** Écarts, facteurs déterminants et domaines de stabilité du choix.
- **Composant / interaction UI :** Contrôles de sensibilité, graphique d’impact et variantes pessimiste/centrale/optimiste explicites.
- **Critère de validation / acceptation :** Un jeu de recette conçu pour inverser le classement après variation des coûts montre cette inversion et sa valeur déclenchante ; toutes les plages testées sont affichées, sans garantie hors de ces plages.

#### F07.03 — Rendre les priorités de décision explicites

- **Objectif :** Laisser la direction arbitrer premium et retour marketing.
- **Entrées :** Critères documentés, priorités humaines et éventuelles pondérations.
- **Traitement attendu :** Permettre choix/modification des critères ; exposer normalisation et pondération si un score agrégé est utilisé ; conserver les valeurs brutes et permettre une comparaison sans score.
- **Sorties :** Classement conditionnel ou compromis non classés, avec règles visibles.
- **Composant / interaction UI :** Panneau des priorités, classement explicable et accès aux métriques brutes.
- **Critère de validation / acceptation :** Modifier une pondération recalcule le classement avec règle visible ; sans preuve de perception premium, aucun score premium numérique n’est fabriqué ; ex æquo et critères manquants restent explicites.

### F08 — Restituer une recommandation explicable

Traçabilité : FP-01 → FS-08 ; contraintes CT-01, CT-05, CT-06.

#### F08.01 — Composer une recommandation argumentée

- **Objectif :** Transformer les résultats en proposition de décision.
- **Entrées :** Scénarios comparés, priorités, résultats de robustesse et preuves F01–F02.
- **Traitement attendu :** Relier prix, cible/positionnement, canaux et date proposés aux résultats ; mentionner alternatives, sacrifices, risques, conditions de validité et informations manquantes.
- **Sorties :** Synthèse structurée d’une option proposée, conditionnelle si nécessaire.
- **Composant / interaction UI :** Vue Recommandation du Simulator avec liens vers scénarios, preuves et calculs.
- **Critère de validation / acceptation :** Chaque argument quantitatif renvoie à une version de résultat ; la synthèse expose au moins une alternative comparée et le compromis accepté, sans cacher les résultats défavorables.

#### F08.02 — Enregistrer le choix humain et sa justification

- **Objectif :** Préserver la responsabilité de la direction.
- **Entrées :** Proposition, alternatives et justification de l’utilisateur.
- **Traitement attendu :** Permettre de choisir une autre option ; distinguer proposition du système et choix retenu ; conserver priorités et références au moment du choix.
- **Sorties :** Décision enregistrée ou proposition non validée, avec justification.
- **Composant / interaction UI :** Action « Retenir ce scénario », champ de justification et statut de décision.
- **Critère de validation / acceptation :** L’utilisateur peut retenir une alternative sans modifier la proposition d’origine ; aucun scénario n’est marqué décidé avant une action explicite.

#### F08.03 — Partager un dossier reproductible

- **Objectif :** Permettre une revue du raisonnement hors du Simulator.
- **Entrées :** Synthèse, décision éventuelle, scénarios et versions des données/règles.
- **Traitement attendu :** Produire une restitution exportable contenant paramètres, unités, conventions, sources, limites et critères de choix ; exclure noms/emails des données clients ; signaler l’obsolescence après révision.
- **Sorties :** Dossier de décision daté, lisible et rattaché à des versions figées.
- **Composant / interaction UI :** Aperçu et action d’export du dossier ; avertissement de résultats obsolètes.
- **Critère de validation / acceptation :** Le dossier permet de retrouver paramètres et références de chaque chiffre ; modifier le scénario ensuite ne réécrit pas l’export conservé et rend visible la nécessité d’une nouvelle synthèse.

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

## Vérification d’ensemble et décisions restant à prendre

La recette fonctionnelle devra parcourir F01 → F02 → F03 → F04/F05 → F06 → F07 → F08 sur un jeu de référence maîtrisé : retrouver une source, créer deux options, modifier le prix et les hypothèses, recalculer, comparer deux dates, tester une inversion de classement, retenir une alternative et exporter son dossier. Un second parcours devra vérifier les anomalies, paramètres incomplets, échecs de calcul, résultats obsolètes et absence de données allemandes. Les cas numériques seront calculés indépendamment des futures règles implémentées, avec une tolérance d’arrondi documentée.

| Décision à arbitrer avec les parties prenantes | Exigences concernées | Condition avant validation métier |
|---|---|---|
| Horizon, pas temporel, date de référence et périmètre géographique | F03, F04, F06, F07 | Fixer un référentiel commun et ses unités |
| Budget disponible, canaux et contraintes de lancement | F03, F05, F06 | Renseigner les limites autorisées et conditions opérationnelles |
| Convention de contribution et récupération marketing, fiscalité et coûts inclus | F05 | Valider le pont économique et un exemple de calcul ; ne pas confondre payback marketing et rentabilité totale |
| Critères documentables du premium et priorités marketing/finance | F02, F07, F08 | Faire approuver les preuves, critères et éventuelles pondérations |
| Transfert NL/DK/SE vers Allemagne, portée et conversion | F04, F07 | Justifier les hypothèses, plages et domaines d’extrapolation |
| Seuils de qualité, arrondis et performances d’interaction | F01, F03–F08 | Définir des seuils mesurables après revue ; ne pas annoncer de précision prédictive ou de latence garantie à ce stade |

L’étape suivante est la revue de ces exigences avec les bénéficiaires, puis leur priorisation de réalisation et la définition des cas de recette. Le choix d’architecture, la conception détaillée des écrans, l’implémentation du site et le choix ou l’entraînement d’un modèle ML interviendront séparément après cette validation. Aucun critère ci-dessus n’est présenté comme déjà testé sur une application.

Sources : [brief LUMEN](LUMEN_Case_Brief.md) et [documentation des données](data/README_data.md).
