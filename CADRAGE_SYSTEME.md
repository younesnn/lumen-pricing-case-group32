# LUMEN — Cadrage du système

Statut : besoin et mission retenus avec l’utilisateur. Exigences fonctionnelles affinées à partir de l’audit des douze datasets du 11 septembre 2026, proposées pour revue ; hypothèses de transfert et seuils métier à arbitrer. Aucun site ni modèle ML implémenté dans cette étape.

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
| FS-02 | Éclairer la cible, le positionnement et les références commerciales | Comparaison des segments, prix, verbatims, marchés analogues et performances marketing descriptives | Relier chaque hypothèse à ses preuves, effectifs et limites, sans transformer corrélation ou intention en causalité ou ventes |
| FS-03 | Permettre de construire des scénarios de lancement | Scénarios combinant prix, positionnement, canaux, période, budget et hypothèses sur un horizon commun | Créer et conserver au moins deux scénarios distincts ; signaler les paramètres manquants ou incohérents |
| FS-04 | Estimer le potentiel commercial de chaque scénario | Estimations de volumes et de chiffre d’affaires par période et canal, sous hypothèses explicites | Reproduire une estimation à partir de ses hypothèses ; distinguer données observées, intentions déclarées et estimations allemandes |
| FS-05 | Évaluer les conséquences économiques | Revenu net, contribution et couverture budgétaire ; retour incrémental seulement avec contrefactuel explicite | Réconcilier coûts et flux ; distinguer couverture et causalité ; afficher « sans objet », « non atteint sur l’horizon » ou « non calculable » |
| FS-06 | Éclairer le choix de la période de lancement | Comparaison des périodes selon la saisonnalité et l’activité concurrentielle documentée | Comparer deux périodes en conservant les autres paramètres ; expliciter la couverture temporelle des données et les limites logistiques non modélisées |
| FS-07 | Comparer les stratégies et tester leur robustesse | Vue commune des résultats et compromis, avec effet de variations des hypothèses clés | Montrer si le classement change lorsque l’adoption, les coûts ou l’acquisition varient ; rendre visibles tout critère de classement et toute pondération |
| FS-08 | Restituer une recommandation explicable | Synthèse du scénario retenu, motifs, alternatives, sacrifices acceptés, risques et conditions de validité | Relier chaque argument aux résultats et hypothèses ; permettre à la direction de retenir une autre option |

## Résultats de l’analyse qui contraignent les fonctions

Référence : [analyse des datasets](analysis/ANALYSE_DATASETS_LUMEN.md), avec [calculs reproductibles](analysis/analyse_datasets.py). Les valeurs ci-dessous décrivent cette version des sources ; elles servent de repères de recette, pas de constantes à coder dans l’application.

| Constat vérifié | Conséquence fonctionnelle | Exigences |
|---|---|---|
| 706 lignes de ventes, dont 4 doublons exacts ; panel propre de 702 lignes = 78 semaines × 3 pays × 3 canaux ; pic commun le 28/07/2025 | Conserver les sources, tracer les exclusions, comparer avec/sans pic | F01.02, F02.04 |
| Marketing : 72 lignes mais seulement 18 mois, aucun pays, quatre canaux marketing distincts des trois canaux de vente | Ne pas fabriquer de ventilation nationale ni de jointure entre noms de canaux ; distinguer acquisition attribuée et incrémentale | F01.04, F02.05, F04.01 |
| r dépenses–unités mensuelles = 0,282 ; r dépenses–moyenne hebdomadaire = 0,418 ; r entre variations de ces dernières séries = 0,038 | Montrer la sensibilité au calcul ; aucune élasticité causale déduite de ces corrélations | F02.05, F04.03, F05.02 |
| r entre ventes hebdomadaires NL/DK/SE = 0,988–0,991, puis 0,431–0,505 après retrait de tendance et mois ; aucune vente DE | Références de profils, pas validation d’un analogue allemand ou d’un facteur d’échelle | F02.04, F04.01, F07.02 |
| Prix historiques implicites ≈ 1,31–1,39 € ; prix candidats 1,79/2,19/2,59 € ; neuf lignes de résultats mais trois acceptations distinctes | Distinguer domaine historique et points d’enquête ; pas de réponse prix causale ou propre au canal identifiée | F02.02, F03.01, F04.01 |
| 420 répondants clients et 300 répondants prix ; 216 segments discordants sur les IDs communs | Analyser séparément les enquêtes ; bloquer leur jointure individuelle sans clé validée | F01.04, F02.01 |
| Indice saisonnier : moyenne simple 101,67 ; température DE et indice corrélés à 0,945 sur 12 mois sans année | Normalisation explicite ; pas de double effet météo/saison ; ne pas appeler ces températures une série météo historique datée | F06.01 |
| Revenu de l’export = 1,620 M€ sur 78 semaines, non réconcilié avec le chiffre du brief ; définition net/brut incertaine | Conserver l’écart visible ; aucune remise à l’échelle automatique ni assimilation au revenu net LUMEN | F01.02, F05.01 |

**Portée de l’analyse déjà réalisée :** contrôle des douze fichiers, analyses des ventes et du marketing, comparaison des marchés, segments et canaux déclarés, intention moyenne et seuils de prix médians par segment. Les croisements détaillés âge/ville/segment, les courbes Van Westendorp et l’analyse complète des douze verbatims restent à réaliser et vérifier. Les exigences F02 les prévoient sans les présenter comme des résultats déjà établis. Le caractère synthétique/construit du cas reste visible ; une cohérence interne ne constitue pas une validation externe.

## Architecture fonctionnelle et règles de lecture

