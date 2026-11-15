---
---
/* Index de la recherche : construit automatiquement à partir des planètes, rubriques et publications. */
window.SITE_INDEX = [
{"fr":"Accueil","en":"Home","url":{{ '/' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"accueil home galaxie"}
,{"fr":"Mon Ornivers","en":"My Ornivers","url":{{ '/#ornivers' | relative_url | jsonify }},"type_fr":"Galaxie","type_en":"Galaxy","kw":"planetes planets galaxie"}
,{"fr":"Toutes les publications","en":"All posts","url":{{ '/publications/' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"articles archives publications"}
,{"fr":"À propos","en":"About","url":{{ '/a-propos.html' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"qui je suis histoire"}
,{"fr":"Mon histoire","en":"My story","url":{{ '/a-propos.html#histoire' | relative_url | jsonify }},"type_fr":"À propos","type_en":"About","kw":""}
,{"fr":"Ma méthode","en":"My method","url":{{ '/a-propos.html#methode' | relative_url | jsonify }},"type_fr":"À propos","type_en":"About","kw":"best version mentor devoirs"}
,{"fr":"Mon manifeste","en":"My manifesto","url":{{ '/manifeste.html' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"autodiscipline fidele"}
,{"fr":"Me contacter","en":"Contact me","url":{{ '/contact.html' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"contact message"}
,{"fr":"Mes réalisations","en":"My work","url":{{ '/realisations.html' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"projets creations"}
,{"fr":"Newsletter","en":"Newsletter","url":{{ '/newsletter.html' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"inscription email abonnement"}
,{"fr":"Mentions légales","en":"Legal notice","url":{{ '/mentions-legales.html' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":""}
,{"fr":"Politique de confidentialité","en":"Privacy policy","url":{{ '/confidentialite.html' | relative_url | jsonify }},"type_fr":"Page","type_en":"Page","kw":"donnees rgpd"}
,{"fr":"#OrnibestWeek","en":"#OrnibestWeek","url":{{ '/journal.html#ornibestweek' | relative_url | jsonify }},"type_fr":"Journal","type_en":"Journal","kw":"bilan hebdomadaire pourcentage"}
{% for p in site.data.planets %}
,{"fr":{{ p.name.fr | jsonify }},"en":{{ p.name.en | jsonify }},"url":{{ p.file | prepend: '/' | relative_url | jsonify }},"type_fr":"Planète","type_en":"Planet","kw":{{ p.tip.fr | append: ' ' | append: p.tip.en | jsonify }}}
{% for r in p.rubriques %}
,{"fr":{{ r.name.fr | jsonify }},"en":{{ r.name.en | jsonify }},"url":{{ p.file | prepend: '/' | append: '#' | append: r.id | relative_url | jsonify }},"type_fr":{{ p.name.fr | jsonify }},"type_en":{{ p.name.en | jsonify }},"kw":{{ r.desc.fr | jsonify }}}
{% for s in r.subs %}
,{"fr":{{ s.fr | jsonify }},"en":{{ s.en | jsonify }},"url":{{ p.file | prepend: '/' | append: '#' | append: s.id | relative_url | jsonify }},"type_fr":{{ r.name.fr | jsonify }},"type_en":{{ r.name.en | jsonify }},"kw":""}
{% endfor %}
{% endfor %}
{% endfor %}
{% for post in site.posts %}
,{"fr":{{ post.title | jsonify }},"en":{{ post.title_en | default: post.title | jsonify }},"url":{{ post.url | relative_url | jsonify }},"type_fr":"Publication","type_en":"Post","kw":{{ post.resume | append: ' ' | append: post.resume_en | jsonify }}}
{% endfor %}
];