La décomposition suit la chaîne **besoin → mission → FP-01 → fonctions de service → sous-fonctions/exigences → interactions → vérification**. Les identifiants F01 à F08 correspondent respectivement aux FS-01 à FS-08 ci-dessus ; les identifiants Fxx.yy désignent des exigences filles stables. Chaque exigence ci-dessous est requise dans le périmètre fonctionnel proposé ; l’ordre de réalisation reste à planifier après revue. Les composants UI décrivent le service attendu, sans imposer de framework, de maquette ou d’algorithme.

**F01 et F02 constituent les fondations** : données qualifiées, preuves et limites alimentent les hypothèses du **Strategy Simulator, cœur fonctionnel F03 à F08**. Son parcours est : construire un scénario (F03), estimer ses résultats (F04–F05), faire varier sa période (F06), comparer et éprouver les options (F07), puis justifier un choix humain (F08). Une modification revient à F03 et déclenche une nouvelle évaluation ; elle ne modifie jamais silencieusement une recommandation déjà conservée.

Le scénario commun conserve aussi le mode de calcul commercial, les éventuels poids d’analogues et facteur d’échelle DE, la convention saisonnière, la déduplication supposée, l’incrémentalité, la base organique et le contrefactuel si un retour incrémental est demandé.

Le scénario commun contient : identifiant et version, nom, cible et positionnement argumenté, périmètre géographique, prix et format de vente par canal, canaux et mix, date de lancement, horizon et pas temporel, budget et allocation marketing, hypothèses de portée, adoption, conversion et réachat si utilisé, coûts et déductions, références des données et règles de calcul. Chaque paramètre indique sa valeur, son unité, sa provenance, son statut (observé, hypothèse ou dérivé) et son domaine de validité. Une valeur non disponible reste explicitement manquante ; elle ne devient pas zéro.

Les paramètres de stratégie et les hypothèses doivent pouvoir être modifiés dans le Simulator. Les données sources restent consultables ; une substitution utilisateur devient une hypothèse distincte et traçable. Les paramètres dérivés affichent leur règle de calcul. Tout résultat porte l’identifiant de sa version de scénario, des données et des règles utilisées. Les états requis sont : brouillon, invalide/incomplet, prêt à évaluer, en cours, évalué, obsolète après modification et échec explicite. Seuls les résultats compatibles et à jour peuvent soutenir une comparaison ou une recommandation.

## Exigences détaillées par fonction

Les critères ci-dessous sont des **conditions de recette à exécuter ultérieurement**, et non des preuves de fonctionnement actuel. La conformité documentaire vérifie leur présence et leur traçabilité ; la validation métier confirmera leur adéquation à la décision de Freya, Jonas et Elena.

### F01 — Fournir une base d’analyse fiable et traçable

Traçabilité : FP-01 → FS-01 ; contraintes CT-01, CT-04, CT-05, CT-08, CT-09.

#### F01.01 — Cataloguer et qualifier les sources

- **Objectif :** Savoir sur quelles preuves repose une décision.
- **Entrées :** Les douze exhibits et leur documentation, métadonnées de pays, période, unité et nature.
- **Traitement attendu :** Inventorier les douze CSV, distinguer observation rapportée, enquête synthétique, estimation, projection et hypothèse ; conserver version, unité, granularité, clés, pays renseigné ou absent, dates et définition des variables. Distinguer lignes, entités et périodes distinctes. Ne pas inférer un pays absent du funnel.
- **Sorties :** Catalogue et limites de couverture, dont absence de ventes allemandes.
- **Composant / interaction UI :** Page Données / Sources, filtres pays, période, produit et canal lorsque disponibles ; fiche source.
- **Critère de validation / acceptation :** Le catalogue retrouve 78 semaines de ventes et 18 mois marketing sur cette version ; le marketing affiche « pays non renseigné » et la saisonnalité « 12 mois de l’année, sans année ». Aucune vente historique LUMEN n’est présentée comme allemande.

#### F01.02 — Contrôler la qualité et protéger les données

- **Objectif :** Éviter des résultats biaisés ou des restitutions nominatives.
- **Entrées :** Données brutes, règles de contrôle, champs personnels identifiés.
- **Traitement attendu :** Conserver les bruts ; détecter doublons exacts et conflits de clé séparément, manques, unités incohérentes et valeurs atypiques. Exclure uniquement les copies exactes dans la vue analytique par défaut, en traçant les lignes ; conserver le pic dans la référence et offrir une sensibilité sans lui. Distinguer composants de coût, total et KPI. Exclure noms/emails avant analyse et restitution. Signaler les écarts entre brief et export sans correction inventée.
- **Sorties :** Rapport qualité, données analytiques sans noms/emails et journal de transformations.
- **Composant / interaction UI :** Table de qualité avec statut et détail des anomalies, sans champs personnels.
- **Critère de validation / acceptation :** Sur cette version, retrouver 706 lignes brutes, 4 copies exclues et 702 clés semaine–pays–canal uniques, avec 78 lignes par série. Le pic du 28/07/2025 reste dans la référence et son exclusion est réversible. Le total COGS et le KPI ne sont pas additionnés aux composants ; le manque du pourcentage du KPI reste distinct de zéro. Aucun nom/email n’apparaît dans les vues ou exports.

#### F01.03 — Tracer les indicateurs jusqu’aux sources

- **Objectif :** Permettre de vérifier et reproduire une analyse.
- **Entrées :** Indicateur, filtres, versions des données et transformations.
- **Traitement attendu :** Associer chaque indicateur aux versions de sources, unités, formule, filtres, exclusions, dénominateur, taille brute et nombre de périodes/paires utilisées. Pour une corrélation, exposer les séries, alignement, transformation et décalage. Signaler séries constantes, paires insuffisantes et absence de données ; ne pas produire un zéro par défaut.
- **Sorties :** Fiche de provenance et résumé descriptif reproductible.
- **Composant / interaction UI :** Action « Voir les sources et le calcul » depuis chaque indicateur.
- **Critère de validation / acceptation :** Depuis un indicateur filtré, retrouver ses entrées et recalculer sa valeur. Une corrélation après différence mensuelle indique 17 paires sur la version actuelle, pas 72 ou 702. Un filtre vide ou une série constante produit un état non calculable et une raison.

#### F01.04 — Aligner les tables sans fabriquer de données

- **Objectif :** Préserver les populations, temporalités et clés réellement disponibles.
- **Entrées :** Tables qualifiées, dictionnaire des clés et conventions d’agrégation.
- **Traitement attendu :** Bloquer la jointure individuelle des enquêtes par le seul respondent_id. Pour marketing–ventes, proposer une analyse agrégée sous hypothèse explicite de périmètre commun NL/DK/SE ; affecter les semaines au mois de début et afficher leur nombre, les débordements et les limites, avec variante moyenne hebdomadaire. Aucune ventilation du budget par pays n’est reconstruite. Tout pont marketing–vente est une hypothèse de scénario, jamais une clé source observée.
- **Sorties :** Tables d’analyse et journal d’alignement, hypothèses de périmètre, effectifs temporels et avertissements de couverture.
- **Composant / interaction UI :** Fiche de rapprochement des sources et choix d’agrégation dans les vues analytiques.
- **Critère de validation / acceptation :** La jointure des enquêtes sans clé validée est refusée ; l’audit retrouve 216 discordances de segments sur leurs 300 IDs communs. Le rapprochement marketing–ventes produit 18 dates, pas 702 répétitions d’un budget ; aucune corrélation propre à un pays n’est affichée sans dépenses nationales. Une corrélation agrégée n’est calculée qu’après explicitation du périmètre supposé.

### F02 — Analyser la clientèle, le positionnement et les références commerciales

Traçabilité : FP-01 → FS-02 ; contraintes CT-01, CT-02, CT-05, CT-06, CT-07, CT-08, CT-09.

#### F02.01 — Caractériser les segments et canaux préférés

- **Objectif :** Éclairer le choix de la cible initiale.
- **Entrées :** Contexte de marché, enquête clients, périmètre et données qualifiées F01.
- **Traitement attendu :** Dans chaque enquête séparément, comparer segments, âge, ville, dépenses de boissons, fréquence déclarée, canaux préférés, notoriété concurrente et intention LUMEN. Proposer distributions et croisements avec effectifs, bases des pourcentages et manques. Distinguer moyennes et médianes ; ne pas extrapoler les parts de l’échantillon à la population, ni fréquence de boissons et intention LUMEN à des ventes LUMEN. Signaler les groupes de faible effectif selon un seuil documenté à arbitrer.
- **Sorties :** Profils filtrables et tableaux de distributions/croisements, effectifs, limites de représentativité et pistes de cible conditionnelles.
- **Composant / interaction UI :** Vue Segments, filtres et graphiques comparatifs accompagnés d’un tableau chiffré.
- **Critère de validation / acceptation :** Sans filtre, retrouver 420 répondants et les préférences Retail 46,4 %, DTC 28,3 %, Gym 25,2 % à 0,1 point près. Un filtre recalcule ses dénominateurs et effectifs. Les 300 répondants prix restent une population séparée ; aucun volume ne découle de l’intention seule.

#### F02.02 — Comparer les offres et la sensibilité au prix

- **Objectif :** Argumenter une plage de prix et un positionnement.
- **Entrées :** Prix concurrents par canal/format, enquêtes de prix et tests des trois prix candidats.
- **Traitement attendu :** Comparer les prix par canal/format après vérification de l’unité des champs (prix de pack ou par canette), sans diviser deux fois un prix déjà unitaire. Montrer distributions et médianes des quatre seuils de prix, par segment. Pour les courbes Van Westendorp, documenter sens de cumul, règles de seuil, population et intersections ; contrôler l’ordre des réponses et les exclusions, sans forcer une intersection. Distinguer plage d’acceptabilité déclarée, trois acceptations estimées et prix réalisé implicite. Les neuf lignes des prix candidats ne sont pas neuf tests indépendants ni une preuve de différence de demande par canal. Les axes de positionnement doivent être sourcés.
- **Sorties :** Comparateur de prix, seuils et courbes d’acceptabilité déclarée, effectifs, repères candidats et domaines documentés ; aucun « prix optimal de profit » déduit du seul sondage.
- **Composant / interaction UI :** Comparateur prix/canal et carte de positionnement uniquement si ses axes sont documentables ; détail des preuves.
- **Critère de validation / acceptation :** Les trois taux 61,7/51,7/26,7 % apparaissent comme estimations répétées sur les canaux. Les prix candidats sont signalés hors du domaine historique ≈ 1,31–1,39 €, même s’ils sont couverts par l’enquête. Une recette de réponses connues valide cumul et intersection ; absence d’intersection ou effectif insuffisant reste explicite. Aucun taux déclaré n’est étiqueté élasticité causale.

#### F02.03 — Confronter les preuves et transmettre des hypothèses

- **Objectif :** Relier l’analyse au scénario sans masquer les contradictions.
- **Entrées :** Résultats quantitatifs, verbatims non nominatifs et proposition de cible/positionnement.
- **Traitement attendu :** Examiner les douze verbatims, les rattacher aux segments et aux résultats quantitatifs correspondants avec références exactes. Distinguer citation, thème et interprétation ; rendre visibles convergences et contradictions sans inventer de fréquence représentative. Proposer des hypothèses de cible, prix ou canal, soumises à un choix explicite avant F03.
- **Sorties :** Dossier de preuves et hypothèses sourcées pour F03.
- **Composant / interaction UI :** Panneau quantitatif/qualitatif et action « Utiliser dans un scénario ».
- **Critère de validation / acceptation :** Chaque verbatim est consultable avec son segment et sa source ; une contradiction sélectionnée pour la recette reste visible à côté de la mesure concernée. Le transfert vers F03 conserve source, population et statut « hypothèse » ; une part de préférence n’est pas convertie automatiquement en part des ventes.

#### F02.04 — Évaluer les références NL/DK/SE pour l’Allemagne

- **Objectif :** Déterminer quelles caractéristiques peuvent alimenter des hypothèses de transfert.
- **Entrées :** Panel de ventes qualifié, contexte DE et préférences d’enquête, règles d’alignement F01.04.
- **Traitement attendu :** Comparer niveaux, profils normalisés, mix, prix implicites et promotions par pays/canal ; calculer corrélations des niveaux et des différences hebdomadaires, puis diagnostic après retrait d’une tendance linéaire et des mois du logarithme des ventes. Exposer le retrait de tendance comme diagnostic, pas comme identification causale. Comparer avec/sans semaine du pic. Distinguer parts de volumes analogues et préférences déclarées DE. Proposer des références séparées ou une combinaison à poids explicites, sans meilleur analogue automatique.
- **Sorties :** Dossier de comparabilité : similitudes, différences, variables absentes, usages admissibles et hypothèses de poids/échelle transmissibles à F03.
- **Composant / interaction UI :** Vue Marchés analogues, courbes en niveau/indice, tableau de mix et matrice de corrélations avec effectifs et choix du diagnostic.
- **Critère de validation / acceptation :** Sur le panel de référence, retrouver r NL–DK ≈ 0,991 sur 78 semaines et ≈ 0,505 sur les résidus selon la méthode documentée, à 0,001 près. L’absence de ventes DE empêche une corrélation DE–analogue et un label d’équivalence validée ; les poids et le facteur d’échelle restent hypothétiques.

#### F02.05 — Décrire les performances marketing et leurs limites

- **Objectif :** Fournir des repères d’acquisition et examiner les associations avec les ventes sans leur attribuer une causalité.
- **Entrées :** Funnel mensuel, ventes agrégées selon F01.04, métadonnées et hypothèse de périmètre.
- **Traitement attendu :** Afficher dépenses, reach, engagements, acquisitions attribuées et taux dont les dénominateurs sont explicites. Calculer CAC pondéré = somme dépenses / somme acquisitions ; ne pas prendre la moyenne simple des CAC ni considérer le CAC dérivé comme information indépendante. Signaler la déduplication intercanaux non vérifiable. Examiner corrélations agrégées, variantes de durée, différences et décalages 0/1/2 mois avec leurs effectifs ; pas de sélection automatique d’un délai causal. Exposer la LTV comme estimation. L’indice marketing concurrent reste un repère ordinal par marque, pas des dépenses EUR ou un instrument causal.
- **Sorties :** Tableau d’efficacité attribuée, diagnostic d’associations et liste explicite des effets non identifiables : incrémentalité, saturation, causalité nationale et unités par client.
- **Composant / interaction UI :** Vue Marketing, funnel et séries temporelles avec tableau chiffré, hypothèses et détail des calculs ; action pour proposer un CAC au scénario sous statut d’hypothèse.
- **Critère de validation / acceptation :** Retrouver 1 176 890,04 € / 26 742 = 44,01 € de CAC pondéré. Sous périmètre commun explicite, retrouver r dépenses–unités ≈ 0,282 (18 mois), r dépenses–moyenne hebdomadaire ≈ 0,418 (18) et r des différences de ces dernières ≈ 0,038 (17), à 0,001 près. Les sorties ne promettent aucun ROI causal ; acquisitions nulles rendent le CAC non calculable.

### F03 — Construire et modifier les scénarios

Traçabilité : FP-01 → FS-03 ; contraintes CT-03, CT-05, CT-06, CT-07, CT-08, CT-09.

#### F03.01 — Paramétrer la stratégie complète

- **Objectif :** Explorer les leviers de lancement depuis un espace commun.
- **Entrées :** Fondations F01–F02 et paramètres du scénario commun.
- **Traitement attendu :** Permettre la saisie des leviers et hypothèses avec unités, sources, domaines et justification des valeurs initiales. Séparer les trois canaux de vente des quatre canaux marketing, leur mix et leurs allocations. Renseigner périmètre accessible, montée en charge, demande organique, CAC DE, incrémentalité, panier/réachat si utilisés, et hypothèses de transfert. Aucun CAC historique, mix d’enquête ou coefficient d’échelle ne devient silencieusement une valeur allemande validée.
- **Sorties :** Scénario brouillon complet ou liste de champs restant à renseigner.
- **Composant / interaction UI :** Formulaire central du Strategy Simulator : prix, cible, positionnement, canaux, calendrier, budget et hypothèses ; saisie numérique précise et curseur si adapté.
- **Critère de validation / acceptation :** L’utilisateur peut modifier chaque levier. Les trois prix candidats sont accessibles avec leur statut d’enquête et l’avertissement d’extrapolation historique. Deux allocations indépendantes sont affichées ; changer le budget Paid Social ne change pas implicitement la part DTC. Toute valeur initiale dérivée des analogues conserve sa source et demande l’acceptation de l’hypothèse de transfert.

#### F03.02 — Valider et lancer une évaluation cohérente

- **Objectif :** Garantir que les résultats correspondent aux paramètres affichés.
- **Entrées :** Scénario, contraintes et domaines de validité des règles de calcul.
- **Traitement attendu :** Vérifier les paramètres requis par la chaîne choisie, les unités, dates, horizons, volumes non négatifs, taux bornés et allocations à 100 % quand elles s’appliquent. Exiger un CAC strictement positif si budget/CAC est utilisé. Budget nul rend l’allocation marketing sans objet. Distinguer erreur bloquante, extrapolation et hypothèse à confirmer. Une donnée absente bloque seulement les résultats qui en dépendent ; autoriser la consultation des preuves et marges unitaires disponibles. Toute modification invalide les résultats affectés et les recommandations associées.
- **Sorties :** Scénario prêt ou erreurs localisées ; nouvelle évaluation F04–F05 avec version identifiable.
- **Composant / interaction UI :** Messages au champ, bouton « Simuler », état de calcul et indication « résultats à recalculer ».
- **Critère de validation / acceptation :** Un mix à 110 %, un CAC nul avec budget positif ou un taux d’incrémentalité hors [0,1] bloque les sorties dépendantes. Une conversion manquante laisse les marges unitaires consultables mais rend les volumes non calculables. Budget nul n’exige pas de fausse allocation. Changer un prix rend les résultats concernés obsolètes ; un échec ne conserve pas de chiffres présentés comme à jour.

#### F03.03 — Conserver et dupliquer les scénarios

- **Objectif :** Comparer des alternatives reproductibles.
- **Entrées :** Scénario et résultats, références des sources et règles.
- **Traitement attendu :** Nommer, enregistrer et dupliquer les scénarios en conservant hypothèses acceptées, règles de transfert, profil saisonnier, traitements qualité et versions des calculs. Restaurer les paramètres sans remplacer les sources ni changer rétroactivement un résultat ; signaler toute nouvelle version de données nécessitant un recalcul.
- **Sorties :** Au moins deux scénarios distincts avec historique des paramètres et résultats associés.
- **Composant / interaction UI :** Liste des scénarios, actions enregistrer, dupliquer et consulter une version.
- **Critère de validation / acceptation :** Modifier B dupliqué de A ne change pas A ; rouvrir A restitue paramètres, mode commercial, exclusions et références exacts. Une mise à jour des données crée une nouvelle évaluation et conserve le résultat antérieur identifiable.

### F04 — Estimer le potentiel commercial

Traçabilité : FP-01 → FS-04 ; contraintes CT-01, CT-02, CT-05, CT-07, CT-08, CT-09.

#### F04.01 — Expliciter le passage vers des ventes allemandes

- **Objectif :** Rendre inspectable le raisonnement d’estimation.
- **Entrées :** Scénario valide, historiques NL/DK/SE, contexte allemand, enquêtes et funnel marketing.
- **Traitement attendu :** Choisir et documenter une chaîne de calcul allemande. Soit une base de demande transférée depuis les analogues avec facteur d’échelle/portée explicitement hypothétique, soit une chaîne d’acquisition budget/CAC DE, incrémentalité, allocation de vente et unités par client/cohorte. Dans le second cas, renseigner la déduplication intercanaux, ou déclarer une hypothèse explicite d’absence de chevauchement ; prévoir disponibilité et montée en charge du referral. Séparer demande organique et demande incrémentale. Ne pas ajouter des acquisitions à une base analogue qui les inclut déjà sans décomposition. Pour faire varier les volumes avec le prix, exiger une réponse prix hypothétique documentée : aucune élasticité causale n’est identifiée par les fichiers. L’interpolation des acceptations déclarées reste une hypothèse distincte de conversion réelle.
- **Sorties :** Chaîne de calcul modifiable, populations et unités traçables, volumes conditionnels ou résultats dépendants non calculables ; diagnostic des paramètres manquants.
- **Composant / interaction UI :** Panneau « Hypothèses commerciales » modifiable et détail de la chaîne de calcul.
- **Critère de validation / acceptation :** Sans portée/échelle nécessaire ou sans unités par client, aucun volume certain n’apparaît. Budget/CAC produit des clients attribués avant toute conversion en unités. Une recette hypothétique de 1 000 € / 50 € donne 20 clients attribués ; avec incrémentalité 0,5, absence de chevauchement et 6 unités/client, elle donne 60 unités incrémentales avant allocation et calendrier. L’interface identifie ces valeurs comme hypothèses de recette, pas estimations DE. Une réponse prix absente n’empêche pas la marge unitaire mais empêche de prétendre prévoir la variation de demande.

#### F04.02 — Restituer volumes et chiffre d’affaires

- **Objectif :** Comprendre l’effet commercial de la stratégie.
- **Entrées :** Scénario, hypothèses validées et calendrier F06.
- **Traitement attendu :** Combiner les composantes de demande définies en F04.01 sans double comptage, allouer par canal et période puis appliquer prix et format compatibles. Afficher calendrier de cohorte, panier et réachat lorsqu’ils sont utilisés ; conserver les décimales intermédiaires et une règle d’arrondi de restitution. Distinguer chiffre d’affaires consommateur, revenu net LUMEN et revenu enregistré dans l’export historique.
- **Sorties :** Séries de volumes et chiffre d’affaires estimés, détail et totaux.
- **Composant / interaction UI :** Courbes temporelles, répartition par canal, indicateurs et tableau des valeurs dans le Simulator.
- **Critère de validation / acceptation :** La recette de F04.01 allouée à 60 %/40 % donne 36/24 unités et conserve 60 au total. Les sommes périodes/canaux se réconcilient avant arrondi. Le CA égale unités × prix compatible ; le revenu historique n’est pas relabellisé net LUMEN sans convention validée.

#### F04.03 — Exposer les incertitudes commerciales

- **Objectif :** Éviter une lecture trop certaine des estimations.
- **Entrées :** Hypothèses centrales et variantes basses/hautes justifiées.
- **Traitement attendu :** Recalculer des variantes prudent/central/favorable avec plages sourcées ou choisies explicitement ; distinguer incertitude de données, transfert, acquisition et réachat. Aucun coefficient marketing, effet retardé, saturation ou élasticité ne devient causal du seul fait d’une régression. Une estimation hors domaine porte son avertissement ; les bornes sont des scénarios conditionnels, pas une précision statistique allemande validée.
- **Sorties :** Plage conditionnelle et facteurs d’incertitude transmis à F07.
- **Composant / interaction UI :** Courbes ou bandes de scénarios, légende et accès aux hypothèses.
- **Critère de validation / acceptation :** Les bornes sont reliées aux hypothèses exactes et aucun niveau de confiance n’est inventé. Un modèle ajusté sur NL/DK/SE ne reçoit pas un label « validé Allemagne ». Une hypothèse manquante reste visible et ne rétrécit pas artificiellement la plage.

### F05 — Évaluer les conséquences économiques

Traçabilité : FP-01 → FS-05 ; contraintes CT-03, CT-05, CT-07.

#### F05.01 — Passer du prix consommateur à la contribution

- **Objectif :** Comparer les canaux sur une base économique commune.
- **Entrées :** Volumes F04, prix/formats, coûts unitaires et économie des canaux.
- **Traitement attendu :** Établir une convention explicite de prix consommateur, taxes/consigne si pertinentes, revenu net et déductions ; signaler les traitements absents des sources. Utiliser les cinq composants COGS ou leur total 0,62 €, jamais les deux ni le KPI de marge 30 comme coût. Tracer les bases de marge revendeur/distributeur, frais et fulfillment ; signaler si le forfait inclut déjà un poste allemand. Ne pas transposer silencieusement les conventions historiques non réconciliées.
- **Sorties :** Pont prix → revenu net → contribution, par unité, canal et période.
- **Composant / interaction UI :** Table économique et graphique de décomposition avec détail des postes.
- **Critère de validation / acceptation :** Selon la convention illustrative du fichier, à 2,19 € DTC le net est 2,19 × (1−0,029) − 0,35 = 1,77649 €, et la contribution après COGS 0,62 € vaut 1,15649 €, soit 1,16 € arrondi. Retail utilise les déductions illustratives sur leur base documentée, pas une multiplication successive non prévue. La fiscalité non renseignée reste à confirmer et aucune déduction n’est appliquée deux fois.

#### F05.02 — Évaluer la couverture du budget et le retour incrémental conditionnel

- **Objectif :** Éclairer la contrainte de retour rapide sur les dépenses marketing.
- **Entrées :** Contribution temporelle, budget et calendrier marketing, horizon commun.
- **Traitement attendu :** Séparer (a) couverture du budget marketing par la contribution totale du scénario et (b) retour incrémental par rapport à un contrefactuel. Pour (a), calculer contribution cumulée avant marketing moins dépenses marketing cumulées, sans qualifier la couverture de preuve causale. Pour (b), exiger scénario de référence, mêmes horizon/conventions et contribution additionnelle ainsi que dépense additionnelle clairement définies. Le délai est le premier franchissement de zéro après un solde négatif, avec signalement d’un éventuel passage ultérieur sous zéro. Distinguer ces calculs de la rentabilité complète et de la trésorerie. LTV/CAC seul ne produit aucun délai.
- **Sorties :** Courbe de couverture budgétaire et délai conditionnel ; retour incrémental uniquement si contrefactuel et flux sont renseignés, avec statut d’hypothèse ou preuve expérimentale.
- **Composant / interaction UI :** Courbe cumulée avec seuil zéro, définition de couverture budgétaire et vue incrémentale séparée si calculable.
- **Critère de validation / acceptation :** Sans contrefactuel, le libellé est « couverture du budget marketing par la contribution » et le ROI incrémental est non calculable. Avec solde initial −100 puis contributions nettes +60/+60, le premier franchissement est en période 2. Sans franchissement : « non atteint sur l’horizon » ; données requises manquantes : « non calculable » ; aucune dépense/investissement : « sans objet ». Aucun résultat n’est présenté comme effet causal mesuré par les données actuelles.

#### F05.03 — Explorer les hypothèses économiques

- **Objectif :** Mesurer l’effet des coûts et de l’acquisition.
- **Entrées :** Coûts, déductions, budgets et hypothèses de CAC/LTV si disponibles et pertinentes.
- **Traitement attendu :** Modifier les coûts et hypothèses d’acquisition avec provenance et domaine ; distinguer CAC moyen historique, CAC DE supposé et CAC marginal non identifié. Afficher LTV comme estimation avec horizon, définition revenu/contribution et coûts inclus ; si ces définitions manquent, limiter son interprétation et ne pas calculer de payback à partir du ratio. Recalculer sans compter deux fois conversion, acquisition ou dépenses.
- **Sorties :** Résultats économiques révisés et écarts à la référence.
- **Composant / interaction UI :** Champs de coûts/acquisition et vue avant/après dans le Simulator.
- **Critère de validation / acceptation :** À volumes fixes, +0,10 € de coût/unité sur 100 unités réduit la contribution de 10 €. Un CAC DE manquant ne prend pas automatiquement la valeur 44,01 €. Une hausse du budget ne promet pas des rendements linéaires hors de l’hypothèse et du domaine déclarés ; une LTV sans horizon reste non validée pour le payback.

### F06 — Éclairer le calendrier de lancement

Traçabilité : FP-01 → FS-06 ; contraintes CT-01, CT-05, CT-09.

#### F06.01 — Documenter saisonnalité et contexte concurrentiel

- **Objectif :** Apprécier l’opportunité commerciale d’une période.
- **Entrées :** Indice mensuel de demande, températures moyennes DE par mois sans année, dates des ventes et historique concurrentiel daté.
- **Traitement attendu :** Afficher le calendrier couvert et aligner selon F01.04. Normaliser l’indice selon une convention explicite de moyenne mensuelle ou de pondération calendaire, adaptée au volume de base ; ne pas renormaliser silencieusement chaque fenêtre de lancement pour annuler la saison. Séparer saisonnalité et montée en charge. Les températures moyennes DE ne sont ni une météo observée NL/DK/SE ni une prévision. Ne pas appliquer un multiplicateur météo en plus de la saison sans justification indépendante. Conserver les promotions concurrentes comme événements historiques, sans effet causal estimé sur LUMEN.
- **Sorties :** Calendrier de signaux documentés et hypothèses temporelles pour F04.
- **Composant / interaction UI :** Vue calendrier et séries temporelles avec sources et périodes couvertes.
- **Critère de validation / acceptation :** Sur les douze mois, retrouver une moyenne brute 101,6667 ; sous convention de moyenne simple, les facteurs divisés par cette moyenne ont une moyenne 1. Une pondération calendaire conserve son total de référence. Les prix concurrents couvrent septembre 2025–août 2026, dont dix mois communs avec les ventes ; les périodes hors couverture restent signalées. Le facteur saisonnier n’est appliqué qu’une fois.

#### F06.02 — Comparer des dates à paramètres constants

- **Objectif :** Isoler le compromis lié au mois de lancement.
- **Entrées :** Scénario de référence et au moins deux dates candidates.
- **Traitement attendu :** Créer des variantes ne changeant que la date, avec même durée depuis lancement, même portée, mêmes profils de montée en charge et de dépenses relatifs au lancement, même prix/mix et même convention de saisonnalité. Afficher calendrier absolu et relatif ; ne pas compléter la concurrence future par un historique présenté comme certain.
- **Sorties :** Écarts commerciaux et économiques attribuables au changement de calendrier sous les règles retenues.
- **Composant / interaction UI :** Sélecteur de date et comparaison des variantes dans le Simulator.
- **Critère de validation / acceptation :** Deux dates conservent paramètres et durée ; les différences proviennent seulement des règles calendaires explicites. Désactiver la saisonnalité et tout autre effet calendaire dans une recette rend les résultats identiques sur un nombre identique de périodes. Un autre changement visible empêche le label « date seule ».

#### F06.03 — Distinguer opportunité et faisabilité

- **Objectif :** Éviter de recommander une date opérationnellement garantie sans preuve.
- **Entrées :** Résultats temporels et informations sur production, stocks et accords de distribution si fournies.
- **Traitement attendu :** Lister les préconditions renseignées, manquantes ou non vérifiées sans simuler une chaîne logistique absente du périmètre.
- **Sorties :** Date candidate conditionnelle et liste de vérifications humaines.
- **Composant / interaction UI :** Encart « Conditions de lancement à confirmer ».
- **Critère de validation / acceptation :** En l’absence d’informations logistiques, la date proposée porte une réserve explicite et ne reçoit pas un statut de faisabilité confirmé.

### F07 — Comparer les stratégies et leur robustesse

Traçabilité : FP-01 → FS-07 ; contraintes CT-03, CT-05, CT-06, CT-07, CT-09.

#### F07.01 — Comparer sur un référentiel commun

- **Objectif :** Rendre les compromis entre options lisibles.
- **Entrées :** Au moins deux scénarios évalués F03–F06.
- **Traitement attendu :** Vérifier versions à jour, horizon, unités, conventions économiques et définitions de demande/retour. Montrer prix, positionnement, volumes, revenu net, contribution, marketing, couverture budgétaire, retour incrémental si calculable et hypothèses. Présenter différences de paramètres et de méthodes, pas seulement résultats ; interdire un classement mêlant couverture totale et retour incrémental comme une même métrique.
- **Sorties :** Table de comparaison, différences de paramètres et limites.
- **Composant / interaction UI :** Sélection multi-scénarios, tableau comparatif et graphiques de compromis avec valeurs accessibles.
- **Critère de validation / acceptation :** Deux horizons ou définitions de retour incompatibles bloquent le classement concerné jusqu’à harmonisation. Les méthodes ou hypothèses différentes restent visibles. Un résultat non calculable ne vaut ni zéro ni meilleur score ; les autres métriques comparables restent consultables.

#### F07.02 — Tester sensibilité et robustesse

- **Objectif :** Savoir quelles hypothèses peuvent inverser le choix.
- **Entrées :** Scénarios de référence, plages justifiées d’adoption, conversion/acquisition, coûts et autres leviers retenus.
- **Traitement attendu :** Faire varier d’abord un facteur, puis des combinaisons nommées : facteur d’échelle DE, choix/poids des analogues, mix, conversion, CAC DE, incrémentalité, panier/réachat, réponse prix et coûts. Inclure une sensibilité avec/sans pic et aux conventions saisonnières lorsque ces éléments alimentent le scénario. Exposer plages, choix humain et domaines. Repérer inversions de classement sans transformer la stabilité testée en garantie externe.
- **Sorties :** Écarts, facteurs déterminants et domaines de stabilité du choix.
- **Composant / interaction UI :** Contrôles de sensibilité, graphique d’impact et variantes pessimiste/centrale/optimiste explicites.
- **Critère de validation / acceptation :** Une recette construite pour inverser le choix affiche la valeur de bascule. Les scénarios prudent/central/favorable affichent leurs paramètres, sans intervalle de confiance fictif. Le contrôle à un facteur garde les autres fixes ; des poids d’analogues différents ne sont jamais qualifiés de validation allemande.

#### F07.03 — Rendre les priorités de décision explicites

- **Objectif :** Laisser la direction arbitrer premium et retour marketing.
- **Entrées :** Critères documentés, priorités humaines et éventuelles pondérations.
- **Traitement attendu :** Permettre choix/modification des critères ; exposer normalisation et pondération si un score agrégé est utilisé ; conserver les valeurs brutes et permettre une comparaison sans score.
- **Sorties :** Classement conditionnel ou compromis non classés, avec règles visibles.
- **Composant / interaction UI :** Panneau des priorités, classement explicable et accès aux métriques brutes.
- **Critère de validation / acceptation :** Modifier une pondération recalcule le classement avec règle visible ; sans preuve de perception premium, aucun score premium numérique n’est fabriqué ; ex æquo et critères manquants restent explicites.

### F08 — Restituer une recommandation explicable

Traçabilité : FP-01 → FS-08 ; contraintes CT-01, CT-05, CT-06, CT-07, CT-09.

#### F08.01 — Composer une recommandation argumentée

- **Objectif :** Transformer les résultats en proposition de décision.
- **Entrées :** Scénarios comparés, priorités, résultats de robustesse et preuves F01–F02.
- **Traitement attendu :** Relier cible, prix, canaux, calendrier et compromis aux preuves F02 et résultats versionnés. Séparer constat descriptif, hypothèse retenue et conséquence simulée. Indiquer limites de transfert, causalité marketing non identifiée, extrapolation prix, contradictions qualitatives et collecte nécessaire ; ne recommander aucun optimum global si des entrées déterminantes manquent.
- **Sorties :** Synthèse structurée d’une option proposée, conditionnelle si nécessaire.
- **Composant / interaction UI :** Vue Recommandation du Simulator avec liens vers scénarios, preuves et calculs.
- **Critère de validation / acceptation :** Chaque argument chiffré renvoie à une source ou simulation et indique sa nature. La synthèse présente une alternative, ses avantages et le sacrifice retenu. Elle ne reformule jamais « r = 0,282 » comme « +1 € cause X ventes » et ne transforme pas l’acceptation déclarée en part de marché.

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
- **Traitement attendu :** Exporter scénario et hypothèses, valeurs, unités, conventions, version des sources/règles, filtres, exclusions, effectifs pertinents, mode de transfert et domaines de validité. Inclure preuves contradictoires, métriques non calculables, écarts non réconciliés et décisions restantes. Exclure noms/emails ; conserver une version figée et signaler les révisions.
- **Sorties :** Dossier de décision daté, lisible et rattaché à des versions figées.
- **Composant / interaction UI :** Aperçu et action d’export du dossier ; avertissement de résultats obsolètes.
- **Critère de validation / acceptation :** Un lecteur retrouve l’origine et la nature de chaque chiffre clé ainsi que les hypothèses permettant de le recalculer. Le dossier indique les limites marketing et l’absence de ventes DE ; une modification du scénario ne réécrit pas l’export conservé.

## Contraintes transversales proposées

| ID | Contrainte | Conséquence pour le cahier des charges |
|---|---|---|
| CT-01 | Absence de ventes historiques LUMEN en Allemagne | Identifier les estimations allemandes et documenter le transfert depuis les marchés existants ; ne pas annoncer une précision validée en Allemagne |
| CT-02 | Distinction entre intention, adoption et ventes | Ne pas assimiler directement un taux d’acceptation déclaré à une part de marché ou à un volume vendu |
| CT-03 | Comparabilité économique | Expliciter unités, formats de vente, prix consommateur, revenu net LUMEN et déductions par canal ; ne pas compter deux fois les mêmes coûts |
| CT-04 | Protection des données | Exclure les noms et adresses email des analyses et restitutions, car ils ne sont pas nécessaires à la mission |
| CT-05 | Explicabilité et reproductibilité | Conserver les paramètres et les règles de calcul utilisés pour chaque résultat ; indiquer les données insuffisantes |
| CT-06 | Décision humaine | Rendre les priorités visibles et modifiables ; ne pas imposer silencieusement la préférence du marketing ou de la finance |
| CT-07 | Marketing non causalement identifié | Séparer acquisition attribuée, incrémentalité hypothétique et effet démontré ; ne pas convertir une corrélation en élasticité ou ROI causal |
| CT-08 | Granularités et populations incompatibles | Aucune ventilation pays du marketing ni jointure individuelle des enquêtes inventée ; effectifs temporels et conventions d’alignement visibles |
| CT-09 | Domaines de validité limités | Signaler extrapolation prix, analogues non validés DE et saisonnalité sans année ; aucune précision ou représentativité externe fabriquée |

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
| Budget disponible, canaux et contraintes de lancement | F03, F05, F06 | Renseigner limites, allocation marketing distincte du mix de ventes et disponibilité du referral |
| Convention économique et retour marketing | F05 | Valider fiscalité/consigne si pertinentes, postes inclus, revenu brut/net ; distinguer couverture budgétaire, retour incrémental et rentabilité totale, définir le contrefactuel si nécessaire |
| Critères documentables du premium et priorités marketing/finance | F02, F07, F08 | Faire approuver les preuves, critères et éventuelles pondérations |
| Transfert NL/DK/SE vers Allemagne, portée et conversion | F02.04, F04, F07 | Choisir mode commercial, poids/échelle, base organique, CAC DE, incrémentalité, déduplication, panier/réachat et réponse prix ; justifier les plages |
| Seuils de qualité, arrondis et performances d’interaction | F01, F03–F08 | Définir des seuils mesurables après revue ; ne pas annoncer de précision prédictive ou de latence garantie à ce stade |

Les priorités de réalisation proposées sont : d’abord F01 et les analyses F02 nécessaires à la qualification des hypothèses ; ensuite F03–F05 avec résultats partiels explicites, puis calendrier, comparaison et restitution F06–F08. Cela ne supprime aucune exigence. Avant de coder les analyses encore non réalisées, vérifier les croisements d’enquête, les courbes de prix et le rapprochement des verbatims sur des cas contrôlés. Un pilote allemand et des données pays–campagne–période avec commandes/cohortes seront nécessaires avant de revendiquer une validation locale ou causale ; leur exécution reste hors de l’application.

L’étape suivante est la revue de ces exigences avec les bénéficiaires, puis leur priorisation de réalisation et la définition des cas de recette. Le choix d’architecture, la conception détaillée des écrans, l’implémentation du site et le choix ou l’entraînement d’un modèle ML interviendront séparément après cette validation. Aucun critère ci-dessus n’est présenté comme déjà testé sur une application.

Sources : [brief LUMEN](LUMEN_Case_Brief.md), [documentation des données](data/README_data.md) et [analyse des datasets](analysis/ANALYSE_DATASETS_LUMEN.md).
